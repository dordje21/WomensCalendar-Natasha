import React, { useState } from 'react'

import RadioButton from '../RadioButton'
import InlinePicker from "../../InlinePicker.jsx";

function Start({user, handleShowStart}) {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedValues, setSelectedValues] = useState({});
    
    
    /*
    Formula:
     Start of new period = last period start + average cycle 
     */
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
            question: "How many days on average is your cycle?",
            options: {
                variant1: "Max 56 min 21 day options"
            }
        },
        {
            id: 4,
            question: "Select the start date of your last period?",
            options: {
                variant1: "calendar"
            }
        },
        {
            id: 5,
            question: "Enter the average length of your periods",
            options: {
                variant1: "Max 12 min 1 day options"
            }
        },
    ];


    const handleRadioChange = (value) => {
        setSelectedValues({...selectedValues, [currentQuestionIndex]: value});
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        if (questionsData.length <= currentQuestionIndex + 1) {
            handleShowStart()
        }
    };

    const currentQuestion = questionsData[currentQuestionIndex];
    const value = ['1','2','3','4','5','6','7'];

    return (
        <>
            <div>Start</div>
            <p>{user?.id}</p>
            <p>{user?.first_name}</p>
            <p>{user?.last_name}</p>
            <p>{user?.username}</p>
            <p>{user?.is_premium}</p>
            <section>
                <p className="px-4 mb-1 text-neutral-400">1. As an inline component</p>
                <InlinePicker selectionsValue={value} />
            </section>
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
        </>
    );
}

export default Start;
