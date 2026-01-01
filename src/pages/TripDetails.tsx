import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTrip } from '@/contexts/TripContext';
import DashboardLayout from '@/components/DashboardLayout';
import WizardProgress from '@/components/WizardProgress';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Loader2, MapPin, Calendar, Users, Plane, Building2, CreditCard, Armchair } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

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

  const tripTypes = [
    { value: 'flight', label: 'Flight only', icon: Plane },
    { value: 'hotel', label: 'Hotel only', icon: Building2 },
    { value: 'both', label: 'Flight + Hotel', icon: MapPin },
  ];

  const cabinOptions = [
    { value: 'economy', label: 'Economy' },
    { value: 'premium', label: 'Premium Economy' },
    { value: 'business', label: 'Business' },
  ];

  const pointsPrograms = [
    { id: 'Amex MR (Canada)', label: 'Amex MR', color: 'bg-[#006FCF]' },
    { id: 'Aeroplan', label: 'Aeroplan', color: 'bg-[#00A550]' },
    { id: 'RBC Avion', label: 'RBC Avion', color: 'bg-[#003168]' },
  ];

  return (
    <DashboardLayout currentStep={0}>
      <div className="p-6 lg:p-8 max-w-4xl mx-auto">
        <div className="mb-8">
          <WizardProgress currentStep={0} />
        </div>

        <div className="mb-8">
          <h1 className="text-2xl font-bold text-foreground mb-2">Plan Your Trip</h1>
          <p className="text-muted-foreground">
            Enter your trip details and we'll find the best redemption options for you.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Route Card */}
          <Card className="border-border">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                  <MapPin className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-base">Route</CardTitle>
                  <CardDescription>Where are you flying?</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="origin">From</Label>
                  <Input
                    id="origin"
                    placeholder="YYZ"
                    value={formData.origin}
                    onChange={(e) => setFormData(prev => ({ ...prev, origin: e.target.value }))}
                    className="h-11"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="destination">To</Label>
                  <Input
                    id="destination"
                    placeholder="City or airport code"
                    value={formData.destination}
                    onChange={(e) => setFormData(prev => ({ ...prev, destination: e.target.value }))}
                    className="h-11"
                    required
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Dates Card */}
          <Card className="border-border">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                  <Calendar className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-base">Dates</CardTitle>
                  <CardDescription>When are you traveling?</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="departDate">Departure</Label>
                  <Input
                    id="departDate"
                    type="date"
                    value={formData.departDate}
                    onChange={(e) => setFormData(prev => ({ ...prev, departDate: e.target.value }))}
                    className="h-11"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="returnDate">Return (optional)</Label>
                  <Input
                    id="returnDate"
                    type="date"
                    value={formData.returnDate}
                    onChange={(e) => setFormData(prev => ({ ...prev, returnDate: e.target.value }))}
                    className="h-11"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Travelers Card */}
          <Card className="border-border">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                  <Users className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-base">Travelers</CardTitle>
                  <CardDescription>How many people are traveling?</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => setFormData(prev => ({ ...prev, travelers: Math.max(1, prev.travelers - 1) }))}
                  disabled={formData.travelers <= 1}
                >
                  -
                </Button>
                <span className="text-xl font-semibold w-12 text-center">{formData.travelers}</span>
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => setFormData(prev => ({ ...prev, travelers: Math.min(9, prev.travelers + 1) }))}
                  disabled={formData.travelers >= 9}
                >
                  +
                </Button>
                <span className="text-muted-foreground">
                  {formData.travelers === 1 ? 'traveler' : 'travelers'}
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Trip Type Card */}
          <Card className="border-border">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                  <Plane className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-base">Trip Type</CardTitle>
                  <CardDescription>What are you looking for?</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <RadioGroup
                value={formData.tripType}
                onValueChange={(value) => setFormData(prev => ({ ...prev, tripType: value as 'flight' | 'hotel' | 'both' }))}
                className="grid gap-3 sm:grid-cols-3"
              >
                {tripTypes.map((type) => {
                  const Icon = type.icon;
                  return (
                    <Label
                      key={type.value}
                      htmlFor={type.value}
                      className={cn(
                        'flex items-center gap-3 p-4 rounded-lg border cursor-pointer transition-all',
                        formData.tripType === type.value
                          ? 'border-primary bg-primary/5 ring-1 ring-primary'
                          : 'border-border hover:border-primary/50'
                      )}
                    >
                      <RadioGroupItem value={type.value} id={type.value} className="sr-only" />
                      <Icon className={cn(
                        'h-5 w-5',
                        formData.tripType === type.value ? 'text-primary' : 'text-muted-foreground'
                      )} />
                      <span className="font-medium">{type.label}</span>
                    </Label>
                  );
                })}
              </RadioGroup>
            </CardContent>
          </Card>

          {/* Points Programs Card */}
          <Card className="border-border">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                  <CreditCard className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-base">Points Programs</CardTitle>
                  <CardDescription>Which programs do you have points in?</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3 sm:grid-cols-3">
                {pointsPrograms.map((program) => (
                  <Label
                    key={program.id}
                    htmlFor={program.id}
                    className={cn(
                      'flex items-center gap-3 p-4 rounded-lg border cursor-pointer transition-all',
                      formData.pointsPrograms.includes(program.id)
                        ? 'border-primary bg-primary/5 ring-1 ring-primary'
                        : 'border-border hover:border-primary/50'
                    )}
                  >
                    <Checkbox
                      id={program.id}
                      checked={formData.pointsPrograms.includes(program.id)}
                      onCheckedChange={(checked) => handlePointsChange(program.id, checked as boolean)}
                    />
                    <div className={cn('h-3 w-3 rounded-full', program.color)} />
                    <span className="font-medium">{program.label}</span>
                  </Label>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Cabin Preference Card */}
          {formData.tripType !== 'hotel' && (
            <Card className="border-border">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                    <Armchair className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-base">Cabin Preference</CardTitle>
                    <CardDescription>Optional - Select your preferred cabin class</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <RadioGroup
                  value={formData.cabinPreference}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, cabinPreference: value as '' | 'economy' | 'premium' | 'business' }))}
                  className="grid gap-3 sm:grid-cols-3"
                >
                  {cabinOptions.map((cabin) => (
                    <Label
                      key={cabin.value}
                      htmlFor={`cabin-${cabin.value}`}
                      className={cn(
                        'flex items-center justify-center gap-2 p-4 rounded-lg border cursor-pointer transition-all',
                        formData.cabinPreference === cabin.value
                          ? 'border-primary bg-primary/5 ring-1 ring-primary'
                          : 'border-border hover:border-primary/50'
                      )}
                    >
                      <RadioGroupItem value={cabin.value} id={`cabin-${cabin.value}`} className="sr-only" />
                      <span className="font-medium">{cabin.label}</span>
                    </Label>
                  ))}
                </RadioGroup>
              </CardContent>
            </Card>
          )}

          {/* Submit Button */}
          <div className="flex justify-end pt-4">
            <Button type="submit" size="lg" disabled={isLoading} className="min-w-[200px]">
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Find Options
            </Button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
};

export default TripDetails;
