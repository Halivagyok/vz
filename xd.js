
async function getSunriseSunset(latitude, longitude) {
  const apiUrl = `https://api.sunrise-sunset.org/json?lat=${latitude}&lng=${longitude}&formatted=0`; // 'formatted=0' returns UTC time
  
  const response = await fetch(apiUrl);
  const data = await response.json();

  const sunriseUTC = new Date(data.results.sunrise);
  const sunsetUTC = new Date(data.results.sunset);

  return {
    sunrise: sunriseUTC,
    sunset: sunsetUTC
  };
}

// Convert UTC time to local time without seconds
function convertToLocalTime(date, timeZone) {
  return new Intl.DateTimeFormat('en-US', {
    timeZone: timeZone,
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  }).format(date);
}

// Example usage
(async () => {
  const latitude = 52.3676;  // Latitude of Amsterdam
  const longitude = 4.9041;  // Longitude of Amsterdam

  const { sunrise, sunset } = await getSunriseSunset(latitude, longitude);

  // Convert to local time (Netherlands is in the 'Europe/Amsterdam' time zone)
  const sunriseLocal = convertToLocalTime(sunrise, 'Europe/Amsterdam');
  const sunsetLocal = convertToLocalTime(sunset, 'Europe/Amsterdam');

  console.log('Sunrise in Amsterdam:', sunriseLocal);
  console.log('Sunset in Amsterdam:', sunsetLocal);
})();
//////////////////////////

