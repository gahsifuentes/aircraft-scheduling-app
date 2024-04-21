import React from "react";
import { useAirline } from "@/context/AirlineContext";

const FlightList = () => {
  const { flights, rotations, setRotations, selectedAircraft } = useAirline();

  // Function to add a flight to the current rotation
  const addFlightToRotation = (flightId: string) => {
    if (selectedAircraft) {
      const currentRotationsForAircraft =
        rotations[selectedAircraft.ident] || [];
      if (!currentRotationsForAircraft.includes(flightId)) {
        const updatedRotations = {
          ...rotations,
          [selectedAircraft.ident]: [...currentRotationsForAircraft, flightId],
        };
        setRotations(updatedRotations);
      }
    }
  };

  // Determine the last flight's details in the current rotation
  const lastFlight =
    selectedAircraft && rotations[selectedAircraft.ident]?.length
      ? flights.find(
          (f) =>
            f.ident ===
            rotations[selectedAircraft.ident][
              rotations[selectedAircraft.ident].length - 1
            ]
        )
      : null;

  // Mandatory turnaround time in seconds
  const mandatoryTurnaroundTime = 20 * 60;

  return (
    <div>
      <h2 className="text-center font-bold">Available Flights</h2>
      <div className="max-h-screen overflow-y-auto">
        <ul>
          {flights.map((flight) => {
            const isClickable =
              !lastFlight ||
              (flight.departuretime >
                lastFlight.arrivaltime + mandatoryTurnaroundTime &&
                flight.origin === lastFlight.destination); // Checks both time and destination-continuity
            return (
              <li
                key={flight.ident}
                className={`card p-2 bg-white shadow rounded-lg dark:bg-gray-900 m-2 ${
                  isClickable
                    ? "cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-800 hover:border-solid hover:border dark:hover:border hover:border-blue-200 dark:hover:border-blue-700"
                    : "cursor-default opacity-50"
                }`}
                onClick={() => isClickable && addFlightToRotation(flight.ident)}
                title={
                  isClickable
                    ? "Add to rotation"
                    : `Cannot add: Aircraft not ready or flight does not follow from ${
                        lastFlight
                          ? lastFlight.destination
                          : "previous destination"
                      }.`
                }
              >
                <div className="text-center font-semibold text-lg text-gray-900 dark:text-white">
                  {flight.ident}
                </div>
                <div className="flex px-2 justify-between items-center mt-2">
                  <div className="text-left">
                    <p className="text-lg font-semibold text-gray-900 dark:text-white">
                      {flight.origin}
                    </p>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      {flight.readable_departure}
                    </p>
                  </div>
                  <div className="mx-2 text-lg text-gray-800 dark:text-gray-300">
                    →
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-semibold text-gray-900 dark:text-white">
                      {flight.destination}
                    </p>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      {flight.readable_arrival}
                    </p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default FlightList;
