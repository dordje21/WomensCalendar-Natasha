import { default as WebApp } from '@twa-dev/sdk'
import { motion } from "framer-motion"
import React, { useEffect, useRef, useState } from 'react'
import InlinePicker from "../../InlinePicker.jsx"
import DatePickerCal from '../DatePickerCal.jsx'
import RadioButton from '../RadioButton'

function Start({handleShowStart}) {
    // Initializing state values using the useState hook
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedValues, setSelectedValues] = useState({});
    const [dataPickersIndex, setDataPickersIndex] = useState(0);
    const [showPickers, setShowPickers] = useState(false);
    const [showCal, setShowCal] = useState(false);
    const [dataPickerVal, setDataPickerVal] = useState({});
    const [readyToSave, setReadyToSave] = useState(false);
    const isInitialRender = useRef(true);

    // Using the useEffect hook to persist data to cloud storage and handling the start of the app
     useEffect(() => {
         // Don't run this effect on initial render
         if (!isInitialRender.current) {
             // onSave of user data, store data in the cloud storage
             WebApp.CloudStorage.setItem("UserDataAnswers", JSON.stringify(selectedValues)) 
         handleShowStart();
       }
     }, [readyToSave]);

    // Questions data
    const questionsData = [
        {
            id: 1,
            question: "Are you pregnant??",
            options: {
                variant1: "Yes, I am.",
                variant2: "No, but want to be.",
                variant3: "I'm here to self-discover."
            }
        },
        {
            id: 2,
            question: "Is your menstrual cycle regular \n (varies by no more than 7 days) ?",
            options: {
                variant1: "My cycle is regular.",
                variant2: "My cycle is irregular.",
                variant3: "I don't know."
            }
        }
    ];

    // Function to generate the range of days
    const daysInPeriod = (minDays, maxDays) =>{
        let result = []
        for(let i = minDays; i <= maxDays; i++){
            result.push(i)
        }
        return result
    }

    // Generate days of cycle and period
    const daysOfCycle = daysInPeriod(21, 56);
    const daysOfPeriod = daysInPeriod(1, 12);

    // Definitions for data picker questions
    const dataPickers = [
        {
            question: "How many days on average is your cycle?",
            days: daysOfCycle
        },
        {
            question: "Enter the average length of your periods.",
            days: daysOfPeriod
        }
    ]
    // Move to the next question for data picking
    const pickersNext = () => {
        setSelectedValues({...selectedValues, [currentQuestionIndex]: {
            question: dataPickerVal.question,
            answer: dataPickerVal.answer
            }
        });
        setCurrentQuestionIndex(currentQuestionIndex + 1);

        // Move to the next data picker
        setDataPickersIndex(dataPickersIndex + 1)

        // If there are no more data pickers, show the calendar
        if (dataPickers.length <= dataPickersIndex + 1) {
        setShowPickers(false)
        setShowCal(true)
        }
    }

    // Save the data
    const saveData = () => {
        setSelectedValues({...selectedValues, [currentQuestionIndex]: {
            question: dataPickerVal.question,
            answer: dataPickerVal.answer
            }
        })
        // Indicate that the initial render is past and that data is ready to save
        isInitialRender.current = false;
        setReadyToSave(true)   
    }

    // Store the selected value from data picker
    const selectedValuePicker = (value, question) => {
        setDataPickerVal({
            question: question,
            answer: value
        })
    }

    const currentDataPickers = dataPickers[dataPickersIndex];

    // Manage radio button selection
    const handleRadioChange = (value, question) => {
        setSelectedValues({...selectedValues, [currentQuestionIndex]: {
            question: question,
            answer: questionsData[currentQuestionIndex].options[value]
            }
        });
        setCurrentQuestionIndex(currentQuestionIndex + 1);
       
        if (questionsData.length <= currentQuestionIndex + 1) {
            setShowPickers(true)
        }
    };

    // Fetch the current question
    const currentQuestion = questionsData[currentQuestionIndex];

    return (
        // Render the questions, radio buttons, data pickers and calendars as needed
        <motion.div className='question-wrapper'
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{
        type: "spring",
        stiffness: 260,
        damping: 20
        }}>
            
            {currentQuestion && (
                <div className="question">
                    <RadioButton
                        question={currentQuestion.question}
                        options={currentQuestion.options}
                        selectedValue={selectedValues[currentQuestionIndex]}
                        onChangeValue={(e) => handleRadioChange(e.target.value, currentQuestion.question)}
                    />         
                </div>
            )}

            {showPickers ? currentDataPickers && (
                    <div className="question">
                        <InlinePicker selectionsValue={currentDataPickers.days} question={currentDataPickers.question} 
                        selectedValue={(e) => selectedValuePicker(e, `${currentDataPickers.question}`)} 
                        pickersNext={pickersNext}
                        />
                    </div>
            ) : <></>}

            {showCal ? 
         <div className="question-data">
            <DatePickerCal selectedValue={(e) => {
                selectedValuePicker(e.toDateString(), 'Select the start date of your last period?')
            }} question='Select the start date of your last period?' saveData={saveData}/> 
            </div> : <></>}            
        </motion.div>
    );
}

export default Start;
