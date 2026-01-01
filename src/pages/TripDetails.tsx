import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTrip, TripDetails as TripDetailsType } from '@/contexts/TripContext';
import AppHeader from '@/components/AppHeader';
import WizardStepper from '@/components/WizardStepper';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const WIZARD_STEPS = [
  { label: 'Trip Details', path: '/app' },
  { label: 'Flights', path: '/app/trip/:tripId/flights' },
  { label: 'Hotels', path: '/app/trip/:tripId/hotels' },
  { label: 'Roadmap', path: '/app/trip/:tripId/roadmap' },
];

const TripDetails = () => {
  const navigate = useNavigate();
  const { setTripId, setTripDetails } = useTrip();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    origin: 'YYZ',
    destination: '',
    departDate: '',
    returnDate: '',
    travelers: 1,
    tripType: 'both' as 'flight' | 'hotel' | 'both',
    pointsPrograms: [] as string[],
    cabinPreference: '' as '' | 'economy' | 'premium' | 'business',
  });

  const handlePointsChange = (program: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      pointsPrograms: checked
        ? [...prev.pointsPrograms, program]
        : prev.pointsPrograms.filter(p => p !== program)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.destination) {
      toast({ title: 'Error', description: 'Please enter a destination', variant: 'destructive' });
      return;
    }
    if (!formData.departDate) {
      toast({ title: 'Error', description: 'Please select a departure date', variant: 'destructive' });
      return;
    }
    if (formData.pointsPrograms.length === 0) {
      toast({ title: 'Error', description: 'Please select at least one points program', variant: 'destructive' });
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call - POST /trips
      await new Promise(resolve => setTimeout(resolve, 1000));
      const mockTripId = `trip_${Date.now()}`;
      
      setTripId(mockTripId);
      setTripDetails({
        origin: formData.origin,
        destination: formData.destination,
        departDate: formData.departDate,
        returnDate: formData.returnDate || undefined,
        travelers: formData.travelers,
        tripType: formData.tripType,
        pointsPrograms: formData.pointsPrograms,
        cabinPreference: formData.cabinPreference || undefined,
      });

      // Route based on trip type
      if (formData.tripType === 'hotel') {
        navigate(`/app/trip/${mockTripId}/hotels`);
      } else {
        navigate(`/app/trip/${mockTripId}/flights`);
      }
    } catch (error) {
      toast({ title: 'Error', description: 'Could not create trip', variant: 'destructive' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <AppHeader />
      
      <main className="container mx-auto px-4 py-8">
        <WizardStepper steps={WIZARD_STEPS} currentStep={0} />

        <Card className="mx-auto max-w-2xl border-border">
          <CardHeader>
            <CardTitle>Trip Details</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Origin & Destination */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="origin">Origin</Label>
                  <Input
                    id="origin"
                    placeholder="YYZ"
                    value={formData.origin}
                    onChange={(e) => setFormData(prev => ({ ...prev, origin: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="destination">Destination</Label>
                  <Input
                    id="destination"
                    placeholder="City or airport code"
                    value={formData.destination}
                    onChange={(e) => setFormData(prev => ({ ...prev, destination: e.target.value }))}
                    required
                  />
                </div>
              </div>

              {/* Dates */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="departDate">Departure date</Label>
                  <Input
                    id="departDate"
                    type="date"
                    value={formData.departDate}
                    onChange={(e) => setFormData(prev => ({ ...prev, departDate: e.target.value }))}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="returnDate">Return date (optional)</Label>
                  <Input
                    id="returnDate"
                    type="date"
                    value={formData.returnDate}
                    onChange={(e) => setFormData(prev => ({ ...prev, returnDate: e.target.value }))}
                  />
                </div>
              </div>

              {/* Travelers */}
              <div className="space-y-2">
                <Label htmlFor="travelers">Travelers</Label>
                <Input
                  id="travelers"
                  type="number"
                  min={1}
                  max={9}
                  value={formData.travelers}
                  onChange={(e) => setFormData(prev => ({ ...prev, travelers: parseInt(e.target.value) || 1 }))}
                />
              </div>

              {/* Trip Type */}
              <div className="space-y-3">
                <Label>Trip type</Label>
                <RadioGroup
                  value={formData.tripType}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, tripType: value as 'flight' | 'hotel' | 'both' }))}
                  className="flex flex-wrap gap-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="flight" id="flight-only" />
                    <Label htmlFor="flight-only" className="font-normal cursor-pointer">Flight only</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="hotel" id="hotel-only" />
                    <Label htmlFor="hotel-only" className="font-normal cursor-pointer">Hotel only</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="both" id="both" />
                    <Label htmlFor="both" className="font-normal cursor-pointer">Flight + Hotel</Label>
                  </div>
                </RadioGroup>
              </div>

              {/* Points Programs */}
              <div className="space-y-3">
                <Label>Points you have</Label>
                <div className="flex flex-wrap gap-4">
                  {['Amex MR (Canada)', 'Aeroplan', 'RBC Avion'].map((program) => (
                    <div key={program} className="flex items-center space-x-2">
                      <Checkbox
                        id={program}
                        checked={formData.pointsPrograms.includes(program)}
                        onCheckedChange={(checked) => handlePointsChange(program, checked as boolean)}
                      />
                      <Label htmlFor={program} className="font-normal cursor-pointer">{program}</Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Cabin Preference */}
              {formData.tripType !== 'hotel' && (
                <div className="space-y-3">
                  <Label>Cabin preference (optional)</Label>
                  <RadioGroup
                    value={formData.cabinPreference}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, cabinPreference: value as '' | 'economy' | 'premium' | 'business' }))}
                    className="flex flex-wrap gap-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="economy" id="economy" />
                      <Label htmlFor="economy" className="font-normal cursor-pointer">Economy</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="premium" id="premium" />
                      <Label htmlFor="premium" className="font-normal cursor-pointer">Premium Economy</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="business" id="business" />
                      <Label htmlFor="business" className="font-normal cursor-pointer">Business</Label>
                    </div>
                  </RadioGroup>
                </div>
              )}

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Find options
              </Button>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default TripDetails;
