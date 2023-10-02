import { getDay, isSameDay } from 'date-fns'
import { enGB } from 'date-fns/locale'
import React, { useState } from 'react'
import { Calendar } from 'react-nice-dates'
import 'react-nice-dates/build/style.css'
// Very rough implementation of multiple date selection
export default function CalendarPrediction() {
  const [selectedDates, setSelectedDates] = useState([])
  const modifiers = {
    selected: date => selectedDates.some(selectedDate => isSameDay(selectedDate, date)),
		disabled: date => getDay(date) === 6, 
		highlight: date => getDay(date) === 2 
  }

	const modifiersClassNames = {
		highlight: '-highlight'
	}
	
  const handleDayClick = date => {
    setSelectedDates([...selectedDates, date])
  }
  return (
    <Calendar 
		onDayClick={handleDayClick} 
		modifiers={modifiers} 
		modifiersClassNames={modifiersClassNames}
		locale={enGB} 
		/>
  )
}