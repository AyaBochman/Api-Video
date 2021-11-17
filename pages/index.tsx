import Main from './components/Main';
import { GetStaticProps } from 'next';
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
  // const bearerToken = await getBearerToken();
  const bearerTokenRes = await fetch(`https://sandbox.api.video/auth/api-key`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
    body: JSON.stringify({ apiKey: process.env.REACT_APP_API_KEY }),
  });
  const bearerToken = await bearerTokenRes.json();

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
    props: {
      uploadToken: uploadToken,
      bearerToken: bearerToken,
      videosData: videosData,
    },
  };
};
