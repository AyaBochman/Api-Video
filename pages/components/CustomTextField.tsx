import React from 'react';
import TextField from '@mui/material/TextField'
import styled from 'styled-components'

type Props = {
    value: string;
    label: string;
    name: string;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    multiline?: boolean;
    maxRows?: number;
}

const CustomTextField: React.FC<Props> = ({ value, label, multiline = false, maxRows = 4, handleChange, name }) => {
    return (
        <StyledTextField>

            <TextField id="outlined-basic" value={value} label={label} name={name} onChange={handleChange} multiline={multiline} rows={maxRows} variant="outlined" />
        </StyledTextField>
    );
};

export default CustomTextField;

const StyledTextField = styled.div`
display: block;
margin-bottom: 15px;
font-family: 'Montserrat', sans-serif;
.MuiFormControl-root{
    width: 80%;
}
& .MuiOutlinedInput-root {
    &.Mui-focused fieldset {
      border-color: #EF8354;
    }
  }
 & label.Mui-focused {
     color: #EF8354;
   } 
`;

