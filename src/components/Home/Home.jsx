import React, { useEffect, useRef, useState } from 'react'
import '../../App.css'
// import db from '../../db/dbmiddleware'
import asyncStorageGetItem from '../../hooks/asyncStorageGetItem'
import CalendarMi from '../Calendar'
import CalendarPrediction from '../CalendarPrediction'
 
function Home({ user }) {
    const [count, setCount] = useState(0);
    // const [data, setData] = useState({});
    const [date, setDate] = useState(new Date());
    const [userDataAnswers, setUserDataAnswers] = useState([]);

    const [period, setPeriod] = useState()
    
        /*
     Start of new period = date + (cycle(20) - period(3)) 
     */

     const isInitialRender = useRef(true);

    useEffect(() => {
        const startNewPeriod = (data) => {
            const cycle = data[2].answer
            const period = data[3].answer
            const lastDate = data[4].answer
            setPeriod(period)
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

    //   const parseJsonData = (data) => {
    //     const parsed = JSON.parse(data)
    //     return ( 
    //         <>
    //             {parsed[0].question}
    //         </>
    //     )
    // }

    // const [user, setUser] = useState('');
    // useEffect(() => {
    //     console.log(selectedValues)
    // },[selectedValues])

    // useEffect(() => {
    //     async function getData(db) {
    //         const collectionRef = collection(db, 'test');
    //         const citySnapshot = await getDocs(collectionRef);
    //         const cityList = citySnapshot.docs.map(doc => doc.data());
    //         return cityList;
    //     }

    //   async function getAllDocuments() {
    //       try {
    //           const req = await getData(db);
    //           console.log(req)
    //           setData(req)
    //       } catch (error) {
    //           console.error('Error getting documents:', error);
    //       }
    //   }

    //   getAllDocuments();


    //   const setDataInDb = async (value) => {
    //     try {
    //       const collectionRef = collection(db, 'test');
    //       await addDoc(collectionRef, { test: value });
    //       console.log('Data added to Firestore');
    //     } catch (error) {
    //       console.error('Error adding data to Firestore:', error);
    //     }
    //   };

    //     setDataInDb('Alex')
    // }, []);

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

            <div style={{display: 'flex', justifyContent: 'space-around'}}>
                {dates.map((date, index) => (
                    <div key={index} style={{margin: '0 20px'}}>
                        <h2>{date.toDateString() === todayDate.toDateString() ? 'Today' : GetDaysFirstLetter(date)}</h2>
                        <h2>{date.getDate()}</h2>
                    </div>
                ))}
            </div>
            {/* <ul>
               {showJson()}
            </ul> */}
            {date.toString()}
            <p>{user?.id}</p>
            <p>{user?.first_name}</p>
            <p>{user?.last_name}</p>
            <p>{user?.username}</p>
            <p>{user?.is_premium}</p>
            <CalendarMi nextDate={date}/> 
            <CalendarPrediction/>
        </div>
    );
}

export default Home;
