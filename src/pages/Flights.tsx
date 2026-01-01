import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTrip, FlightOption } from '@/contexts/TripContext';
import AppHeader from '@/components/AppHeader';
import WizardStepper from '@/components/WizardStepper';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { ArrowLeft, Check, Sparkles } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const WIZARD_STEPS = [
  { label: 'Trip Details', path: '/app' },
  { label: 'Flights', path: '/app/trip/:tripId/flights' },
  { label: 'Hotels', path: '/app/trip/:tripId/hotels' },
  { label: 'Roadmap', path: '/app/trip/:tripId/roadmap' },
];

// Mock flight options
const MOCK_FLIGHTS: FlightOption[] = [
  {
    id: '1',
    title: 'Aeroplan Direct',
    points: 45000,
    fees: 230,
    reason: 'Best value for Star Alliance routing with no transfer required',
    recommended: true,
  },
  {
    id: '2',
    title: 'Amex → Flying Blue',
    points: 52000,
    fees: 180,
    reason: 'Lower fees via Air France, good if you have excess MR points',
  },
  {
    id: '3',
    title: 'Avion → Avios',
    points: 48000,
    fees: 310,
    reason: 'Unlock British Airways routing via Avios transfer',
  },
  {
    id: '4',
    title: 'Amex → ANA Mileage Club',
    points: 55000,
    fees: 150,
    reason: 'Premium carrier with low fuel surcharges',
  },
];

const Flights = () => {
  const navigate = useNavigate();
  const { tripId } = useParams<{ tripId: string }>();
  const { tripDetails, selectedFlight, setSelectedFlight } = useTrip();
  const { toast } = useToast();
  
  const [isLoading, setIsLoading] = useState(true);
  const [flightOptions, setFlightOptions] = useState<FlightOption[]>([]);
  const [selected, setSelected] = useState<FlightOption | null>(selectedFlight);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Simulate API call - GET /trips/{trip_id}/flight-options
    const fetchFlights = async () => {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setFlightOptions(MOCK_FLIGHTS);
      setIsLoading(false);
    };
    fetchFlights();
  }, [tripId]);

  const handleSelect = async (flight: FlightOption) => {
    setSelected(flight);
    setIsSubmitting(true);
    
    try {
      // Simulate API call - POST /trips/{trip_id}/select-flight
      await new Promise(resolve => setTimeout(resolve, 500));
      setSelectedFlight(flight);
      toast({ title: 'Flight selected', description: flight.title });
    } catch (error) {
      toast({ title: 'Error', description: 'Could not select flight', variant: 'destructive' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleContinue = () => {
    if (!selected) return;
    
    if (tripDetails?.tripType === 'flight') {
      navigate(`/app/trip/${tripId}/roadmap`);
    } else {
      navigate(`/app/trip/${tripId}/hotels`);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <AppHeader />
      
      <main className="container mx-auto px-4 py-8">
        <WizardStepper steps={WIZARD_STEPS} currentStep={1} />

        <div className="mx-auto max-w-3xl">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/app')}
            className="mb-6"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Edit trip details
          </Button>

          <h1 className="mb-2 text-2xl font-bold text-foreground">Choose your flight</h1>
          <p className="mb-8 text-muted-foreground">
            Select the best redemption path for your trip
          </p>

          {isLoading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="border-border">
                  <CardContent className="p-6">
                    <Skeleton className="h-6 w-48 mb-4" />
                    <Skeleton className="h-8 w-32 mb-2" />
                    <Skeleton className="h-4 w-full" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {flightOptions.map((flight) => (
                <Card
                  key={flight.id}
                  className={`border-border cursor-pointer transition-all hover:border-primary/50 ${
                    selected?.id === flight.id ? 'ring-2 ring-primary border-primary' : ''
                  }`}
                  onClick={() => handleSelect(flight)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        {flight.recommended && (
                          <Badge className="mb-2 bg-primary/10 text-primary border-0">
                            <Sparkles className="mr-1 h-3 w-3" />
                            AI Recommended
                          </Badge>
                        )}
                        <h3 className="text-lg font-semibold text-foreground">{flight.title}</h3>
                      </div>
                      {selected?.id === flight.id && (
                        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary">
                          <Check className="h-4 w-4 text-primary-foreground" />
                        </div>
                      )}
                    </div>
                    <div className="mb-3">
                      <span className="text-2xl font-bold text-foreground">
                        {flight.points.toLocaleString()}
                      </span>
                      <span className="text-muted-foreground"> points</span>
                      {flight.fees && (
                        <span className="text-muted-foreground ml-2">
                          + ${flight.fees} fees
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">{flight.reason}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          <div className="mt-8 flex justify-end">
            <Button
              onClick={handleContinue}
              disabled={!selected || isSubmitting}
              size="lg"
            >
              Continue
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Flights;
