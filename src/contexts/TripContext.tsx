import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface TripDetails {
  origin: string;
  destination: string;
  departDate: string;
  returnDate?: string;
  travelers: number;
  tripType: 'flight' | 'hotel' | 'both';
  pointsPrograms: string[];
  cabinPreference?: 'economy' | 'premium' | 'business';
}

export interface FlightOption {
  id: string;
  title: string;
  points: number;
  fees?: number;
  reason: string;
  recommended?: boolean;
}

export interface HotelOption {
  id: string;
  title: string;
  pointsPerNight: number;
  totalPoints: number;
  nights: number;
  reason: string;
  recommended?: boolean;
}

export interface RoadmapStep {
  step: number;
  instruction: string;
  details?: string;
}

export interface Roadmap {
  summary: {
    route: string;
    dates: string;
    travelers: number;
  };
  selectedFlight?: FlightOption;
  selectedHotel?: HotelOption;
  totalPoints: number;
  totalFees: number;
  steps: RoadmapStep[];
  backupOption?: string;
}

interface TripContextType {
  tripId: string | null;
  tripDetails: TripDetails | null;
  selectedFlight: FlightOption | null;
  selectedHotel: HotelOption | null;
  setTripId: (id: string) => void;
  setTripDetails: (details: TripDetails) => void;
  setSelectedFlight: (flight: FlightOption) => void;
  setSelectedHotel: (hotel: HotelOption) => void;
  resetTrip: () => void;
}

const TripContext = createContext<TripContextType | undefined>(undefined);

export const TripProvider = ({ children }: { children: ReactNode }) => {
  const [tripId, setTripIdState] = useState<string | null>(() => 
    localStorage.getItem('pointpath_trip_id')
  );
  const [tripDetails, setTripDetailsState] = useState<TripDetails | null>(null);
  const [selectedFlight, setSelectedFlightState] = useState<FlightOption | null>(null);
  const [selectedHotel, setSelectedHotelState] = useState<HotelOption | null>(null);

  const setTripId = (id: string) => {
    localStorage.setItem('pointpath_trip_id', id);
    setTripIdState(id);
  };

  const setTripDetails = (details: TripDetails) => {
    setTripDetailsState(details);
  };

  const setSelectedFlight = (flight: FlightOption) => {
    setSelectedFlightState(flight);
  };

  const setSelectedHotel = (hotel: HotelOption) => {
    setSelectedHotelState(hotel);
  };

  const resetTrip = () => {
    localStorage.removeItem('pointpath_trip_id');
    setTripIdState(null);
    setTripDetailsState(null);
    setSelectedFlightState(null);
    setSelectedHotelState(null);
  };

  return (
    <TripContext.Provider value={{
      tripId,
      tripDetails,
      selectedFlight,
      selectedHotel,
      setTripId,
      setTripDetails,
      setSelectedFlight,
      setSelectedHotel,
      resetTrip
    }}>
      {children}
    </TripContext.Provider>
  );
};

export const useTrip = () => {
  const context = useContext(TripContext);
  if (context === undefined) {
    throw new Error('useTrip must be used within a TripProvider');
  }
  return context;
};
