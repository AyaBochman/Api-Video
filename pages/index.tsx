import Main from './components/Main';
import { GetStaticProps } from 'next'

export default function Home({ uploadTokenRes }) {
  return (
    <div>
      <Main uploadToken={uploadTokenRes.token} />
    </div>
  )
}

export const getStaticProps: GetStaticProps = async (context) => {
  const res = await fetch(`https://sandbox.api.video/auth/api-key`, {
    method: 'POST', headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ apiKey: process.env.REACT_APP_API_KEY })
  })
  const data = await res.json();

  const uploadToken = await fetch(`https://sandbox.api.video/upload-tokens`, {
    method: 'POST', headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${data.access_token}`
    },
  })

  const uploadTokenRes = await uploadToken.json();

  return {
    props: { uploadTokenRes }
  }
}