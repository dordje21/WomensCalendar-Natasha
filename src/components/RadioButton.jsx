import { motion } from "framer-motion"

function RadioButton({ question, options, selectedValue, onChangeValue }) {
  return (
    <motion.div 
    initial={{ opacity: 0, scale: 0.5 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5 }}
    >
      <p>{question}</p>
      <div className='answers-q'>
      {Object.keys(options).map((option, index) => (
        <label key={index}>
          <input
            type="radio"
            value={option}
            checked={selectedValue === option}
            onChange={onChangeValue}
          />{options[option]}
        </label>
      ))}
      </div>
    </motion.div>
  );
}

export default RadioButton;
