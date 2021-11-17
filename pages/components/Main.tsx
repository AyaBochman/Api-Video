import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components'
import CustomButton from './CustomButton'
import { VideoUploader } from '@api.video/video-uploader'
import { uploadVideo, getAllVideos, getVideoStatus } from '../api/videos'
import Button from '@mui/material/Button'
import CustomTextField from './CustomTextField'

import Loading from './Loading'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'

import VideoBox from './VideoBox'

type Props = {
    uploadToken: string;
    bearerToken: string;
    videosData: any;
}

const Main: React.FC<Props> = (props) => {
    const [file, setFile] = useState(null)
    const [totalPercentComplete, setTotalPercentComplete] = useState(0)
    const fileInputRef = useRef(null)
    const [isLoading, setIsLoading] = useState(false)
    const [isUploaded, setIsUploaded] = useState(false)
    const [videosArr, setVideosArr] = useState([])
    const [uploadedVideo, setUploadedVideo] = useState({})
    const [isVideoPlayable, setVideoPlayable] = useState(false)

    const initialInputProps = {
        title: '',
        description: '',
        tags: '',
        playerId: ''
    }

    const [inputs, setInputs] = useState(initialInputProps)

    useEffect(() => {
        localStorage.setItem('upload_token', props.uploadToken)
        localStorage.setItem('bearer_token', props.bearerToken)
        if (props.videosData?.data?.length) {
            setVideosArr(props.videosData.data);
        }
    }, [props])


    const clearInputs = () => {
        setIsUploaded(false);
        setFile(null)
        setInputs(initialInputProps)
    }

    const handleFileSelected = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const files = Array.from(e.target.files)

        setFile(files[0])
        if (files[0]?.name) {
            setInputs({ ...inputs, title: files[0].name })
        }
    }

    const handleUploadFile = (): void => {
        clearInputs()
        fileInputRef.current.click();
    }

    const handleSubmit = async () => {
        const uploadObj = { ...inputs }
        if (uploadObj.tags) {
            uploadObj.tags = uploadObj.tags.split(',')
        }
        const videoId = await uploadVideo(uploadObj)
        if (videoId) {
            const uploader = new VideoUploader({
                file: file,
                uploadToken: localStorage.getItem('upload_token'),
                videoId
            });

            setIsLoading(true)
            uploader.onProgress((event) => {
                let totalPercentComplete = Math.round(event.uploadedBytes / event.totalBytes * 100);
                setTotalPercentComplete(totalPercentComplete)
                if (totalPercentComplete === 100) {
                    setIsLoading(false)
                }
            })
            const video = await uploader.upload();

            setUploadedVideo(video)
            setIsUploaded(true)
        }

    }

    const checkPlayable = async (videoId) => {
        const videoStatus = await getVideoStatus(videoId);
        return videoStatus.encoding.playable;
    }

    useEffect(() => {
        if (isUploaded) {
            const interval = setInterval(() => {
                const playable = checkPlayable(uploadedVideo.videoId)
                if (playable) {
                    setVideosArr([...videosArr, uploadedVideo])
                    clearInterval(interval);
                }
            }, 2000);
        }
    }, [isUploaded])

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputs({
            ...inputs,
            [e.target.name]: e.target.value
        })
    }

    return (
        <StyledMain>
            <div className={'header'}>Upload Your Video</div>


            <form className={'form'}>
                <div className={'choose-file'}>
                    <input ref={fileInputRef} className={'file-input'} type="file" name="source" onChange={handleFileSelected} />
                    <CustomButton text={'choose file'} color={'#EF8354'} handleClick={handleUploadFile} />
                </div>

                <CustomTextField value={inputs.title} label={'Video Name'} name={'title'} handleChange={onInputChange} />
                <CustomTextField value={inputs.description} label={'Description'} name={'description'} multiline={true} maxRows={4} handleChange={onInputChange} />
                <CustomTextField value={inputs.tags} label={'Tags'} name={'tags'} handleChange={onInputChange} />
                <CustomTextField value={inputs.playerId} label={'Player ID'} name={'playerId'} handleChange={onInputChange} />

                <div className={'upload-file'}>
                    <CustomButton text={'upload video'} color={'#EF8354'} handleClick={handleSubmit} />
                    <div className={'icons-container'}>
                        {isLoading ? <Loading /> : null}
                        {isUploaded ? <FontAwesomeIcon icon={faCheck} className={'check-icon'} size="lg" /> : null}
                    </div>
                </div>
            </form>

            <section className={'gallery-section'}>

                <div className={'header'}>Watch Your Video Gallery</div>
                <div>Choose by your tags:</div>
                {/* <Button variant="contained" onClick={getVideos}>get all</Button> */}
                <div className={'videos-container'}>
                    {videosArr.length ? videosArr.map((video, i) => {
                        return <VideoBox key={`video${i}`} videoSrc={video.assets.player} />
                    }) : <div>No Uploded Videos Yet!</div>}
                </div>

            </section>

        </StyledMain>
    );
};

export default Main;

const StyledMain = styled.div`
text-align: center;
color: #EF8354;
background-color: #4F5D75;
.file-input{
display: none;
}
.header{
    font-size: 40px;
    padding: 40px;
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
.choose-file{
margin-bottom: 15px;
}
.upload-file{
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
.gallery-section{
    margin-top: 50px;
    background-color: #2D3142;
}
.videos-container{
    display: flex;
    flex-wrap: wrap;
}
`;
