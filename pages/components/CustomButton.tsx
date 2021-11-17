import React from 'react';
import Button from '@mui/material/Button';
import styled from 'styled-components';

type Props = {
  text: string;
  handleClick: () => void;
  color?: string;
};

const CustomButton: React.FC<Props> = ({ text, handleClick, color = '' }) => {
  return (
    <StyledButton color={color}>
      <Button variant="contained" onClick={handleClick}>
        {text}
      </Button>
    </StyledButton>
  );
};

export default CustomButton;

const StyledButton = styled.div`
  .MuiButton-root {
    background-color: ${(props) => (props.color ? props.color : '')};
  }
`;
