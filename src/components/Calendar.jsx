import { Calendar } from '@bjarkehs/react-nice-dates'
import '@bjarkehs/react-nice-dates/build/style.css'
import { isSameDay } from 'date-fns'
import { enGB } from 'date-fns/locale'
import { motion } from "framer-motion"
import React, { useEffect, useState } from 'react'

export default function CalendarMi({nextDate, menstruationDates, ovulationDates}) {

  const [selectedDates, setSelectedDates] = useState([])
	// Function to compare selected date with dates in menstruation and ovulation dates
  const modifiers = {
    selected: date => selectedDates.some(selectedDate => isSameDay(selectedDate, date)),
		menstruation: date => menstruationDates.some(menstruationDates => isSameDay(menstruationDates, date)),
		ovulations: date => ovulationDates.some(ovulationDates => isSameDay(ovulationDates, date))
  }

	// Side effect to set the selected dates when the nextDate property changes
	useEffect(() => {
		const fetchData = async () => {
			setSelectedDates([nextDate]);
		};
	
		fetchData();
	}, [nextDate]);

	// Define classes for menstruation and ovulation dates
	const modifiersClassNames = {
		menstruation: '-menstruation',
		ovulations: '-ovulations'
	}

	// Handle scroll event
	const handleScroll = (event) => {
		event.stopPropagation();
	};

	// Return the structure of the Calendar
	return (
		<div onWheel={handleScroll}>
		<motion.div className='calendar-wrapper DatePickerCal-box'
		initial={{ opacity: 0, scale: 0.5 }}
		animate={{ opacity: 1, scale: 1 }}
		transition={{ duration: 0.5 }}
		>
			<div className='instruct-cycle'>
				<div className='cycle'>
					<div className='t-cycle'></div>
					<div>Today</div>
				</div>
				<div className='cycle'>
					<div className='m-cycle'></div>
					<div>Menstruation</div>
				</div>
				<div className='cycle'>
					<div className='ov-cycle'></div>
					<div>Ovulation</div>
				</div>
			</div>
    <Calendar 
		modifiers={modifiers} 
		modifiersClassNames={modifiersClassNames}
		locale={enGB} 
		/>
		</motion.div>
		</div>
  )
}