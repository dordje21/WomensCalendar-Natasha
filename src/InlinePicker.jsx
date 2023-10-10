import { motion } from "framer-motion"
import { useEffect, useState } from 'react'
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

export default function InlinePicker({selectionsValue, selectedValue, question, pickersNext}) {
    const [pickerValue, setPickerValue] = useState({title: selectionsValue[0]});

    const [showBtn, setShowBtn] = useState(false)

    const handleChange = (newValue) => {
        setPickerValue(newValue);
        selectedValue(newValue.title);
        setShowBtn(true)
    }

    useEffect(() => {
        selectedValue(selectionsValue[0]);
    },[])

    const btnActions = () => {
        pickersNext()
        setShowBtn(false)
    }

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
        {showBtn ? <div>
        <motion.button 
            className='btn-m' 
            onClick={btnActions}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            >Next</motion.button>
        </div> : <></>}
    </motion.div>
}