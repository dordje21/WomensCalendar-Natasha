import {motion} from "framer-motion"
import React, {useEffect, useRef, useState} from 'react'
import '../../App.css'
import {findClosestBiggerDate, getDaysDiff, getDaysFirstLetter, resetTime} from '../../actions/Time.js'
import asyncStorageGetItem from '../../hooks/asyncStorageGetItem'
import CalendarMi from '../Calendar'

function Home({handleReset, advice}) {
    //Initializing state variables using the useState hook
    const [date, setDate] = useState(new Date());
    const [userDataAnswers, setUserDataAnswers] = useState([]);
    const [openCalendar, setOpenCalendar] = useState(false);
    const [periodLength, setPeriodLength] = useState(5);
    const [cycleLength, setCycleLength] = useState(30);
    const [bgPeriod, setBgPeriod] = useState('simple-cycle');
    const [menstruationDates, setMenstruationDates] = useState([]);
    const [ovulationDates, setOvulationDates] = useState([]);
    const isInitialRender = useRef(true);
    const [todayDate, setTodayDate] = useState(new Date());
    const [daysFirstLetter, setDaysFirstLetter] = useState(["S", "M", "T", "W", "T", "F", "S"]);
    const [daysDates, setDaysDates] = useState([]);

    // Setting the dates for the menstrual cycle
    const setTopDates = (minimalDate, maximalDate) => {
        const newDates = [];
        // Iterating through each possible day and adding it to the new dates array
        for (let i = minimalDate; i <= maximalDate; i++) {
            let date = new Date();
            date.setDate(date.getDate() + i);
            newDates.push(date);
        }
        // Setting the state variable with the newly generated dates
        setDaysDates(newDates);
    };

    // Function to toggle the display of the calendar
    const handleCalendar = () => {
        if (openCalendar) {
            setOpenCalendar(false)
        } else {
            setOpenCalendar(true)
        }
    };

    // useEffect hook runs after every render, except for the first render due to the conditional statement.
    // It is checking if new period data is present, and if so, it stores the parsed data and sets the date of the next period.
    useEffect(() => {
        const startNewPeriod = (data) => {
            // Parse existing results
            const cycle = data[2].answer
            const period = data[3].answer
            const lastDate = data[4].answer
            setPeriodLength(period)
            setCycleLength(cycle)
            // Calculate the date of the next period
            const dateObj = new Date(lastDate);
            dateObj.setDate(dateObj.getDate() + (parseInt(cycle) - parseInt(period)));
            return dateObj
        }

        if (!isInitialRender.current) {
            const nextDate = startNewPeriod(userDataAnswers)
            setDate(nextDate)
        }
    }, [userDataAnswers])

    //useEffect hook to fetch data and set initial render flag
    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetching data from async storage
                const data = await asyncStorageGetItem("UserDataAnswers");
                if (data) {
                    // Updating state with the retrieved data
                    const jsonData = JSON.parse(data);
                    setUserDataAnswers(jsonData);
                } else {
                }
            } catch (error) {
                console.error('Error while retrieving/parsing data:', error);
            }
        };

        // Fetching data
        setTopDates(-2, 4)
        fetchData();
        isInitialRender.current = false;
    }, []);

    // Code to set menstruation and ovulation dates
    useEffect(() => {
        if (!isInitialRender.current) {
            // Function to calculate menstruation dates
            const countMenstDates = async (nextDate) => {
                let menstrualDates = [];
                // Creating dates for 12 months before and after the next period
                for (let m = -12; m < 24; m++) {
                    const actualDate = new Date(nextDate);
                    actualDate.setDate(nextDate.getDate() + (cycleLength * m))
                    // Creating dates for each day of the period
                    for (let i = 0; i < periodLength; i++) {
                        const newDate = new Date(actualDate);
                        newDate.setDate(actualDate.getDate() + i);
                        menstrualDates.push(newDate);
                    }
                }
                return menstrualDates;
            }

            // Similar function to calculate ovulation dates
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

            // Fetching menstrual and ovulation dates
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

    // Code to display menstrual cycle information
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
                    className='day'>{date.toDateString() === todayDate.toDateString() ? 'Today' : getDaysFirstLetter(date, daysFirstLetter)}</div>
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

    // Function that gives different messages based on menstrual and ovulation dates
    const dataInfo = (todayDate, menstruationDates, ovulationDates) => {
        let currentResult = 'Hello!'
        // Check if today's date is included in the provided menstrual dates
        // If yes, update the message
        if (menstruationDates && arrayContainsDate(menstruationDates, todayDate)) {
            currentResult = 'menstruationDay';
        }
        // Check if today's date is included in the provided ovulation dates
        // If yes, update the message
        if (ovulationDates && arrayContainsDate(ovulationDates, todayDate)) {
            currentResult = 'ovulationDay';
        }
        // Depending on the date, decide which message to display, based on the comparison between the dates
        if (arrayContainsDate(menstruationDates, todayDate)) {
            currentResult = `<h2>Period!</h2> <p>Low chance of getting pregnant</p>`;
        } else if (arrayContainsDate(ovulationDates, todayDate)) {
            currentResult = `<h2>Ovulation!</h2> High chance of getting pregnant`;
        } else {
            const closestBiggerDateMenstruation = findClosestBiggerDate(menstruationDates, todayDate);
            const closestBiggerDateOvulation = findClosestBiggerDate(ovulationDates, todayDate);

            // Depending on the closer date, display a count down to menstrual or ovulation day
            if (closestBiggerDateMenstruation > closestBiggerDateOvulation) {
                const daysDiff = getDaysDiff(todayDate, closestBiggerDateOvulation);
                currentResult = daysDiff === 0 ? `<h2>Ovulation</h2> <p>Tomorrow!</p>` : `<h2>Ovulation</h2> <p>in ${daysDiff} days!</p>`;
            } else {
                const daysDiff = getDaysDiff(todayDate, closestBiggerDateMenstruation);
                currentResult = daysDiff === 0 ? `<h2>Period</h2> <p>Tomorrow!</p>` : `<h2>Period</h2> <p>in ${daysDiff} days!</p>`;
            }
        }

        // Display the message in a div
        return (<div className='currentResult'>
            <div dangerouslySetInnerHTML={{__html: currentResult}}/>
        </div>)
    }

    return (
        <motion.div className="app-wrapper"
                    initial={{scale: 0}}
                    animate={{scale: 1}}
                    transition={{
                        type: "spring",
                        stiffness: 150,
                        damping: 50
                    }}
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
                    {advice ? <><h3>Advice Slip</h3>
                        <p>Natasha saying: {advice}</p></> : <></>}
                    <button onClick={handleReset} className='btn-m'
                            initial={{opacity: 0}}
                            animate={{opacity: 1}}
                            transition={{duration: 0.5}}>RESET
                    </button>
                </p>
            </> : <>
                <CalendarMi nextDate={date} ovulationDates={ovulationDates} menstruationDates={menstruationDates}/>
                <motion.button
                    onClick={handleCalendar}
                    className='btn-m btn-m-back'
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    transition={{duration: 0.5}}
                >Back
                </motion.button>
            </>}
        </motion.div>
    );
}

export default Home;
