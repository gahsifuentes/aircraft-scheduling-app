import { useFlightList } from '@/app/hooks/useFlightList';
import React from 'react';
import FlightItem from './FlightItem';

const FlightList = () => {
  const { flights, addFlightToRotation, getFlightEligibility } = useFlightList(); // Using hook to obtain flight related functions

  return (
    <div>
      <h2 className="text-center font-bold pb-2">Available Flights</h2>
      <div className="max-h-screen overflow-y-auto">
        <ul>
          {flights.map(flight => {
            const isClickable = getFlightEligibility(flight);
            return (
              <FlightItem
                key={flight.ident}
                flight={flight}
                addFlightToRotation={addFlightToRotation}
                isClickable={isClickable}
              />
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default FlightList;
