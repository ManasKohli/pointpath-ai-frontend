import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTrip, RoadmapStep } from '@/contexts/TripContext';
import AppHeader from '@/components/AppHeader';
import WizardStepper from '@/components/WizardStepper';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { ArrowLeft, Copy, Plus, Pencil, Plane, Building2, Check, Info } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const WIZARD_STEPS = [
  { label: 'Trip Details', path: '/app' },
  { label: 'Flights', path: '/app/trip/:tripId/flights' },
  { label: 'Hotels', path: '/app/trip/:tripId/hotels' },
  { label: 'Roadmap', path: '/app/trip/:tripId/roadmap' },
];

const Roadmap = () => {
  const navigate = useNavigate();
  const { tripId } = useParams<{ tripId: string }>();
  const { tripDetails, selectedFlight, selectedHotel, resetTrip } = useTrip();
  const { toast } = useToast();
  
  const [isLoading, setIsLoading] = useState(true);
  const [roadmapSteps, setRoadmapSteps] = useState<RoadmapStep[]>([]);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Simulate API call - GET /trips/{trip_id}/roadmap
    const fetchRoadmap = async () => {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const steps: RoadmapStep[] = [];
      let stepNumber = 1;

      if (selectedFlight) {
        if (selectedFlight.title.includes('Amex')) {
          steps.push({
            step: stepNumber++,
            instruction: 'Log in to your American Express Membership Rewards account',
            details: 'Go to membershiprewards.ca and navigate to "Use Points"'
          });
          steps.push({
            step: stepNumber++,
            instruction: `Transfer ${selectedFlight.points.toLocaleString()} MR points to ${selectedFlight.title.split('→')[1]?.trim() || 'your airline partner'}`,
            details: 'Allow 24-48 hours for transfer to complete before booking'
          });
        }
        if (selectedFlight.title.includes('Aeroplan')) {
          steps.push({
            step: stepNumber++,
            instruction: 'Log in to Aeroplan.com',
            details: 'Use your Aeroplan member number'
          });
        }
        if (selectedFlight.title.includes('Avion')) {
          steps.push({
            step: stepNumber++,
            instruction: 'Log in to RBC Avion Rewards',
            details: 'Navigate to "Transfer Points"'
          });
          steps.push({
            step: stepNumber++,
            instruction: `Transfer Avion points to ${selectedFlight.title.split('→')[1]?.trim() || 'your airline partner'}`,
            details: 'Transfers to Avios typically process within 24 hours'
          });
        }
        steps.push({
          step: stepNumber++,
          instruction: `Search and book your flight from ${tripDetails?.origin || 'origin'} to ${tripDetails?.destination || 'destination'}`,
          details: `Look for ${tripDetails?.departDate ? new Date(tripDetails.departDate).toLocaleDateString() : 'your departure date'}. Select the lowest cost option in ${tripDetails?.cabinPreference || 'your preferred cabin'}.`
        });
      }

      if (selectedHotel && selectedHotel.totalPoints > 0) {
        if (selectedHotel.title.includes('Marriott')) {
          steps.push({
            step: stepNumber++,
            instruction: 'Log in to your Marriott Bonvoy account',
            details: 'marriott.com - Use Points to book'
          });
          steps.push({
            step: stepNumber++,
            instruction: `Search for hotels in ${tripDetails?.destination || 'your destination'}`,
            details: `${selectedHotel.nights} nights starting ${tripDetails?.departDate ? new Date(tripDetails.departDate).toLocaleDateString() : 'your check-in date'}`
          });
        }
        if (selectedHotel.title.includes('Hilton')) {
          steps.push({
            step: stepNumber++,
            instruction: 'Log in to Hilton Honors',
            details: 'hilton.com - Use your points balance'
          });
          steps.push({
            step: stepNumber++,
            instruction: `Book ${selectedHotel.nights} nights using ${selectedHotel.totalPoints.toLocaleString()} points`,
            details: 'Look for properties with "Points + Money" if you want to save points'
          });
        }
        if (selectedHotel.title.includes('Aeroplan')) {
          steps.push({
            step: stepNumber++,
            instruction: 'Use Aeroplan Hotel Rewards via aeroplan.com',
            details: 'Search hotels and book using your Aeroplan points'
          });
        }
      }

      steps.push({
        step: stepNumber++,
        instruction: 'Confirm all bookings and save confirmation numbers',
        details: 'Screenshot or save all confirmation emails in one place'
      });

      setRoadmapSteps(steps);
      setIsLoading(false);
    };
    fetchRoadmap();
  }, [tripId, tripDetails, selectedFlight, selectedHotel]);

  const handleCopyRoadmap = () => {
    const text = roadmapSteps
      .map(step => `Step ${step.step}: ${step.instruction}${step.details ? `\n   ${step.details}` : ''}`)
      .join('\n\n');
    
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast({ title: 'Copied!', description: 'Roadmap copied to clipboard' });
    setTimeout(() => setCopied(false), 2000);
  };

  const handleNewTrip = () => {
    resetTrip();
    navigate('/app');
  };

  const totalPoints = (selectedFlight?.points || 0) + (selectedHotel?.totalPoints || 0);
  const totalFees = selectedFlight?.fees || 0;

  return (
    <div className="min-h-screen bg-background">
      <AppHeader />
      
      <main className="container mx-auto px-4 py-8">
        <WizardStepper steps={WIZARD_STEPS} currentStep={3} />

        <div className="mx-auto max-w-3xl">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate(-1)}
            className="mb-6"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>

          <h1 className="mb-2 text-2xl font-bold text-foreground">Your Booking Roadmap</h1>
          <p className="mb-8 text-muted-foreground">
            Follow these steps to complete your booking
          </p>

          {isLoading ? (
            <div className="space-y-4">
              <Skeleton className="h-32 w-full" />
              <Skeleton className="h-48 w-full" />
              <Skeleton className="h-64 w-full" />
            </div>
          ) : (
            <>
              {/* Trip Summary */}
              <Card className="mb-6 border-border">
                <CardHeader>
                  <CardTitle className="text-lg">Trip Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex items-center gap-2 text-foreground">
                    <Plane className="h-4 w-4 text-muted-foreground" />
                    <span>{tripDetails?.origin} → {tripDetails?.destination}</span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {tripDetails?.departDate && new Date(tripDetails.departDate).toLocaleDateString('en-US', { 
                      weekday: 'short', 
                      month: 'short', 
                      day: 'numeric' 
                    })}
                    {tripDetails?.returnDate && ` - ${new Date(tripDetails.returnDate).toLocaleDateString('en-US', { 
                      weekday: 'short', 
                      month: 'short', 
                      day: 'numeric' 
                    })}`}
                    {' · '}{tripDetails?.travelers} traveler{tripDetails?.travelers !== 1 ? 's' : ''}
                  </div>
                </CardContent>
              </Card>

              {/* Selections */}
              <Card className="mb-6 border-border">
                <CardHeader>
                  <CardTitle className="text-lg">Your Selections</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {selectedFlight && (
                    <div className="flex items-start gap-3 p-4 rounded-lg bg-muted/50">
                      <Plane className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <div className="font-medium text-foreground">{selectedFlight.title}</div>
                        <div className="text-sm text-muted-foreground">
                          {selectedFlight.points.toLocaleString()} points
                          {selectedFlight.fees ? ` + $${selectedFlight.fees} fees` : ''}
                        </div>
                      </div>
                    </div>
                  )}
                  {selectedHotel && (
                    <div className="flex items-start gap-3 p-4 rounded-lg bg-muted/50">
                      <Building2 className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <div className="font-medium text-foreground">{selectedHotel.title}</div>
                        <div className="text-sm text-muted-foreground">
                          {selectedHotel.totalPoints > 0 
                            ? `${selectedHotel.totalPoints.toLocaleString()} points (${selectedHotel.nights} nights)`
                            : 'Cash booking'
                          }
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Total Cost */}
              <Card className="mb-6 border-border bg-primary/5">
                <CardContent className="p-6">
                  <div className="text-center">
                    <div className="text-sm text-muted-foreground mb-1">Total Cost</div>
                    <div className="text-3xl font-bold text-foreground">
                      {totalPoints.toLocaleString()} points
                    </div>
                    {totalFees > 0 && (
                      <div className="text-muted-foreground">+ ${totalFees} in fees</div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Steps */}
              <Card className="mb-6 border-border">
                <CardHeader>
                  <CardTitle className="text-lg">Step-by-Step Instructions</CardTitle>
                </CardHeader>
                <CardContent>
                  <ol className="space-y-4">
                    {roadmapSteps.map((step) => (
                      <li key={step.step} className="flex gap-4">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-medium text-primary-foreground">
                          {step.step}
                        </div>
                        <div className="pt-1">
                          <div className="font-medium text-foreground">{step.instruction}</div>
                          {step.details && (
                            <div className="mt-1 text-sm text-muted-foreground">{step.details}</div>
                          )}
                        </div>
                      </li>
                    ))}
                  </ol>
                </CardContent>
              </Card>

              {/* Backup Option */}
              <Card className="mb-6 border-border border-dashed">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <Info className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div>
                      <div className="font-medium text-foreground">Backup Option</div>
                      <div className="text-sm text-muted-foreground">
                        If your preferred flight is unavailable, try booking through Aeroplan using flexible dates. 
                        You can also check partner availability on United.com before transferring points.
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Button onClick={handleCopyRoadmap} variant="outline" className="flex-1">
                  {copied ? <Check className="mr-2 h-4 w-4" /> : <Copy className="mr-2 h-4 w-4" />}
                  {copied ? 'Copied!' : 'Copy roadmap'}
                </Button>
                <Button onClick={handleNewTrip} className="flex-1">
                  <Plus className="mr-2 h-4 w-4" />
                  Start new trip
                </Button>
                <Button onClick={() => navigate('/app')} variant="outline" className="flex-1">
                  <Pencil className="mr-2 h-4 w-4" />
                  Edit trip
                </Button>
              </div>

              {/* Footer */}
              <div className="mt-8 text-center text-xs text-muted-foreground">
                Generated by PointPath AI · Point estimates are not guaranteed
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default Roadmap;
