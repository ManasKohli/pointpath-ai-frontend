import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTrip, FlightOption } from '@/contexts/TripContext';
import DashboardLayout from '@/components/DashboardLayout';
import WizardProgress from '@/components/WizardProgress';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { ArrowLeft, Check, Sparkles, Plane, ArrowRight } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

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
    <DashboardLayout currentStep={1}>
      <div className="p-6 lg:p-8 max-w-4xl mx-auto">
        <div className="mb-8">
          <WizardProgress currentStep={1} />
        </div>

        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate('/app')}
          className="mb-6 -ml-2"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Edit trip details
        </Button>

        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <Plane className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Choose Your Flight</h1>
              <p className="text-muted-foreground">
                {tripDetails?.origin} → {tripDetails?.destination}
              </p>
            </div>
          </div>
        </div>

        {isLoading ? (
          <div className="space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <Card key={i} className="border-border">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="space-y-3 flex-1">
                      <Skeleton className="h-5 w-32" />
                      <Skeleton className="h-8 w-40" />
                      <Skeleton className="h-4 w-full max-w-md" />
                    </div>
                    <Skeleton className="h-10 w-24" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {flightOptions.map((flight, index) => (
              <Card
                key={flight.id}
                className={cn(
                  'border-border cursor-pointer transition-all hover:shadow-md',
                  selected?.id === flight.id 
                    ? 'ring-2 ring-primary border-primary shadow-md' 
                    : 'hover:border-primary/50'
                )}
                onClick={() => handleSelect(flight)}
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        {flight.recommended && (
                          <Badge className="bg-primary/10 text-primary border-0 gap-1">
                            <Sparkles className="h-3 w-3" />
                            AI Recommended
                          </Badge>
                        )}
                        {index === 0 && !flight.recommended && (
                          <Badge variant="secondary">Best Value</Badge>
                        )}
                      </div>
                      
                      <h3 className="text-lg font-semibold text-foreground mb-1">
                        {flight.title}
                      </h3>
                      
                      <div className="flex items-baseline gap-2 mb-3">
                        <span className="text-2xl font-bold text-foreground">
                          {flight.points.toLocaleString()}
                        </span>
                        <span className="text-muted-foreground">points</span>
                        {flight.fees && (
                          <span className="text-muted-foreground">
                            + ${flight.fees} fees
                          </span>
                        )}
                      </div>
                      
                      <p className="text-sm text-muted-foreground">{flight.reason}</p>
                    </div>

                    <div className="flex items-center gap-3">
                      {selected?.id === flight.id ? (
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary">
                          <Check className="h-5 w-5 text-primary-foreground" />
                        </div>
                      ) : (
                        <Button variant="outline" size="sm">
                          Select
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        <div className="mt-8 flex items-center justify-between pt-4 border-t border-border">
          <Button variant="ghost" onClick={() => navigate('/app')}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <Button
            onClick={handleContinue}
            disabled={!selected || isSubmitting}
            size="lg"
            className="min-w-[160px]"
          >
            Continue
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Flights;
