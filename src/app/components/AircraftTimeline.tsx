import React from "react";
import { Flight } from "@/context/AirlineContext";
import * as HoverCard from "@radix-ui/react-hover-card";

enum SegmentType {
  FLIGHT = "flight",
  TURNAROUND = "turnaround",
  IDLE = "idle",
}

interface Segment {
  type: SegmentType;
  duration: number;
  startTime: number;
}

interface AircraftTimelineProps {
  rotationFlights: Flight[];
}

const TOTAL_TIME = 1440; // Total minutes in a day
const TURNAROUND_TIME = 20; // Turnaround time in minutes

const AircraftTimeline: React.FC<AircraftTimelineProps> = ({ rotationFlights }) => {
  const segments = calculateSegments(rotationFlights);

  return (
    <div className="sticky bottom-0 w-full bg-white dark:bg-gray-900 px-2 py-4">
      <div className="text-center font-bold mb-4">Aircraft Timeline</div>
      <div className="flex h-5">
        {segments.map((segment, index) => (
          <HoverCard.Root key={index}>
            <HoverCard.Trigger asChild>
              <div className={`cursor-pointer transform hover:scale-95 transition duration-300 h-8 rounded ${segmentClasses(segment.type)}`}
                   style={{ flex: `${(segment.duration / TOTAL_TIME) * 100}%` }}>
              </div>
            </HoverCard.Trigger>
            <HoverCard.Content className="bg-white dark:bg-gray-800 p-2 shadow-lg rounded-lg border border-gray-300 dark:border-gray-600">
              <div className="font-bold text-sm text-black dark:text-slate-200">
                {`${segment.type.charAt(0).toUpperCase() + segment.type.slice(1)}: ${formatTime(segment.startTime)} - ${formatTime(segment.startTime + segment.duration)}`}
              </div>
              <HoverCard.Arrow className="fill-current text-white dark:text-gray-600" />
            </HoverCard.Content>
          </HoverCard.Root>
        ))}
      </div>
    </div>
  );
};

function calculateSegments(rotationFlights: Flight[]): Segment[] {
  const segments: Segment[] = [];
  let lastEndTime = 0;

  rotationFlights.forEach((flight, index) => {
    const startMinute = flight.departuretime / 60;
    const endMinute = flight.arrivaltime / 60;

    // Add first IDLE segment
    if (index === 0 && startMinute > 0) {
      segments.push({ type: SegmentType.IDLE, duration: startMinute, startTime: 0 });
    }

    // Add Flight Segment
    segments.push({ type: SegmentType.FLIGHT, duration: endMinute - startMinute, startTime: startMinute });
    lastEndTime = endMinute + TURNAROUND_TIME;

    // Add Turnaround Segment
    segments.push({ type: SegmentType.TURNAROUND, duration: TURNAROUND_TIME, startTime: endMinute });

    if (index < rotationFlights.length - 1) {
      const nextStart = rotationFlights[index + 1].departuretime / 60;
      if (lastEndTime < nextStart) {
        segments.push({ type: SegmentType.IDLE, duration: nextStart - lastEndTime, startTime: lastEndTime });
      }
    }
  });

  // Add Last IDLE Segment
  if (lastEndTime < TOTAL_TIME) {
    segments.push({ type: SegmentType.IDLE, duration: TOTAL_TIME - lastEndTime, startTime: lastEndTime });
  }

  return segments;
}

function formatTime(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
}

function segmentClasses(type: SegmentType): string {
  switch (type) {
    case SegmentType.FLIGHT: return "bg-green-500";
    case SegmentType.TURNAROUND: return "bg-purple-500";
    default: return "bg-gray-500"; // Idle times
  }
}

export default AircraftTimeline;
