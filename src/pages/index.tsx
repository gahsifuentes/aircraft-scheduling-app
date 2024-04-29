import { useAirline } from '@/context/AirlineContext';
import React, { useEffect, useState } from 'react';
import AircraftList from '../app/components/AircraftList';
import Rotation from '../app/components/Rotation';
import FlightList from '../app/components/flights/FlightList';


const Home = () => {
  const { setAircrafts, setFlights } = useAirline();

  // State for storing the currently displayed date
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetching all aircrafts
        const aircraftsResponse = await fetch('https://recruiting-assessment.alphasights.com/api/aircrafts');
        const aircraftsData = await aircraftsResponse.json();
        setAircrafts(aircraftsData);

        // Fetching all flights
        const flightsResponse = await fetch('https://recruiting-assessment.alphasights.com/api/flights');
        const flightsData = await flightsResponse.json();
        setFlights(flightsData);
      } catch (error) {
        console.error("Failed to fetch data", error);
      }
    }

    fetchData();
  }, [setAircrafts, setFlights]);

   // Calculate tomorrow's date
   useEffect(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    setDate(tomorrow);
  }, []);

  // Function to format the date
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', { month: 'long', day: '2-digit', year: 'numeric' }).format(date);
  };

  return (
    <div>
      <div className="w-full text-center p-4 bg-gray-200 dark:bg-gray-900">
        <button onClick={() => setDate(new Date(date.setDate(date.getDate() - 1)))}>&lt;</button>
        <span className="mx-4">{formatDate(date)}</span>
        <button onClick={() => setDate(new Date(date.setDate(date.getDate() + 1)))}>&gt;</button>
      </div>
      <div className="flex flex-col md:flex-row">
        <div className="flex-initial w-full md:w-1/4 bg-gray-100 dark:bg-slate-700 p-4">
          <AircraftList />
        </div>
        <div className="flex-grow w-full md:w-1/2 bg-white dark:bg-slate-800 p-4">
          <Rotation />
        </div>
        <div className="flex-initial w-full md:w-1/4 bg-gray-200 dark:bg-slate-700 p-4">
          <FlightList />
        </div>
      </div>
    </div>
  );
};

export default Home;