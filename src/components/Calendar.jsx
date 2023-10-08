import { Calendar } from '@bjarkehs/react-nice-dates'
import '@bjarkehs/react-nice-dates/build/style.css'
import { getDay, isSameDay } from 'date-fns'
import { enGB } from 'date-fns/locale'
import React, { useEffect, useState } from 'react'
export default function CalendarMi({nextDate, periodLength, cycleLength}) {
	const [menstruationDates, setMenstruationDates] = useState([]);
	const [ovulationDates, setOvulationDates] = useState([]);
  const [selectedDates, setSelectedDates] = useState([])

  const modifiers = {
    selected: date => selectedDates.some(selectedDate => isSameDay(selectedDate, date)),
		disabled: date => getDay(date) === 1, 
		menstruation: date => menstruationDates.some(menstruationDates => isSameDay(menstruationDates, date)),
		ovulations: date => ovulationDates.some(ovulationDates => isSameDay(ovulationDates, date))
  }

	const countMenstDates = async () => {
		let menstrualDates = [];
		for( let m = -12; m < 24; m++ ){
			const actualDate = new Date(nextDate);
			actualDate.setDate(nextDate.getDate() + (cycleLength * m))
			for (let i = 0; i < periodLength; i++) {
				const newDate = new Date(actualDate);
				newDate.setDate(actualDate.getDate() + i);
				menstrualDates.push(newDate);
			}
		}

		return menstrualDates;
	}

	const countOvlDates = async () => {
		let ovlDates = [];
		const startOvl = new Date(nextDate);
		startOvl.setDate(startOvl.getDate() + cycleLength - 14 - 3); 
	
		for( let m = -12; m < 24; m++ ){
			const actualDate = new Date(startOvl);
			actualDate.setDate(startOvl.getDate() + (cycleLength * m))
			for (let i = 0; i < 6; i++) {
				const newDate = new Date(actualDate);
				newDate.setDate(actualDate.getDate() + i);
				ovlDates.push(newDate);
			}
		}
	
		return ovlDates;
	}
	
	useEffect(() => {
		const fetchData = async () => {
			setSelectedDates([nextDate]);
			const menstruationDates = await countMenstDates();
			setMenstruationDates(menstruationDates);

			const ovlDates = await countOvlDates();
			setOvulationDates(ovlDates);
		};
	
		fetchData();
	}, [nextDate, periodLength, cycleLength]);
	

	const modifiersClassNames = {
		menstruation: '-menstruation',
		ovulations: '-ovulations'
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