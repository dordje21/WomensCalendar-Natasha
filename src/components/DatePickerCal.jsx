import { DatePickerCalendar } from '@bjarkehs/react-nice-dates'
import '@bjarkehs/react-nice-dates/build/style.css'
import { enGB } from 'date-fns/locale'
import { motion } from "framer-motion"
import React, { useState } from 'react'

export default function DatePickerCal({selectedValue, question, saveData}) {
  const [date, setDate] = useState()

  const handleChange = (newValue) => {
    setDate(newValue);
    selectedValue(newValue);
}

  return (
    <motion.div className='DatePickerCal'
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            >
      <p>{question}</p>
      <div className="DatePickerCal-box" >
        <DatePickerCalendar date={date} onDateChange={handleChange} locale={enGB} />
      </div>
      <div className='btn-wrapper'>
      {date ? <motion.button 
      className='btn-m' 
      onClick={saveData}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      >Save</motion.button> : <></>}
      </div>
    </motion.div>
  )
}