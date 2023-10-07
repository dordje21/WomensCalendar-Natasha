import React, { useEffect, useRef, useState } from 'react'
import InlinePicker from "../../InlinePicker.jsx"
import DatePickerCal from '../DatePickerCal.jsx'
import RadioButton from '../RadioButton'

function Start({handleShowStart}) {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedValues, setSelectedValues] = useState({});

    const [dataPickersIndex, setDataPickersIndex] = useState(0);

    const [showPickers, setShowPickers] = useState(false);
    const [showCal, setShowCal] = useState(false);

    const [dataPickerVal, setDataPickerVal] = useState({});

    const [readyToSave, setReadyToSave] = useState(false);
    /*
    Formula:
     Start of new period = last period start + average cycle 
     */

     const isInitialRender = useRef(true);

     useEffect(() => {
       if (!isInitialRender.current) {
         console.log(selectedValues);
         WebApp.CloudStorage.setItem("UserDataAnswers", selectedValues) 
         handleShowStart();
       }
     }, [readyToSave]);

    const questionsData = [
        {
            id: 1,
            question: "Are you pregnant??",
            options: {
                variant1: "Yes, I am",
                variant2: "No, but want to be",
                variant3: "No, I'm here to understand my body better"
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
        }
    ];
    
    const daysInPeriod = (minDays, maxDays) =>{
        let result = []
        for(let i = minDays; i <= maxDays; i++){
            result.push(i)
        }
        return result
    }

    const daysOfCycle = daysInPeriod(21, 56);
    const daysOfPeriod = daysInPeriod(1, 12);

    const dataPickers = [
        {
            question: "How many days on average is your cycle?",
            days: daysOfCycle
        },
        {
            question: "Enter the average length of your periods",
            days: daysOfPeriod
        }
    ]

    const pickersNext = () => {
        setSelectedValues({...selectedValues, [currentQuestionIndex]: {
            question: dataPickerVal.question,
            answer: dataPickerVal.answer
            }
        });
        setCurrentQuestionIndex(currentQuestionIndex + 1);

      setDataPickersIndex(dataPickersIndex + 1)
      if (dataPickers.length <= dataPickersIndex + 1) {
        setShowPickers(false)
        setShowCal(true)
        }
    }

    const saveData = () => {
        setSelectedValues({...selectedValues, [currentQuestionIndex]: {
            question: dataPickerVal.question,
            answer: dataPickerVal.answer
            }
        })
        isInitialRender.current = false;
        setReadyToSave(true)   
    }

    const selectedValuePicker = (value, question) => {
        console.log(value, question)
        setDataPickerVal({
            question: question,
            answer: value
        })
    }

    const currentDataPickers = dataPickers[dataPickersIndex];


    const handleRadioChange = (value, question) => {
        console.log(questionsData[currentQuestionIndex].options[value], question)

        setSelectedValues({...selectedValues, [currentQuestionIndex]: {
            question: question,
            answer: questionsData[currentQuestionIndex].options[value]
            }
        });

        setCurrentQuestionIndex(currentQuestionIndex + 1);
       

        if (questionsData.length <= currentQuestionIndex + 1) {
            // handleShowStart()
            setShowPickers(true)
        }
    };

    const currentQuestion = questionsData[currentQuestionIndex];

    return (
        <>
            <div>Start</div>


            {/* {Object.values(selectedValues).map((el, index) => {
                return <div key={index}>{el.question}{el.answer}</div>
            })} */}

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
                        />
                        <button onClick={pickersNext}>Next</button>
                    </div>
            ) : <></>}

            {showCal ? 
         <div className="question-data">
            <DatePickerCal selectedValue={(e) => {
                selectedValuePicker(e.toDateString(), 'Select the start date of your last period?')
            }} question='Select the start date of your last period?' /> 
            <button onClick={saveData}>Save</button>
            </div> : <></>}            
        </>
    );
}

export default Start;
