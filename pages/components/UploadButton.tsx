import React from 'react';
import Button from '@mui/material/Button';

type Props = {
    text: string;
    handleClick: () => void;
}

const UploadButton: React.FC<Props> = ({ text, handleClick }) => {

    return (
        <div>
            <Button variant="contained" onClick={handleClick}>{text}</Button>
        </div>
    );
};

export default UploadButton;