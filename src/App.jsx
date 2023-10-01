import React, { useState } from 'react'
import RadioButton from './components/RadioButton'

function App() {
  const [count, setCount] = useState(0);
  
  const questionsData = [
    {
      id: 1,
      question: "Question 1?",
      options: {
        variant1: "Option 1",
        variant2: "Option 2"
      }
    },
    {
      id: 2,
      question: "Question 2?",
      options: {
        variant1: "Option 1",
        variant2: "Option 2"
      }
    }
  ];

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedValues, setSelectedValues] = useState({});

  const handleRadioChange = (value) => {
    setSelectedValues({ ...selectedValues, [currentQuestionIndex]: value });
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
