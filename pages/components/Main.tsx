import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components'
import CustomButton from './CustomButton'
import { VideoUploader } from '@api.video/video-uploader'
import getAllVideos from '../api/videos'
import Button from '@mui/material/Button'
import CustomTextField from './CustomTextField'

import Loading from './Loading'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'

type Props = {
    uploadToken: string;
    bearerToken: string;
}

const Main: React.FC<Props> = (props) => {
    const [file, setFile] = useState(null)
    const [totalPercentComplete, setTotalPercentComplete] = useState(0)
    const [videoSrc, setVideoSrc] = useState('')
    const fileInputRef = useRef(null)
    const [isLoading, setIsLoading] = useState(false)
    const [isUploaded, setIsUploaded] = useState(false)

    useEffect(() => {
        localStorage.setItem('upload_token', props.uploadToken)
        localStorage.setItem('bearer_token', props.bearerToken)
    }, [props])

    const handleFileSelected = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const files = Array.from(e.target.files)
        const uploader = new VideoUploader({
            file: files[0],
            uploadToken: localStorage.getItem('upload_token'),

        });

        setIsLoading(true)

        uploader.upload().then((res) => {
            console.log('res', res);
            setVideoSrc(res.assets.player)
        }
        );

        uploader.onProgress((event) => {
            let percentComplete = Math.round(event.currentChunkUploadedBytes / event.chunksBytes * 100);
            let totalPercentComplete = Math.round(event.uploadedBytes / event.totalBytes * 100);
            setTotalPercentComplete(totalPercentComplete)
            if (totalPercentComplete === 100) {
                setIsLoading(false)
                setIsUploaded(true)
            }
        })

    }

    const handleUploadFile = (): void => {
        fileInputRef.current.click();
    }

    const getVideos = async () => {
        await getAllVideos()
    }

    const handleSubmit = () => {
        console.log('hi submit')
    }

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.name, e.target.value)
    }

    return (
        <StyledMain>
            <div className={'header'}>Upload Your Video</div>

            <form onSubmit={handleSubmit} className={'form'}>
                <input ref={fileInputRef} className={'file-input'} type="file" name="source" onChange={handleFileSelected} />
               

                <CustomTextField label={'Video Name'} name={'title'} handleChange={onInputChange} />
                <CustomTextField label={'Description'} name={'description'} multiline={true} maxRows={4} handleChange={onInputChange} />
                <CustomTextField label={'Tags'} name={'tags'} handleChange={onInputChange} />

                <div className={'upload-section'}>
                    <CustomButton text={'upload file'} color={'#EF8354'} handleClick={handleUploadFile} />
                    <div className={'icons-container'}>
                        {isLoading ? <Loading /> : null}
                        {isUploaded ? <FontAwesomeIcon icon={faCheck} className={'check-icon'} size="lg" /> : null}
                    </div>
                </div>
                {/* <div>
                    <span>Progress: {totalPercentComplete}%</span>
                </div> */}

                {/* Your uploaded video:
                    <Box><iframe src={videoSrc} width="100%" className={'iframe'} height="100%" frameBorder="0" scrolling="no" allowFullScreen={true}></iframe>
                    </Box> */}
                {/* <TextField id="standard-basic"  variant="standard" />
                    <TextField id="standard-basic" label="Video Description" variant="standard" /> */}
                {/* <input type="text"/>

                <Button variant={"contained"} type={'submit'}>Send</Button> */}

            </form>


            {/* <div className={'header'}>Video Gallery</div>
            <Button variant="contained" onClick={getVideos}>get all</Button> */}
        </StyledMain>
    );
};

export default Main;

const StyledMain = styled.div`
text-align: center;
color: #EF8354;
padding: 40px;
/* text-shadow: 1px 1px #fff; */
background-color: #4F5D75;
.file-input{
display: none;
}
.header{
    font-size: 40px;
    margin-bottom: 20px;
}
.form{
    width: 600px;
    height: 100%;
    background-color: #fff;
    border-radius: 10px;
    margin: 0 auto;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
   box-sizing: border-box;
   padding: 30px;
}
.upload-section{
    display: flex;
    justify-content: center;
    align-items: center;
}
.check-icon{
    color: #4CBB17;
}
.icons-container{
    margin-left: 15px;
}
`;

const Box = styled.div`
width: 400px;
height: 300px;
border: 1px solid black;
border-radius: 30px;
position: relative;
margin: 0 auto;
.iframe{
    width: 100%;
    height: 100%;
    position: absolute;
    display: block;
    top: 0;
    left: 0;
    border-radius: 30px;
}

`;