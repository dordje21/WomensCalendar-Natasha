import { enUS, es } from 'date-fns/locale'
import React, { useState } from 'react'
import { DatePicker } from 'react-nice-dates'
import 'react-nice-dates/build/style.css'
export default function CalendarBirthday() {
  const [date, setDate] = useState()
  return (
    <div>
      <p>US English:</p>
      <DatePicker date={date} onDateChange={setDate} locale={enUS}>
        {({ inputProps, focused }) => (
          <input className={'input' + (focused ? ' -focused' : '')} {...inputProps} />
        )}
      </DatePicker>
      <p>Spanish:</p>
      <DatePicker date={date} onDateChange={setDate} locale={es} format='dd/MM/yyyy'>
        {({ inputProps, focused }) => (
          <input className={'input' + (focused ? ' -focused' : '')} {...inputProps} placeholder='DD/MM/YYYY' />
        )}
      </DatePicker>
    </div>
  )
}