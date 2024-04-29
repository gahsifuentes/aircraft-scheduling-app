import React from "react";
import { Flight } from "@/context/AirlineContext";

interface FlightItemProps {
  flight: Flight;
  addFlightToRotation: (flightId: string) => void;
  isClickable: boolean;
}

const FlightItem: React.FC<FlightItemProps> = React.memo(({ flight, addFlightToRotation, isClickable }) => (
  <li
  className={`card p-2 bg-white shadow rounded-lg dark:bg-gray-900 m-2 ${
    isClickable ? "cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-800 hover:border-solid hover:border dark:hover:border hover:border-blue-200 dark:hover:border-blue-700" : "cursor-default opacity-50"
  }`}
  onClick={() => isClickable && addFlightToRotation(flight.ident)}
  title={isClickable ? "Add to rotation" : "Unavailable: Aircraft not ready or flight does not follow from previous destination."}
>
  <div className="text-center font-semibold text-lg text-gray-900 dark:text-white">{flight.ident}</div>
  <div className="flex px-2 justify-between items-center mt-2">
    <div className="text-left">
      <p className="text-lg font-semibold text-gray-900 dark:text-white">{flight.origin}</p>
      <p className="text-sm text-gray-700 dark:text-gray-300">{flight.readable_departure}</p>
    </div>
    <div className="mx-2 text-lg text-gray-800 dark:text-gray-300">→</div>
    <div className="text-right">
      <p className="text-lg font-semibold text-gray-900 dark:text-white">{flight.destination}</p>
      <p className="text-sm text-gray-700 dark:text-gray-300">{flight.readable_arrival}</p>
    </div>
  </div>
</li>

));


export default FlightItem;