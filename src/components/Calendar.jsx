import { Calendar } from '@bjarkehs/react-nice-dates'
import '@bjarkehs/react-nice-dates/build/style.css'
import { getDay, isSameDay } from 'date-fns'
import { enGB } from 'date-fns/locale'
import React, { useEffect, useState } from 'react'
// Very rough implementation of multiple date selection
export default function CalendarMi({nextDate}) {
  const [selectedDates, setSelectedDates] = useState([])
  const modifiers = {
    selected: date => selectedDates.some(selectedDate => isSameDay(selectedDate, date)),
		disabled: date => getDay(date) === 1, 
		highlight: nextDate => getDay(nextDate)
  }

	useEffect(()=>{
		setSelectedDates([nextDate])
	})

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