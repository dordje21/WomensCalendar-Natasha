import { motion } from "framer-motion"
import React, { useEffect, useRef, useState } from 'react'
import '../../App.css'
import asyncStorageGetItem from '../../hooks/asyncStorageGetItem'
import CalendarMi from '../Calendar'

function Home({user, handleReset, advice}) {
    const [date, setDate] = useState(new Date());
    const [userDataAnswers, setUserDataAnswers] = useState([]);
    const [openCalendar, setOpenCalendar] = useState(false);
    const [periodLength, setPeriodLength] = useState(5)
    const [cycleLength, setCycleLength] = useState(30)

    const [bgPeriod, setBgPeriod] = useState('simple-cycle')

    const [menstruationDates, setMenstruationDates] = useState([]);
    const [ovulationDates, setOvulationDates] = useState([]);

    const isInitialRender = useRef(true);
    const [todayDate, setTodayDate] = useState(new Date());
    const [daysFirstLetter, setDaysFirstLetter] = useState(["S", "M", "T", "W", "T", "F", "S"]);
    const [daysDates, setDaysDates] = useState([]);

    const setTopDates = (minimalDate, maximalDate) => {
        const newDates = [];
        for (let i = minimalDate; i <= maximalDate; i++) {
            let date = new Date();
            date.setDate(date.getDate() + i);
            newDates.push(date);
        }
        setDaysDates(newDates);
    };

    const handleCalendar = () => {
        if (openCalendar) {
            setOpenCalendar(false)
        } else {
            setOpenCalendar(true)
        }
    }

    useEffect(() => {
        const startNewPeriod = (data) => {
            const cycle = data[2].answer
            const period = data[3].answer
            const lastDate = data[4].answer
            setPeriodLength(period)
            setCycleLength(cycle)
            const dateObj = new Date(lastDate);
            dateObj.setDate(dateObj.getDate() + (parseInt(cycle) - parseInt(period)));
            return dateObj
        }

        if (!isInitialRender.current) {
            const nextDate = startNewPeriod(userDataAnswers)
            setDate(nextDate)
        }
    }, [userDataAnswers])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await asyncStorageGetItem("UserDataAnswers");
                if (data) {
                    const jsonData = JSON.parse(data);
                    setUserDataAnswers(jsonData);
                } else {
                }
            } catch (error) {
                console.error('Error while retrieving/parsing data:', error);
            }
        };
        setTopDates(-2, 4)
        fetchData();
        isInitialRender.current = false;
    }, []);

    const getDaysFirstLetter = (date) => {
        return daysFirstLetter[date.getDay()];
    }

    useEffect(() => {
        if (!isInitialRender.current) {
            const countMenstDates = async (nextDate) => {
                let menstrualDates = [];
                for (let m = -12; m < 24; m++) {
                    const actualDate = new Date(nextDate);
                    actualDate.setDate(nextDate.getDate() + (cycleLength * m))
                    for (let i = 0; i < periodLength; i++) {
                        const newDate = new Date(actualDate);
                        newDate.setDate(actualDate.getDate() + i);
                        menstrualDates.push(newDate);
                    }
                }

                return menstrualDates;
            }


            const countOvlDates = async (nextDate) => {
                let ovlDates = [];
                const startOvl = new Date(nextDate);
                startOvl.setDate(startOvl.getDate() + cycleLength - 14 - 3);

                for (let m = -12; m < 24; m++) {
                    const actualDate = new Date(startOvl);
                    actualDate.setDate(startOvl.getDate() + (cycleLength * m))
                    for (let i = 0; i < 6; i++) {
                        const newDate = new Date(actualDate);
                        newDate.setDate(actualDate.getDate() + i);
                        ovlDates.push(newDate);
                    }
                }

                return ovlDates;
            }

            const fetchData = async () => {
                const menstruationDates = await countMenstDates(date);
                setMenstruationDates(menstruationDates);

                const ovlDates = await countOvlDates(date);
                setOvulationDates(ovlDates);
            };
            fetchData();
        }
    }, [periodLength, cycleLength]);

    const arrayContainsDate = (dateArray, date) => {
        return dateArray.some(d => resetTime(d).getTime() === resetTime(date).getTime());
    };


    const showTopDates = (menstruationDates, ovulationDates) => {
        return daysDates.map((date, index) => {
            let classDay = 'simple';

            if (menstruationDates && arrayContainsDate(menstruationDates, date)) {
                classDay = 'menstruationDay';
            }

            if (ovulationDates && arrayContainsDate(ovulationDates, date)) {
                classDay = 'ovulationDay';
            }

            return (<div key={index} className='box-date'>
                <div
                    className='day'>{date.toDateString() === todayDate.toDateString() ? 'Today' : getDaysFirstLetter(date)}</div>
                <div className={`${classDay} date-day`}>{date.getDate()}</div>
            </div>);
        });
    };


    useEffect(() => {

        const findBgCycle = (menstruationDates, ovulationDates) => {
            let todayBg = 'simple-cycle';
            daysDates.map((date, index) => {
                let classDay = 'simple';

                if (menstruationDates && arrayContainsDate(menstruationDates, date)) {
                    classDay = 'menstruationDay';
                }

                if (ovulationDates && arrayContainsDate(ovulationDates, date)) {
                    classDay = 'ovulationDay';
                }

                if (date.toDateString() === todayDate.toDateString()) {
                    todayBg = `${classDay}-cycle`;
                }
            });
            setBgPeriod(todayBg);
        };

        findBgCycle(menstruationDates, ovulationDates)

    }, [menstruationDates, ovulationDates])


    const findClosestBiggerDate = (dateArray, currentDate) => {
        const futureDates = dateArray.filter((date) => date > currentDate);
        futureDates.sort((a, b) => a - b);
        return futureDates[0];
    }

    const resetTime = date => {
        if (!date) return null;
        const copy = new Date(date.getTime());
        copy.setHours(0, 0, 0, 0);
        return copy;
    };

    const getDaysDiff = (todayDate, nextDate) => {

        const [todayWithoutTime, nextWithoutTime] = [todayDate, nextDate].map(resetTime);

        const timeDifference = nextWithoutTime - todayWithoutTime
        const daysDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24)) - 1;
        return daysDifference
    }

    const dataInfo = (todayDate, menstruationDates, ovulationDates) => {
        let currentResult = 'Hello!'

        if (menstruationDates && arrayContainsDate(menstruationDates, todayDate)) {
            currentResult = 'menstruationDay';
        }

        if (ovulationDates && arrayContainsDate(ovulationDates, todayDate)) {
            currentResult = 'ovulationDay';
        }

        const closestBiggerDateMenstruation = findClosestBiggerDate(menstruationDates, todayDate);

        const closestBiggerDateOvulation = findClosestBiggerDate(ovulationDates, todayDate);

        // if (closestBiggerDateMenstruation > closestBiggerDateOvulation) {
        //
        //     if (getDaysDiff(todayDate, closestBiggerDateOvulation) < 1) {
        //         currentResult = `<h2>Ovulation!</h2> High chance of getting pregnant`;
        //     } else {
        //         currentResult = `<h2>Ovulation</h2> <p>in ${getDaysDiff(todayDate, closestBiggerDateOvulation)} days!</p>`;
        //     }
        // }
        //
        // if (closestBiggerDateMenstruation < closestBiggerDateOvulation) {
        //
        //     if (getDaysDiff(todayDate, closestBiggerDateMenstruation) < 1) {
        //         currentResult = `<h2>Period!</h2> <p>Low chance of getting pregnant</p>`;
        //     } else {
        //         currentResult = `<h2>Period</h2> <p>in ${getDaysDiff(todayDate, closestBiggerDateMenstruation)} days!</p>`;
        //     }
        // }
        if (arrayContainsDate(menstruationDates, todayDate)) {
            currentResult = `<h2>Period!</h2> <p>Low chance of getting pregnant</p>`;
        } else if (arrayContainsDate(ovulationDates, todayDate)) {
            currentResult = `<h2>Ovulation!</h2> High chance of getting pregnant`;
        } else {
            const closestBiggerDateMenstruation = findClosestBiggerDate(menstruationDates, todayDate);
            const closestBiggerDateOvulation = findClosestBiggerDate(ovulationDates, todayDate);

            if (closestBiggerDateMenstruation > closestBiggerDateOvulation) {
                const daysDiff = getDaysDiff(todayDate, closestBiggerDateOvulation);
                currentResult = daysDiff === 0 ? `<h2>Ovulation</h2> <p>Tomorrow!</p>` : `<h2>Ovulation</h2> <p>in ${daysDiff} days!</p>`;
            } else {
                const daysDiff = getDaysDiff(todayDate, closestBiggerDateMenstruation);
                currentResult = daysDiff === 0 ? `<h2>Period</h2> <p>Tomorrow!</p>` : `<h2>Period</h2> <p>in ${daysDiff} days!</p>`;
            }
        }

        return (<div className='currentResult'>
            <div dangerouslySetInnerHTML={{__html: currentResult}}/>
        </div>)
    }



    // Assuming 'Calendar' is your calendar component
    const CalendarComponent = props => {
        const handleScroll = (event) => {
            event.stopPropagation();
        };

        return (
            <div onWheel={handleScroll}>
                <CalendarMi  nextDate={date} ovulationDates={ovulationDates} menstruationDates={menstruationDates}/>
            </div>
        );
    };
    
    return (
    <motion.div className="app-wrapper" 
    initial={{ scale: 0 }}
    animate={{ scale: 1 }}
    transition={{
    type: "spring",
    stiffness: 260,
    damping: 20 }}
    >
        {!openCalendar ? <>
            <div className='box-dates'>
                {showTopDates(menstruationDates, ovulationDates)}
            </div>
            <div className="dateinfo-round-wrap">
                <div className={`dateinfo-round pulsating-circle ${bgPeriod}`}>
                    {dataInfo(todayDate, menstruationDates, ovulationDates)}
                    <button className='btn-m-cal' onClick={handleCalendar}>Calendar</button>
                </div>
            </div>
            <p>
                <h3>Advice Slip</h3>
                <p>Natasha saying: {advice}</p>
                <button onClick={handleReset} className='btn-m'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}>RESET</button>
            </p>
        </> : <>
            {CalendarComponent()}
            {/*<CalendarMi  nextDate={date} ovulationDates={ovulationDates} menstruationDates={menstruationDates}/>*/}
            <motion.button onClick={handleCalendar} 
            className='btn-m btn-m-back'
            initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      >Back</motion.button>
        </>}
    </motion.div>
    );
}

export default Home;
