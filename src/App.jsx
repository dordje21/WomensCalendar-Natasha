import {addDoc, collection, getDocs} from 'firebase/firestore'
import React, {useEffect, useState} from 'react'
import RadioButton from './components/RadioButton'
import db from './db/dbmiddleware'

function App() {
    const [count, setCount] = useState(0);

    const [data, setData] = useState({})

    useEffect(() => {
        async function getData(db) {
            const collectionRef = collection(db, 'test');
            const citySnapshot = await getDocs(collectionRef);
            const cityList = citySnapshot.docs.map(doc => doc.data());
            return cityList;
        }

        async function getAllDocuments() {
            try {
                const req = await getData(db);
                console.log(req)
                setData(req)
            } catch (error) {
                console.error('Error getting documents:', error);
            }
        }

        getAllDocuments();


        const setDataInDb = async (value) => {
            try {
                const collectionRef = collection(db, 'test');
                await addDoc(collectionRef, {test: value});
                console.log('Data added to Firestore');
            } catch (error) {
                console.error('Error adding data to Firestore:', error);
            }
        };

        setDataInDb('Alex');
    }, []);


    const questionsData = [
        {
            id: 1,
            question: "Are you pregnant??",
            options: {
                variant1: "No, but want to be",
                variant2: "No, I'm here to understand my body better",
                variant3: "Yes, I am"
            }
        },
        {
            id: 2,
            question: "Is your menstrual cycle regular \n (varies by no more than 7 days) ?",
            options: {
                variant1: "My cycle is regular",
                variant2: "My cycle is irregular",
                variant3: "I don't know"
            }
        },
        {
            id: 3,
            question: "When you was born?",
            options: {
                variant1: "Calendar"
            }
        },
        {
            id: 4,
            question: "Choose day your last period started",
            options: {
                variant1: "Calendar"
            }
        },
        {
            id: 5,
            question: "How many days on average is your cycle?",
            options: {
                variant1: "Max 56 min 21 day options"
            }
        },
        {
            id: 6,
            question: "How many days on average is your menstruation?",
            options: {
                variant1: "Max 12 min 1 day options"
            }
        }
    ];

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedValues, setSelectedValues] = useState({});

    const handleRadioChange = (value) => {
        setSelectedValues({...selectedValues, [currentQuestionIndex]: value});
        setCurrentQuestionIndex(currentQuestionIndex + 1);
    };

    const currentQuestion = questionsData[currentQuestionIndex];

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
            <div style={{display: 'flex', justifyContent: 'space-around'}}>
                {dates.map((date, index) => (
                    <div key={index} style={{margin: '0 20px'}}>
                        <h2>{date.toDateString() === todayDate.toDateString() ? 'Today' : GetDaysFirstLetter(date)}</h2>
                        <h2>{date.getDate()}</h2>
                    </div>
                ))}
            </div>

            {currentQuestion && (
                <div className="question">
                    <RadioButton
                        question={currentQuestion.question}
                        options={currentQuestion.options}
                        selectedValue={selectedValues[currentQuestionIndex]}
                        onChangeValue={(e) => handleRadioChange(e.target.value)}
                    />
                </div>
            )}
        </div>
    );
}

export default App;
