
function RadioButton({ question, options, selectedValue, onChangeValue }) {
  return (
    <div>
      <p>{question}</p>
      <div className='answers-q'>
      {Object.keys(options).map((option, index) => (
        <label key={index}>
          <input
            type="radio"
            value={option}
            checked={selectedValue === option}
            onChange={onChangeValue}
          />{" "}
          {options[option]}
        </label>
      ))}
      </div>
    </div>
  );
}

export default RadioButton;
