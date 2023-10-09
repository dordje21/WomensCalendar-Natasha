import { DatePickerCalendar } from '@bjarkehs/react-nice-dates'
import '@bjarkehs/react-nice-dates/build/style.css'
import { enGB } from 'date-fns/locale'
import React, { useState } from 'react'

export default function DatePickerCal({selectedValue, question, saveData}) {
  const [date, setDate] = useState()

  const handleChange = (newValue) => {
    setDate(newValue);
    selectedValue(newValue);
}

  return (
    <div className='DatePickerCal'>
      <p>{question}</p>
      {/* <p>
        Selected date: {date ? format(date, 'dd MMM yyyy', { locale: enGB }) : 'none'}.
      </p> */}
      <div className="DatePickerCal-box" >
        <DatePickerCalendar date={date} onDateChange={handleChange} locale={enGB} />
      </div>
      {date ? <button className='btn-m' onClick={saveData}>Save</button> : <></>}
    </div>
  )
}