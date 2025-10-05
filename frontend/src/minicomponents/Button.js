import React from 'react';
export const handleClick=()=>{
    alert('Data submitted successfully');
}
export const Button = ({
  //default values
  onClick,
  color = '',
  backgroundColor = '',
  margin = '8px',
  padding = '',
  label = '',
  name='',
  age=''
}) => 
    {
  const buttonStyle = {
    color,
    backgroundColor,
    margin,
    padding,
    border: '',
    borderRadius: '',
    cursor: '',
  };

  return (
    <button style={buttonStyle} onClick={handleClick}>
      {label}
    </button>
  );
};
