import Checkbox from '../../icons/Checkbox.svg';
import UnCheckBox from '../../icons/UnCheckbox.svg';
import { useState, useEffect } from 'react';
import './checkbox.css'

const CustomCheckbox = ({ checked = false, label, onChange }) => {
  const [isChecked, setIsChecked] = useState(checked);

  useEffect(() => {
    setIsChecked(checked);
  }, [checked]);

  const toggleCheckBox = () => {
    const newValue = !isChecked;
    setIsChecked(newValue);
    onChange?.(newValue);
  };

  const inputId = `custom-checkbox-${label}`;

  return (
    <div className="checkbox-item" aria-checked={isChecked}>
      <label className="custom-checkbox" htmlFor={inputId}>
        <input
          id={inputId}
          type="checkbox"
          checked={isChecked}
          onChange={toggleCheckBox}
        />
        <img src={isChecked ? Checkbox : UnCheckBox} alt={`${label} checkbox`} />
      </label>
      <span className="checkbox-label" onClick={toggleCheckBox}>{label}</span>
    </div>
  );
};

export default CustomCheckbox;
