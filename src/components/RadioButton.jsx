
function RadioButton({ question, options, selectedValue, onChangeValue }) {
  return (
    <div>
      <p>{question}</p>
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
  );
}

export default RadioButton;
