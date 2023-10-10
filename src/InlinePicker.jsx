import { motion } from "framer-motion"
import { useEffect, useState } from 'react'
import Picker from 'react-mobile-picker'

// Function to render options for Picker
function renderOptions(options, selectedColor) {
    return options.map((option) => (
        <Picker.Item key={option} value={option}>
            {({ selected }) => (
                <div className={selected ? `font-semibold ${selectedColor}` : 'text-neutral-400'}>{option}</div>
            )}
        </Picker.Item>
    ))
}

// Define InlinePicker component
export default function InlinePicker({selectionsValue, selectedValue, question, pickersNext}) {
    const [pickerValue, setPickerValue] = useState({title: selectionsValue[0]});

    // Local state for button visibility
    const [showBtn, setShowBtn] = useState(false)

    // Function to handle Picker value changes
    const handleChange = (newValue) => {
        setPickerValue(newValue);
        selectedValue(newValue.title);
        setShowBtn(true)
    }

    // Initialize the selected value with the first selection value
    useEffect(() => {
        selectedValue(selectionsValue[0]);
    },[])

    // Function to handle button actions
    const btnActions = () => {
        pickersNext()
        setShowBtn(false)
    }

    // Return the structure of the InlinePicker component
    return <motion.div 
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            >
        <div className="mb-2 px-4 h-12 flex items-center bg-white border-t border-b border-gray-200 border-solid" >{question}</div>
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
        <div className='btn-wrapper'>
        {showBtn ? 
            <motion.button 
                className='btn-m' 
                onClick={btnActions}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                >Next</motion.button>
            : <></>}
        </div>
    </motion.div>
}