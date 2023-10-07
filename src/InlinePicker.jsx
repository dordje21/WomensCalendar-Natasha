import { useState } from 'react'
import Picker from 'react-mobile-picker'

function renderOptions(options, selectedColor) {
    return options.map((option) => (
        <Picker.Item key={option} value={option}>
            {({ selected }) => (
                <div className={selected ? `font-semibold ${selectedColor}` : 'text-neutral-400'}>{option}</div>
            )}
        </Picker.Item>
    ))
}

export default function InlinePicker({selectionsValue, selectedValue, question}) {
    const [pickerValue, setPickerValue] = useState({});

    const handleChange = (newValue) => {
        setPickerValue(newValue);
        selectedValue(newValue.title);
    }

    return <>
        <div
            className="
        mb-2 px-4 h-12 flex items-center bg-white
        border-t border-b border-gray-200 border-solid
      "
        >{question}</div>
        <Picker
            className="px-4"
            value={pickerValue}
            onChange={handleChange}
            wheelMode="normal"
        >
            <Picker.Column name="title">
                {renderOptions(selectionsValue, 'text-red-600')}
            </Picker.Column>
        </Picker>
    </>
}