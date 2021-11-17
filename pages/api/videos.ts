
import getBearerToken from './auth'

type UploadObj = {
  title: string;
  description?: string;
  tags?: string[];
  playerId?: string;
}

export async function uploadVideo(body) {
  const bearerToken = localStorage.getItem('bearer_token')
  let uploadBody: UploadObj | {} = {};
  Object.keys(body).forEach((key) => {
    if (body[key]) {
      uploadBody[key] = body[key]
    }
  })
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${bearerToken}`,
    },
    body: JSON.stringify(uploadBody)
  };
  const res = await fetch('https://sandbox.api.video/videos', options)
  const uploadedVideo = await res.json()
  return uploadedVideo.videoId;
}

export async function getAllVideos() {
  const bearerToken = await getBearerToken();
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${bearerToken}`,
    }
  };
  const res = await fetch('https://sandbox.api.video/videos', options)
  const videos = await res.json()

  return videos;
}

export async function getVideoStatus(videoId) {
  const bearerToken = localStorage.getItem('bearer_token')
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${bearerToken}`,
    }
  };
  const res = await fetch(`https://sandbox.api.video/videos/${videoId}/status`, options)
  const videoStatus = await res.json()

  return videoStatus;
}
