import React from "react";
import { Flight } from "@/context/AirlineContext";
import * as HoverCard from "@radix-ui/react-hover-card";

interface AircraftTimelineProps {
  rotationFlights: Flight[];
}

const AircraftTimeline: React.FC<AircraftTimelineProps> = ({
  rotationFlights,
}) => {
  const totalTime = 1440; // Total minutes in a day

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours.toString().padStart(2, "0")}:${mins
      .toString()
      .padStart(2, "0")}`;
  };

  const segments = [];
  let lastEndTime = 0; // End time of the last segment

  // Calculate initial idle time if necessary
  if (rotationFlights.length > 0 && rotationFlights[0].departuretime / 60 > 0) {
    const firstFlightStart = rotationFlights[0].departuretime / 60;
    segments.push({ type: "idle", duration: firstFlightStart, startTime: 0 });
    lastEndTime = firstFlightStart;
  }

  rotationFlights.forEach((flight, index) => {
    const startMinute = flight.departuretime / 60;
    const endMinute = flight.arrivaltime / 60;
    const flightDuration = endMinute - startMinute;

    // Add flight segment
    segments.push({
      type: "flight",
      duration: flightDuration,
      startTime: startMinute,
    });
    lastEndTime = endMinute;

    // Always add a 20-minute turnaround time after each flight
    const turnaroundTime = 20;
    if (lastEndTime + turnaroundTime <= totalTime) {
      // Check if adding turnaround exceeds the total time
      segments.push({
        type: "turnaround",
        duration: turnaroundTime,
        startTime: endMinute,
      });
      lastEndTime += turnaroundTime;
    }

    // Calculate and add idle time between flights if needed
    const nextFlightStart =
      index < rotationFlights.length - 1
        ? rotationFlights[index + 1].departuretime / 60
        : totalTime;
    if (lastEndTime < nextFlightStart) {
      // Only add idle time if there's a gap
      segments.push({
        type: "idle",
        duration: nextFlightStart - lastEndTime,
        startTime: lastEndTime,
      });
      lastEndTime = nextFlightStart;
    }
  });

  // Ensure that the timeline fills the container correctly
  return (
    <div className="sticky bottom-0 w-full bg-white dark:bg-gray-900 px-2 ">
      <div className="text-center font-bold mb-4 pt-2">Aircraft Timeline</div>
      <div className="flex h-5">
        {segments.map((segment, index) => (
          <HoverCard.Root key={index}>
            <HoverCard.Trigger asChild>
              <div
                className="cursor-pointer transform hover:scale-95 transition duration-300 h-8 rounded"
                style={{
                  flex: `${(segment.duration / totalTime) * 100}%`,
                  backgroundColor: getColor(segment.type),
                }}
              ></div>
            </HoverCard.Trigger>
            <HoverCard.Content className="bg-white dark:bg-gray-800 p-2 shadow-lg rounded-lg border border-gray-300 dark:border-gray-600">
              <div className="font-bold text-sm text-black dark:text-slate-200">
                {`${
                  segment.type.charAt(0).toUpperCase() + segment.type.slice(1)
                }: ${formatTime(segment.startTime)} - ${formatTime(
                  segment.startTime + segment.duration
                )}`}
              </div>
              <HoverCard.Arrow className="fill-current text-white dark:text-gray-600" />
            </HoverCard.Content>
          </HoverCard.Root>
        ))}
      </div>
      <div className="text-center italic text-sm text-gray-600 dark:text-gray-300 mt-4">
        Hover over each event to see more details.
      </div>
    </div>
  );

  function getColor(type: string): string {
    switch (type) {
      case "flight":
        return "green";
      case "turnaround":
        return "purple";
      default:
        return "gray"; // Idle times
    }
  }
};

export default AircraftTimeline;
