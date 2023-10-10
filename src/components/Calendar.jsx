import { Calendar } from '@bjarkehs/react-nice-dates'
import '@bjarkehs/react-nice-dates/build/style.css'
import { isSameDay } from 'date-fns'
import { enGB } from 'date-fns/locale'
import { motion } from "framer-motion"
import React, { useEffect, useState } from 'react'


export default function CalendarMi({nextDate, menstruationDates, ovulationDates}) {

  const [selectedDates, setSelectedDates] = useState([])

  const modifiers = {
    selected: date => selectedDates.some(selectedDate => isSameDay(selectedDate, date)),
		menstruation: date => menstruationDates.some(menstruationDates => isSameDay(menstruationDates, date)),
		ovulations: date => ovulationDates.some(ovulationDates => isSameDay(ovulationDates, date))
  }

	
	
	useEffect(() => {
		const fetchData = async () => {
			setSelectedDates([nextDate]);
		};
	
		fetchData();
	}, [nextDate]);
	

	const modifiersClassNames = {
		menstruation: '-menstruation',
		ovulations: '-ovulations'
	}
	
  const handleDayClick = date => {
    setSelectedDates([...selectedDates, date])
  }
  return (
		<motion.div className='calendar-wrapper DatePickerCal-box'
		initial={{ opacity: 0, scale: 0.5 }}
		animate={{ opacity: 1, scale: 1 }}
		transition={{ duration: 0.5 }}
		>
			<div className='instruct-cycle'>
				<div><div className='t-cycle'></div> Today </div>
				<div><div className='m-cycle'></div> Menstruation</div>
				<div><div className='ov-cycle'></div> Ovulation</div>
			</div>
    <Calendar 
		// onDayClick={handleDayClick} 
		modifiers={modifiers} 
		modifiersClassNames={modifiersClassNames}
		locale={enGB} 
		/>
		</motion.div>
  )
}