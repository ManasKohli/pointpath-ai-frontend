import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTrip, HotelOption } from '@/contexts/TripContext';
import DashboardLayout from '@/components/DashboardLayout';
import WizardProgress from '@/components/WizardProgress';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { ArrowLeft, Check, Sparkles, Building2, ArrowRight, Moon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

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
    <DashboardLayout currentStep={2}>
      <div className="p-6 lg:p-8 max-w-4xl mx-auto">
        <div className="mb-8">
          <WizardProgress currentStep={2} />
        </div>

        <Button
          variant="ghost"
          size="sm"
          onClick={handleBack}
          className="mb-6 -ml-2"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          {tripDetails?.tripType === 'hotel' ? 'Edit trip details' : 'Back to flights'}
        </Button>

        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <Building2 className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Choose Your Hotel</h1>
              <p className="text-muted-foreground">
                {tripDetails?.destination} · 3 nights
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
            {hotelOptions.map((hotel) => (
              <Card
                key={hotel.id}
                className={cn(
                  'border-border cursor-pointer transition-all hover:shadow-md',
                  selected?.id === hotel.id 
                    ? 'ring-2 ring-primary border-primary shadow-md' 
                    : 'hover:border-primary/50'
                )}
                onClick={() => handleSelect(hotel)}
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        {hotel.recommended && (
                          <Badge className="bg-primary/10 text-primary border-0 gap-1">
                            <Sparkles className="h-3 w-3" />
                            AI Recommended
                          </Badge>
                        )}
                      </div>
                      
                      <h3 className="text-lg font-semibold text-foreground mb-1">
                        {hotel.title}
                      </h3>
                      
                      <div className="flex items-baseline gap-2 mb-3">
                        {hotel.totalPoints > 0 ? (
                          <>
                            <span className="text-2xl font-bold text-foreground">
                              {hotel.totalPoints.toLocaleString()}
                            </span>
                            <span className="text-muted-foreground">points total</span>
                            <div className="flex items-center gap-1 text-sm text-muted-foreground">
                              <Moon className="h-3 w-3" />
                              {hotel.pointsPerNight.toLocaleString()}/night × {hotel.nights}
                            </div>
                          </>
                        ) : (
                          <span className="text-2xl font-bold text-foreground">Cash booking</span>
                        )}
                      </div>
                      
                      <p className="text-sm text-muted-foreground">{hotel.reason}</p>
                    </div>

                    <div className="flex items-center gap-3">
                      {selected?.id === hotel.id ? (
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
          <Button variant="ghost" onClick={handleBack}>
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

export default Hotels;
