import Main from './components/Main';
import { GetStaticProps } from 'next';
import styled from 'styled-components';
import getBearerToken from './api/auth';
import { getAllVideos } from './api/videos';

export default function Home({ uploadToken, bearerToken, videosData }) {
  return (
    <div>
      <Main
        uploadToken={uploadToken.token}
        bearerToken={bearerToken}
        videosData={videosData}
      />
    </div>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  const bearerToken = await getBearerToken();

  const uploadTokenRes = await fetch(
    `https://sandbox.api.video/upload-tokens`,
    {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${bearerToken}`,
        'Access-Control-Allow-Origin': '*',
      },
    }
  );

  const uploadToken = await uploadTokenRes.json();

  const videosData = await getAllVideos();

  return {
    props: { uploadToken, bearerToken, videosData },
  };
};
