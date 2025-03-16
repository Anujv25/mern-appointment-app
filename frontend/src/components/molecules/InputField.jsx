// src/components/molecules/InputField.js
import React from 'react';
import Input from '../atoms/Input';
import Label from '../atoms/Label';

const InputField = ({ label, type, value, onChange ,name}) => (
  <div className="input-field">
    <Label text={label} />
    <Input type={type} value={value} name={name} onChange={onChange}/>
  </div>
);

export default InputField;
