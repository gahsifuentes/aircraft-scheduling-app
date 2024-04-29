import React from 'react';
import AircraftTimeline from './AircraftTimeline';
import { useFlightList } from '../hooks/useFlightList';
import { Flight, useAirline } from '@/context/AirlineContext';

const Rotation = () => {
  const { rotations, selectedAircraft, flights } = useAirline();
  const { removeFlightFromRotation } = useFlightList(); // Using hook to obtain removeFlightFromRotation method
  const aircraftRotation = selectedAircraft ? rotations[selectedAircraft.ident] || [] : [];
  const rotationFlights = aircraftRotation
    .map(id => flights.find(flight => flight.ident === id))
    .filter((flight): flight is Flight => flight !== undefined);

  return (
    <div className="flex flex-col h-full">
      <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white text-center">Rotation Schedule for {selectedAircraft?.ident}</h2>
      {rotationFlights.length > 0 ? (
        <div className="flex-grow overflow-auto space-y-4">
          {rotationFlights.map((flight) => (
            // Externalize to a component ?
            <div key={flight.ident} className="card p-4 bg-white shadow rounded-lg dark:bg-gray-900 flex justify-between items-center cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-800 hover:border-dashed hover:border dark:hover:border hover:border-red-200 dark:hover:border-red-800"
                 onClick={() => removeFlightFromRotation(flight.ident)}
                 title="Remove from rotation?">
              <div className="text-left">
                <p className="text-lg font-semibold text-gray-900 dark:text-white">{flight.origin}</p>
                <p className="text-lg text-gray-700 dark:text-gray-300">{flight.readable_departure}</p>
              </div>
              <div className="mx-2 text-2xl text-gray-800 dark:text-gray-300">→</div>
              <div className="text-right">
                <p className="text-lg font-semibold text-gray-900 dark:text-white">{flight.destination}</p>
                <p className="text-lg text-gray-700 dark:text-gray-300">{flight.readable_arrival}</p>
              </div>
            </div>
          ))}
          <AircraftTimeline rotationFlights={rotationFlights} />
        </div>
      ) : (
        <div className="text-center mt-4 text-lg">
          <p className="text-gray-700 dark:text-gray-300">No flights in the rotation yet. Pick flights from the Available Flights panel to begin.</p>
        </div>
      )}
    </div>
  );
};

export default Rotation;
