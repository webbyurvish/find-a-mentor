import { PropsWithChildren, useState } from 'react';
import styled from 'styled-components';
import { RadioButtonContainer } from './RadioButton';
import { RadioButtonContext } from './RadioButtonContext';

const StyledRadioButtonGroup = styled.div`
  ${RadioButtonContainer} + ${RadioButtonContainer} {
    margin-top: 10px;
  }
`;

const RadioButtonGroup = ({ value: defaultValue, onChange, children }) => {
  const [value, setValue] = useState < T > defaultValue;

  const onRadioButtonChange = (newValue) => {
    setValue(newValue);
    onChange(newValue);
  };

  return (
    <RadioButtonContext.Provider
      value={{ onChange: onRadioButtonChange, groupValue: value }}
    >
      <StyledRadioButtonGroup>{children}</StyledRadioButtonGroup>
    </RadioButtonContext.Provider>
  );
};

export default RadioButtonGroup;
