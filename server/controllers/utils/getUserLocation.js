import fetch from 'node-fetch';

export async function getUserLocationFromIP(ip) {
  console.log(ip)
  if (ip === '::1' || ip === '127.0.0.1') {
    // Return a default location when running the server locally
    return {
      lat: 39.42167271768676,
      lng: -77.41143111563065,
    };
  }

  const response = await fetch(`http://ip-api.com/json/${ip}`);
  const data = await response.json();
  if (data.status === 'success') {
    return {
      lat: data.lat,
      lng: data.lon,
    };
  } else {
    throw new Error('Failed to get location from IP');
  }
}