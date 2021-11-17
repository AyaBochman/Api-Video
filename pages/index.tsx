import Main from './components/Main';
import { GetStaticProps } from 'next'
import styled from 'styled-components'
import getBearerToken from './api/auth'

export default function Home({ uploadTokenRes, bearerToken }) {
  return (
    <div>
      <Main uploadToken={uploadTokenRes.token} bearerToken={bearerToken} />
    </div>
  )
}

export const getStaticProps: GetStaticProps = async (context) => {

  const bearerToken = await getBearerToken();

  const uploadToken = await fetch(`https://sandbox.api.video/upload-tokens`, {
    method: 'POST', headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${bearerToken}`,
      'Access-Control-Allow-Origin': '*'
    },
  })

  const uploadTokenRes = await uploadToken.json();

  return {
    props: { uploadTokenRes, bearerToken }
  }
}
