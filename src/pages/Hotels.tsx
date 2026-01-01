import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTrip, HotelOption } from '@/contexts/TripContext';
import AppHeader from '@/components/AppHeader';
import WizardStepper from '@/components/WizardStepper';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
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

// Mock hotel options
const MOCK_HOTELS: HotelOption[] = [
  {
    id: '1',
    title: 'Amex → Marriott Bonvoy',
    pointsPerNight: 25000,
    totalPoints: 75000,
    nights: 3,
    reason: 'Best value transfer ratio for category 5+ properties',
    recommended: true,
  },
  {
    id: '2',
    title: 'Amex → Hilton Honors',
    pointsPerNight: 35000,
    totalPoints: 105000,
    nights: 3,
    reason: 'Higher points but includes breakfast at most properties',
  },
  {
    id: '3',
    title: 'Aeroplan Hotel Rewards',
    pointsPerNight: 18000,
    totalPoints: 54000,
    nights: 3,
    reason: 'Use existing Aeroplan without transfer',
  },
  {
    id: '4',
    title: 'Pay Cash',
    pointsPerNight: 0,
    totalPoints: 0,
    nights: 3,
    reason: 'Sometimes cash is better value, especially with promotions',
  },
];

const Hotels = () => {
  const navigate = useNavigate();
  const { tripId } = useParams<{ tripId: string }>();
  const { tripDetails, selectedHotel, setSelectedHotel } = useTrip();
  const { toast } = useToast();
  
  const [isLoading, setIsLoading] = useState(true);
  const [hotelOptions, setHotelOptions] = useState<HotelOption[]>([]);
  const [selected, setSelected] = useState<HotelOption | null>(selectedHotel);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Simulate API call - GET /trips/{trip_id}/hotel-options
    const fetchHotels = async () => {
      await new Promise(resolve => setTimeout(resolve, 1200));
      setHotelOptions(MOCK_HOTELS);
      setIsLoading(false);
    };
    fetchHotels();
  }, [tripId]);

  const handleSelect = async (hotel: HotelOption) => {
    setSelected(hotel);
    setIsSubmitting(true);
    
    try {
      // Simulate API call - POST /trips/{trip_id}/select-hotel
      await new Promise(resolve => setTimeout(resolve, 500));
      setSelectedHotel(hotel);
      toast({ title: 'Hotel selected', description: hotel.title });
    } catch (error) {
      toast({ title: 'Error', description: 'Could not select hotel', variant: 'destructive' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleContinue = () => {
    if (!selected) return;
    navigate(`/app/trip/${tripId}/roadmap`);
  };

  const handleBack = () => {
    if (tripDetails?.tripType === 'hotel') {
      navigate('/app');
    } else {
      navigate(`/app/trip/${tripId}/flights`);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <AppHeader />
      
      <main className="container mx-auto px-4 py-8">
        <WizardStepper steps={WIZARD_STEPS} currentStep={2} />

        <div className="mx-auto max-w-3xl">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleBack}
            className="mb-6"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            {tripDetails?.tripType === 'hotel' ? 'Edit trip details' : 'Back to flights'}
          </Button>

          <h1 className="mb-2 text-2xl font-bold text-foreground">Choose your hotel</h1>
          <p className="mb-8 text-muted-foreground">
            Select the best hotel redemption for your stay
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
              {hotelOptions.map((hotel) => (
                <Card
                  key={hotel.id}
                  className={`border-border cursor-pointer transition-all hover:border-primary/50 ${
                    selected?.id === hotel.id ? 'ring-2 ring-primary border-primary' : ''
                  }`}
                  onClick={() => handleSelect(hotel)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        {hotel.recommended && (
                          <Badge className="mb-2 bg-primary/10 text-primary border-0">
                            <Sparkles className="mr-1 h-3 w-3" />
                            AI Recommended
                          </Badge>
                        )}
                        <h3 className="text-lg font-semibold text-foreground">{hotel.title}</h3>
                      </div>
                      {selected?.id === hotel.id && (
                        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary">
                          <Check className="h-4 w-4 text-primary-foreground" />
                        </div>
                      )}
                    </div>
                    <div className="mb-3">
                      {hotel.totalPoints > 0 ? (
                        <>
                          <span className="text-2xl font-bold text-foreground">
                            {hotel.totalPoints.toLocaleString()}
                          </span>
                          <span className="text-muted-foreground"> points total</span>
                          <span className="text-sm text-muted-foreground ml-2">
                            ({hotel.pointsPerNight.toLocaleString()}/night × {hotel.nights} nights)
                          </span>
                        </>
                      ) : (
                        <span className="text-2xl font-bold text-foreground">Cash booking</span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">{hotel.reason}</p>
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
              Continue to roadmap
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Hotels;
