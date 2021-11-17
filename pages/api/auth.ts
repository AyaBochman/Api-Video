
export default async function getBearerToken() {
    const result = await fetch(`https://sandbox.api.video/auth/api-key`, {
        method: 'POST', 
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': 'http://localhost:3000'
        },
        body: JSON.stringify({ apiKey: process.env.REACT_APP_API_KEY })
    })
    const data = await result.json();

    return data.access_token;
}
