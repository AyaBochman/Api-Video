import React from 'react';
import styled from 'styled-components';

type Props = {
  key: string;
  videoSrc: string;
};

const VideoBox: React.FC<Props> = ({ videoSrc }) => {
  return (
    <StyledVideoBox>
      <iframe
        src={videoSrc}
        width="100%"
        className={'iframe'}
        height="100%"
        frameBorder="0"
        scrolling="no"
        allowFullScreen={true}
      ></iframe>
    </StyledVideoBox>
  );
};

export default VideoBox;

const StyledVideoBox = styled.div`
  width: 400px;
  height: 300px;
  border: 1px solid black;
  border-radius: 20px;
  position: relative;
  display: inline-flex;
  margin: 0 50px 50px 0;
  .iframe {
    width: 100%;
    height: 100%;
    position: absolute;
    display: block;
    top: 0;
    left: 0;
    border-radius: 20px;
  }
`;
