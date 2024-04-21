import React, { useEffect } from "react";
import { useAirline } from "@/context/AirlineContext";
import { Aircraft } from "@/context/AirlineContext";

const AircraftList = () => {
  const {
    aircrafts,
    selectedAircraft,
    setSelectedAircraft,
    rotations,
    flights,
  } = useAirline();

  const calculateUtilization = (aircraftIdent: string): string => {
    const rotationIds = rotations[aircraftIdent];
    if (!rotationIds || rotationIds.length === 0) return "0%";

    // Fetching flight details from the flights array
    const rotationFlights = rotationIds
      .map((id) => flights.find((flight) => flight.ident === id))
      .filter((flight) => flight !== undefined); // Ensure no undefined entries

    const totalScheduledTime = rotationFlights.reduce((total, flight) => {
      // Ensure flight is defined before accessing its properties
      if (flight) {
        return total + (flight.arrivaltime - flight.departuretime);
      }
      return total;
    }, 0);

    // Convert seconds to hours and calculate utilization
    const utilization = (totalScheduledTime / 3600 / 24) * 100; // 3600 seconds in an hour, 24 hours in a day
    return utilization.toFixed(2) + "%";
  };

  // Set the first aircraft as selected by default on initial render
  useEffect(() => {
    if (aircrafts.length > 0 && !selectedAircraft) {
      setSelectedAircraft(aircrafts[0]);
    }
  }, [aircrafts, selectedAircraft, setSelectedAircraft]);

  return (
    <div>
      <h2 className="text-center font-bold">Aircrafts</h2>
      {aircrafts.map((aircraft: Aircraft) => (
        <div
          key={aircraft.ident}
          className={`p-4 m-2 rounded-lg shadow-md cursor-pointer transition duration-300
                     bg-white hover:bg-blue-50 dark:bg-gray-900 dark:hover:bg-gray-800
                     ${
                       selectedAircraft?.ident === aircraft.ident
                         ? "bg-blue-200 dark:bg-gray-700 border-l-4 border-blue-300 dark:border-blue-600"
                         : ""
                     }`}
          onClick={() => setSelectedAircraft(aircraft)}
        >
          <p className="text-gray-900 dark:text-white">
            {aircraft.ident} - {aircraft.type}
            <br />
            Utilization: {calculateUtilization(aircraft.ident)}
          </p>
        </div>
      ))}
    </div>
  );
};

export default AircraftList;
