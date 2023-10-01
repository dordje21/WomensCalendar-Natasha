import React, {useState} from 'react'
import RadioButton from './components/RadioButton'

function App() {
    const [count, setCount] = useState(0);

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
        }
    ];

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedValues, setSelectedValues] = useState({});

    const handleRadioChange = (value) => {
        setSelectedValues({...selectedValues, [currentQuestionIndex]: value});
        setCurrentQuestionIndex(currentQuestionIndex + 1);
    };

    const currentQuestion = questionsData[currentQuestionIndex];

    return (
        <div className="app-wrapper">
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
