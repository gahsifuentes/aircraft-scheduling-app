import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  FC,
} from "react";

export interface Aircraft {
  ident: string;
  type: string;
  economySeats: number;
  base: string;
}

export interface Flight {
  ident: string;
  departuretime: number;
  arrivaltime: number;
  readable_departure: string;
  readable_arrival: string;
  origin: string;
  destination: string;
}

// Using an object to manage rotations by aircraft ID
interface Rotations {
  [aircraftIdent: string]: string[]; // This will store flight identifiers for each aircraft
}

interface AirlineContextType {
  aircrafts: Aircraft[];
  setAircrafts: (aircrafts: Aircraft[]) => void;
  flights: Flight[];
  setFlights: (flights: Flight[]) => void;
  selectedAircraft: Aircraft | null;
  setSelectedAircraft: (aircraft: Aircraft) => void;
  rotations: Rotations;
  setRotations: (rotations: Rotations) => void;
}

const defaultState: AirlineContextType = {
  aircrafts: [],
  setAircrafts: () => {},
  flights: [],
  setFlights: () => {},
  selectedAircraft: null,
  setSelectedAircraft: () => {},
  rotations: {},
  setRotations: () => {},
};

const AirlineContext = createContext<AirlineContextType>(defaultState);

interface ProviderProps {
  children: ReactNode;
}

const AirlineProvider: FC<ProviderProps> = ({ children }) => {
  const [aircrafts, setAircrafts] = useState<Aircraft[]>([]);
  const [flights, setFlights] = useState<Flight[]>([]);
  const [selectedAircraft, setSelectedAircraft] = useState<Aircraft | null>(
    null
  );
  const [rotations, setRotations] = useState<Rotations>({});

  const value = {
    aircrafts,
    setAircrafts,
    flights,
    setFlights,
    selectedAircraft,
    setSelectedAircraft,
    rotations,
    setRotations,
  };

  return (
    <AirlineContext.Provider value={value}>{children}</AirlineContext.Provider>
  );
};

export const useAirline = () => useContext(AirlineContext);

export default AirlineProvider;
