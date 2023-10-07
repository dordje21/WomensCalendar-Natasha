import { Calendar } from '@bjarkehs/react-nice-dates'
import '@bjarkehs/react-nice-dates/build/style.css'
import { getDay, isSameDay } from 'date-fns'
import { enGB } from 'date-fns/locale'
import React, { useState } from 'react'
// Very rough implementation of multiple date selection
export default function CalendarMi({nextDate}) {
  const [selectedDates, setSelectedDates] = useState([])
  const modifiers = {
    selected: date => selectedDates.some(selectedDate => isSameDay(selectedDate, date)),
		disabled: date => getDay(date) === nextDate, 
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
		// onDayClick={handleDayClick} 
		modifiers={modifiers} 
		modifiersClassNames={modifiersClassNames}
		locale={enGB} 
		/>
  )
}