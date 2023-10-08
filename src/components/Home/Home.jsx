import React, { useEffect, useRef, useState } from 'react'
import '../../App.css'
import asyncStorageGetItem from '../../hooks/asyncStorageGetItem'
import CalendarMi from '../Calendar'
 
function Home({ user }) {
    const [count, setCount] = useState(0);
    // const [data, setData] = useState({});
    const [date, setDate] = useState(new Date());
    const [userDataAnswers, setUserDataAnswers] = useState([]);

    const [openCalendar, setOpenCalendar] = useState(false);

    const [periodLength, setPeriodLength] = useState()
    const [cycleLength, setCycleLength] = useState()

    const isInitialRender = useRef(true);

    const handleCalendar = () => {
        console.log('test')
        if(openCalendar){
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
    },[userDataAnswers])
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await asyncStorageGetItem("UserDataAnswers");
                if(data) {  
                    const jsonData = JSON.parse(data); 
                    console.log('Retrieved & parsed data:', jsonData);
                    setUserDataAnswers(jsonData); 
                    isInitialRender.current = false;
                } else {
                    console.log("No data available");
                }
            } catch (error) {
                console.error('Error while retrieving/parsing data:', error);
            }
        };
        fetchData();
    }, []);

    let daysFirstLetter = ["S", "M", "T", "W", "T", "F", "S"];

    function GetDaysFirstLetter(date) {
        return daysFirstLetter[date.getDay()];
    }

    let todayDate = new Date();
    let minimalDate = -2
    let maximalDate = 4
    let dates = [];
    for (let i = minimalDate; i <= maximalDate; i++) {
        let date = new Date();
        date.setDate(date.getDate() + i);
        dates.push(date);
    }

    const showJson = () => {
        if(userDataAnswers) {
          return Object.values(userDataAnswers).map((item, index) => {
            return (
              <li key={index}>
                <p>{item.question}</p>
                <p>{item.answer}</p>
              </li>
            )
          })
        }
        return null;
      }

    return (
        <div className="app-wrapper">

            {!openCalendar ? <><div className='box-dates'>
                {dates.map((date, index) => (
                    <div key={index} className='box-date'>
                        <div className='day'>{date.toDateString() === todayDate.toDateString() ? 'Today' : GetDaysFirstLetter(date)}</div>
                        <div className='date-day'>{date.getDate()}</div>
                    </div>
                ))}
            </div>

            <div className="dateinfo-round-wrap">
                    <div className="dateinfo-round">
                        data info
                        <button className='btn-m' onClick={handleCalendar}>Open Calendar</button>
                    </div>
            </div></> : <>
            <button onClick={handleCalendar} className='btn-m'>Back</button>
            <CalendarMi nextDate={new Date()} periodLength={5} cycleLength={30}/>
            </>  }


            {/* <ul>
               {showJson()}
            </ul> */}
            {date.toString()}
            {/* <p>{user?.id}</p>
            <p>{user?.first_name}</p>
            <p>{user?.last_name}</p>
            <p>{user?.username}</p>
            <p>{user?.is_premium}</p> */}
        </div>
    );
}

export default Home;
