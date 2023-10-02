import React, { useState } from 'react'
import { useNavigate } from "react-router-dom"
import RadioButton from '../RadioButton'
function Start() {

	const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
	const [selectedValues, setSelectedValues] = useState({});

	const navigate = useNavigate();

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
				question: "How many days on average is your menstruation?",
				options: {
						variant1: "Max 12 min 1 day options"
		}   
}
];


const handleRadioChange = (value) => {
	setSelectedValues({ ...selectedValues, [currentQuestionIndex]: value });
	setCurrentQuestionIndex(currentQuestionIndex + 1);
	if(questionsData.length <= currentQuestionIndex + 1){
		navigate("/home");
	}
	console.log(questionsData.length, currentQuestionIndex + 1)
};

const currentQuestion = questionsData[currentQuestionIndex];

  return (
		<>
			<div>Start</div>
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
