import React, {useEffect, useState} from 'react'
import '../../App.css'
// import db from '../../db/dbmiddleware'

import CalendarMi from '../Calendar'
import CalendarPrediction from '../CalendarPrediction'
// import { default as WebApp } from '@twa-dev/sdk'
import { default as WebApp, default as WebAppInitData } from '@twa-dev/sdk'

function Home() {

    const [user, setUser] = useState('')
    WebApp.ready();
    WebAppInitData.ready();

    useEffect(() => {
        setUser(WebApp.initDataUnsafe.user)
    })

    
    const [count, setCount] = useState(0);
    const [data, setData] = useState({})

    const [date, setDate] = useState(new Date());

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

    return (
        <div className="app-wrapper">
            <div>
                	<div>Start</div>
                	<p>{user.id}</p>
                <p>{user.first_name}</p>
                <p>{user.last_name}</p>
                <p>{user.username}</p>
                <p>{user.is_premium}</p>
                </div>
            <div style={{display: 'flex', justifyContent: 'space-around'}}>
                {dates.map((date, index) => (
                    <div key={index} style={{margin: '0 20px'}}>
                        <h2>{date.toDateString() === todayDate.toDateString() ? 'Today' : GetDaysFirstLetter(date)}</h2>
                        <h2>{date.getDate()}</h2>
                    </div>
                ))}
            </div>
            <CalendarMi/> 
            <CalendarPrediction/>
        </div>
    );
}

export default Home;
