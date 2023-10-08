import React, { useEffect, useRef, useState } from 'react'
import '../../App.css'
import asyncStorageGetItem from '../../hooks/asyncStorageGetItem'
import CalendarMi from '../Calendar'

function Home({ user }) {
  const [date, setDate] = useState(new Date());
  const [userDataAnswers, setUserDataAnswers] = useState([]);
  const [openCalendar, setOpenCalendar] = useState(false);
  const [periodLength, setPeriodLength] = useState(5);
  const [cycleLength, setCycleLength] = useState(30);

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

  useEffect(() => {
    setTopDates(-2, 4);
  }, []);

  const handleCalendar = () => {
    if (openCalendar) {
      setOpenCalendar(false);
    } else {
      setOpenCalendar(true);
    }
  };

  useEffect(() => {
    const startNewPeriod = (data) => {
      const cycle = data[2].answer;
      const period = data[3].answer;
      const lastDate = data[4].answer;
      setPeriodLength(period);
      setCycleLength(cycle);
      const dateObj = new Date(lastDate);
      dateObj.setDate(dateObj.getDate() + (parseInt(cycle) - parseInt(period)));
      return dateObj;
    };

    if (!isInitialRender.current) {
      const nextDate = startNewPeriod(userDataAnswers);
      setDate(nextDate);
    }
  }, [userDataAnswers]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await asyncStorageGetItem("UserDataAnswers");
        if (data) {
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

  const getDaysFirstLetter = (date) => {
    return daysFirstLetter[date.getDay()];
  };

  const countDates = async (nextDate, length, interval, num) => {
    let dates = [];
    for (let m = -num; m < num; m++) {
      const actualDate = new Date(nextDate);
      actualDate.setDate(nextDate.getDate() + (interval * m));
      for (let i = 0; i < length; i++) {
        const newDate = new Date(actualDate);
        newDate.setDate(actualDate.getDate() + i);
        dates.push(newDate);
      }
    }
    return dates;
  };

  useEffect(() => {
    const fetchData = async () => {
      const menstruationDates = await countDates(date, periodLength, cycleLength, 12);
      setMenstruationDates(menstruationDates);

      const ovlDates = await countDates(date, 6, cycleLength - 14 - 3, 12);
      setOvulationDates(ovlDates);
    };

    fetchData();
  }, [periodLength, cycleLength, date]);

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
          <div className='day'>{date.toDateString() === todayDate.toDateString() ? 'Today' : getDaysFirstLetter(date)}</div>
          <div className={`${classDay} date-day`}>{date.getDate()}</div>
        </div>
      );
    });
  };

  const findClosestBiggerDate = (dateArray, currentDate) => {
    const futureDates = dateArray.filter((date) => date > currentDate);
    futureDates.sort((a, b) => a - b);
    return futureDates[0];
  };

  const getDaysDiff = (todayDate, nextDate) => {
    const timeDifference = nextDate - todayDate;
    const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    return daysDifference;
  };

  const checkIsToDay = (givenDate, currentDate) => {
    return (
      givenDate.getDate() === currentDate.getDate() &&
      givenDate.getMonth() === currentDate.getMonth() &&
      givenDate.getFullYear() === currentDate.getFullYear()
    );
  };

  const dataInfo = (todayDate, menstruationDates, ovulationDates) => {
    let currentResult = 'Hello!';

    if (menstruationDates && arrayContainsDate(menstruationDates, todayDate)) {
      currentResult = 'menstruationDay';
    }

    if (ovulationDates && arrayContainsDate(ovulationDates, todayDate)) {
      currentResult = 'ovulationDay';
    }

    const closestBiggerDateMenstruation = findClosestBiggerDate(menstruationDates, todayDate);
    const closestBiggerDateOvulation = findClosestBiggerDate(ovulationDates, todayDate);

    if (closestBiggerDateMenstruation > closestBiggerDateOvulation) {
      if (ovulationDates && arrayContainsDate(ovulationDates, date)) {
        currentResult = '<h2>Ovulation!</h2> High chance of getting pregnant';
      } else {
        currentResult = `<h2>Ovulation</h2> <p>in ${getDaysDiff(todayDate, closestBiggerDateOvulation)} days!</p>`;
      }
    }

    if (closestBiggerDateMenstruation < closestBiggerDateOvulation) {
      if (menstruationDates && arrayContainsDate(menstruationDates, date)) {
        currentResult = '<h2>Period!</h2> <p>Low chance of getting pregnant</p>';
      } else {
        currentResult = `<h2>Period</h2> <p>in ${getDaysDiff(todayDate, closestBiggerDateMenstruation)} days!</p>`;
      }
    }

    return (
      <div>
        <div dangerouslySetInnerHTML={{ __html: currentResult }} />
      </div>
    );
  };

  return (
    <div className="app-wrapper">
      {!openCalendar ? (
        <>
          <div className='box-dates'>
            {showTopDates(menstruationDates, ovulationDates)}
          </div>

          <div className="dateinfo-round-wrap">
            <div className="dateinfo-round">
              {dataInfo(todayDate, menstruationDates, ovulationDates)}
              <button className='btn-m' onClick={handleCalendar}>Open Calendar</button>
            </div>
          </div>
        </>
      ) : (
        <>
          <button onClick={handleCalendar} className='btn-m'>Back</button>
          <CalendarMi nextDate={date} ovulationDates={ovulationDates} menstruationDates={menstruationDates} />
        </>
      )}
    </div>
  );
}

export default Home;
