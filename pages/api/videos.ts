import getBearerToken from './auth'

export default async function getAllVideos() {
  const bearerToken = localStorage.getItem('bearer_token')
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${bearerToken}`,
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": "true",
      "Access-Control-Allow-Methods": "GET,HEAD,OPTIONS,POST,PUT",
      "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, Authorization"

    }
  };
  const res = await fetch('https://sandbox.api.video/videos', options)
  const videos = res.json()

  console.log(videos)

}
