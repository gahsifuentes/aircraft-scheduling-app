import { Flight, useAirline } from "@/context/AirlineContext";

export const useFlightList = () => {
  const { flights, rotations, setRotations, selectedAircraft } = useAirline();

  const addFlightToRotation = (flightId: string) => {
    if (selectedAircraft) {
      const currentRotationsForAircraft = rotations[selectedAircraft.ident] || [];
      if (!currentRotationsForAircraft.includes(flightId)) {
        const updatedRotations = {
          ...rotations,
          [selectedAircraft.ident]: [...currentRotationsForAircraft, flightId],
        };
        setRotations(updatedRotations);
      }
    }
  };

  const removeFlightFromRotation = (flightId: string) => {
    if (selectedAircraft) {
      const updatedRotation = rotations[selectedAircraft.ident].filter(id => id !== flightId);
      setRotations({
        ...rotations,
        [selectedAircraft.ident]: updatedRotation
      });
    }
  };

  const getFlightEligibility = (flight: Flight) => {
    const lastFlight = selectedAircraft && rotations[selectedAircraft.ident]?.length
      ? flights.find(f => f.ident === rotations[selectedAircraft.ident][rotations[selectedAircraft.ident].length - 1])
      : null;
    const mandatoryTurnaroundTime = 20 * 60; // 20 minutes
    return !lastFlight || (
      flight.departuretime > lastFlight.arrivaltime + mandatoryTurnaroundTime &&
      flight.origin === lastFlight.destination
    );
  };

  return { flights, addFlightToRotation, removeFlightFromRotation, getFlightEligibility };
};
