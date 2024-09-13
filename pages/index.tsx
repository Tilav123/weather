import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

export default function Home() {
  const [temperature, setTemperature] = useState(null);
  const [windSpeed, setWindSpeed] = useState(null);
  const [humidity, setHumidity] = useState(null);
  const [date, setDate] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [weatherIcon, setWeatherIcon] = useState('/cloud.png'); // Default icon
  const [query, setQuery] = useState('Samarkand');

  const fetchWeatherData = async (place) => {
    if (!place) return;
    setIsLoading(true);
    try {
      const response = await axios.get('https://api.weatherstack.com/current', {
        params: {
          access_key: process.env.NEXT_PUBLIC_API_KEY,
          query: place,
        },
      });

      if (response.data.error) {
        throw new Error(response.data.error.info);
      }

      const data = response.data;
      setTemperature(data.current.temperature);
      setWindSpeed(data.current.wind_speed);
      setHumidity(data.current.humidity);
      setDate(new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'long' }));
      setWeatherIcon(data.current.weather_icons[0]); // Set weather icon based on API response
    } catch (error) {
      console.error('Error fetching weather data:', error);
      setTemperature(null);
      setWindSpeed(null);
      setHumidity(null);
      setWeatherIcon('/cloud.png'); // Default icon in case of an error
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log('Latitude:', position.coords.latitude);
          console.log('Longitude:', position.coords.longitude);
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
    fetchWeatherData(query);
  }, [query]);

  const handleSearchChange = (e) => {
    setQuery(e.target.value);
  };

  return (
    <div className="w-[414px] h-auto px-[30px] m-auto pt-[35px]">
      <div className="rounded-[15px] flex bg-[#FFFFFF] w-[354px] h-[57px] items-center px-[16px] cursor-pointer mb-[132px]" style={{ boxShadow: "-6px 4px 4px 0px #FFFFFF1A inset, 2px -3px 6px 0px #0000001A inset" }}>
        <img src="/arrow.png" className="w-[24px] h-[24px]" alt="search icon" />
        <input
          type="text"
          className="px-[16px] outline-none bg-transparent font-overpass text-[#838BAA] flex-grow"
          onChange={handleSearchChange}
          placeholder="Search here"
          value={query}
        />
      </div>
      <img src={'cloud.png'} alt="weather icon" className="h-[172px] m-auto mb-[81px]" />
      <Link href={`/detail`}>
        <div className="w-[353px] h-[335px] rounded-[20px] pt-[17px]" style={{
          background: "rgba(255, 255, 255, 0.3)",
          border: "2px solid",
          borderRadius: "20px",
          borderImage: "radial-gradient(77.25% 77.25% at 69.89% 22.75%, rgba(255, 255, 255, 0.7) 0%, rgba(191, 191, 191, 0.7) 100%) 1"
        }}>
          <p className="font-overpass font-normal text-[18px] text-white text-center mb-[36px]"
            style={{
              textShadow: `-2px 3px 1px rgba(0, 0, 0, 0.1), -1px 1px 2px rgba(255, 255, 255, 0.25)`
            }}>
            {date ? `Today, ${date}` : 'Today'}
          </p>
          {isLoading ? (
            <p className="text-white font-normal text-[24px] font-overpass text-center">Loading...</p>
          ) : (
            <>
              <p className="text-white font-normal text-[100px] font-overpass text-center">{temperature !== null ? `${temperature}°` : '°'}</p>
              <div className="flex gap-[22px] w-[210px] m-auto mb-[22px]">
                <img src="/windy.png" alt="windy icon" className="w-[20px] h-[20px]" />
                <p className="font-overpass font-normal text-[18px] text-white">Windy</p>
                <hr className="w-[2px] bg-white h-[21px]" />
                <p className="font-overpass font-normal text-[18px] text-white">{windSpeed !== null ? `${windSpeed} km/h` : 'km/h'}</p>
              </div>
              <div className="flex gap-[22px] w-[210px] m-auto">
                <img src="/hum.png" alt="humidity icon" className="w-[20px] h-[20px]" />
                <p className="font-overpass font-normal text-[18px] text-white">Hum</p>
                <hr className="w-[2px] bg-white h-[21px]" />
                <p className="font-overpass font-normal text-[18px] text-white">{humidity !== null ? `${humidity} %` : '%'}</p>
                <img src={weatherIcon} className='w-[24px] h-[24px]' alt="weather icon" />
              </div>
            </>
          )}
        </div>
      </Link>
    </div>
  );
}

