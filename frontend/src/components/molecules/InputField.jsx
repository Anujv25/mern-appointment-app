// src/components/molecules/InputField.js
import React from 'react';
import Input from '../atoms/Input';
import Label from '../atoms/Label';

const InputField = ({ label, type, value, onChange }) => (
  <div className="input-field">
    <Label text={label} />
    <Input type={type} value={value} onChange={onChange} props/>
  </div>
);

export default InputField;
