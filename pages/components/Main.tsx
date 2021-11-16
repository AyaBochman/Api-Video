import React, { useEffect, useState } from 'react';
import styled from 'styled-components'
import UploadButton from './UploadButton'
import { VideoUploader } from '@api.video/video-uploader'

type Props = {
    uploadToken: string;
}

const Main: React.FC<Props> = (props) => {
    const [file, setFile] = useState(null)

    useEffect(() => {
        localStorage.setItem('upload_token', props.uploadToken)
    }, [props])

    const handleFileSelected = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const files = Array.from(e.target.files)
        setFile(files[0])
    }

    const handleUploadFile = (): void => {
        const uploader = new VideoUploader({
            file: file,
            uploadToken: localStorage.getItem('upload_token')
        });
        uploader.upload();
    }

    return (
        <StyledMain>
            <h1>Upload Your Banner Video</h1>
            <input type="file" name="source" onChange={handleFileSelected} />
            <UploadButton text={'upload'} handleClick={handleUploadFile} />
        </StyledMain>
    );
};

export default Main;

const StyledMain = styled.div`
font-family: Arial, Helvetica, sans-serif;
text-align: center;
`;