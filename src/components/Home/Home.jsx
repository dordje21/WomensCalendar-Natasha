import React, { useEffect, useRef, useState } from 'react'
import '../../App.css'
import asyncStorageGetItem from '../../hooks/asyncStorageGetItem'
import CalendarMi from '../Calendar'

function Home({user, handleReset}) {
    const [date, setDate] = useState(new Date());
    const [userDataAnswers, setUserDataAnswers] = useState([]);
    const [openCalendar, setOpenCalendar] = useState(false);
    const [periodLength, setPeriodLength] = useState(5)
    const [cycleLength, setCycleLength] = useState(30)

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
                    console.log('Retrieved & parsed data:', jsonData);
                    setUserDataAnswers(jsonData);
                } else {
                    console.log("No data available");
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

    const arrayContainsDate = (dateArray, targetDate) => {
        const targetDateString = targetDate.toDateString();
        return dateArray.some((date) => date.toDateString() === targetDateString);
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

            return (
                <div key={index} className='box-date'>
                    <div
                        className='day'>{date.toDateString() === todayDate.toDateString() ? 'Today' : getDaysFirstLetter(date)}</div>
                    <div className={`${classDay} date-day`}>{date.getDate()}</div>
                </div>
            );
        });
    }

    const findClosestBiggerDate = (dateArray, currentDate) => {
        const futureDates = dateArray.filter((date) => date > currentDate);
        futureDates.sort((a, b) => a - b);
        return futureDates[0];
    }

    const getDaysDiff = (todayDate, nextDate) => {
        const timeDifference = nextDate - todayDate;
        const daysDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
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

        if (closestBiggerDateMenstruation > closestBiggerDateOvulation) {

            if (getDaysDiff(todayDate, closestBiggerDateOvulation) < 1) {
                currentResult = `<h2>Ovulation!</h2> High chance of getting pregnant`;
            } else {
                currentResult = `<h2>Ovulation</h2> <p>in ${getDaysDiff(todayDate, closestBiggerDateOvulation)} days!</p>`;
            }
        }

        if (closestBiggerDateMenstruation < closestBiggerDateOvulation) {

            if (getDaysDiff(todayDate, closestBiggerDateMenstruation) < 1) {
                currentResult = `<h2>Period!</h2> <p>Low chance of getting pregnant</p>`;
            } else {
                currentResult = `<h2>Period</h2> <p>in ${getDaysDiff(todayDate, closestBiggerDateMenstruation)} days!</p>`;
            }
        }

        return (
            <div className='currentResult'>
                <div dangerouslySetInnerHTML={{__html: currentResult}}/>
            </div>
        )
    }

    return (
        <div className="app-wrapper">
            {!openCalendar ? <>
                <div className='box-dates'>
                    {showTopDates(menstruationDates, ovulationDates)}
                </div>
                <div className="dateinfo-round-wrap">
                    <div className="dateinfo-round pulsating-circle">
                        {dataInfo(todayDate, menstruationDates, ovulationDates)}
                        <button className='btn-m-cal' onClick={handleCalendar}>Open Calendar</button>
                    </div>
                </div>
                <p>
                <button onClick={handleReset} className='btn-m'>RESET</button>
                </p>
            </> : <>
                <CalendarMi nextDate={date} ovulationDates={ovulationDates} menstruationDates={menstruationDates}/>
                <button onClick={handleCalendar} className='btn-m btn-m-back'>Back</button>
            </>}
        </div>
    );
}

export default Home;
