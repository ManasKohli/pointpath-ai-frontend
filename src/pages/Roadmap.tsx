import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTrip, RoadmapStep } from '@/contexts/TripContext';
import DashboardLayout from '@/components/DashboardLayout';
import WizardProgress from '@/components/WizardProgress';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from '@/components/ui/separator';
import { 
  ArrowLeft, Copy, Plus, Pencil, Plane, Building2, Check, Info, 
  MapPin, Calendar, Users, CheckCircle2, Circle, ExternalLink 
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

const Roadmap = () => {
  const navigate = useNavigate();
  const { tripId } = useParams<{ tripId: string }>();
  const { tripDetails, selectedFlight, selectedHotel, resetTrip } = useTrip();
  const { toast } = useToast();
  
  const [isLoading, setIsLoading] = useState(true);
  const [roadmapSteps, setRoadmapSteps] = useState<RoadmapStep[]>([]);
  const [copied, setCopied] = useState(false);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  useEffect(() => {
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

  const toggleStepComplete = (stepNumber: number) => {
    setCompletedSteps(prev => 
      prev.includes(stepNumber) 
        ? prev.filter(s => s !== stepNumber)
        : [...prev, stepNumber]
    );
  };

  const totalPoints = (selectedFlight?.points || 0) + (selectedHotel?.totalPoints || 0);
  const totalFees = selectedFlight?.fees || 0;
  const completionPercentage = Math.round((completedSteps.length / roadmapSteps.length) * 100) || 0;

  return (
    <DashboardLayout currentStep={3}>
      <div className="p-6 lg:p-8 max-w-4xl mx-auto">
        <div className="mb-8">
          <WizardProgress currentStep={3} />
        </div>

        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate(-1)}
          className="mb-6 -ml-2"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>

        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
              <Check className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Your Booking Roadmap</h1>
              <p className="text-muted-foreground">
                Follow these steps to complete your booking
              </p>
            </div>
          </div>
        </div>

        {isLoading ? (
          <div className="space-y-4">
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-48 w-full" />
            <Skeleton className="h-64 w-full" />
          </div>
        ) : (
          <div className="grid gap-6 lg:grid-cols-3">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Trip Summary */}
              <Card className="border-border overflow-hidden">
                <div className="bg-gradient-to-r from-primary/10 to-primary/5 p-4 border-b border-border">
                  <h2 className="font-semibold text-foreground">Trip Summary</h2>
                </div>
                <CardContent className="p-4">
                  <div className="grid gap-4 sm:grid-cols-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                        <MapPin className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Route</div>
                        <div className="font-medium text-foreground">
                          {tripDetails?.origin} → {tripDetails?.destination}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                        <Calendar className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Dates</div>
                        <div className="font-medium text-foreground">
                          {tripDetails?.departDate && new Date(tripDetails.departDate).toLocaleDateString('en-US', { 
                            month: 'short', 
                            day: 'numeric' 
                          })}
                          {tripDetails?.returnDate && ` - ${new Date(tripDetails.returnDate).toLocaleDateString('en-US', { 
                            month: 'short', 
                            day: 'numeric' 
                          })}`}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                        <Users className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Travelers</div>
                        <div className="font-medium text-foreground">
                          {tripDetails?.travelers} {tripDetails?.travelers === 1 ? 'person' : 'people'}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Selections */}
              <Card className="border-border">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">Your Selections</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {selectedFlight && (
                    <div className="flex items-center gap-4 p-4 rounded-lg bg-muted/50 border border-border">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                        <Plane className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-foreground">{selectedFlight.title}</div>
                        <div className="text-sm text-muted-foreground">
                          {selectedFlight.points.toLocaleString()} points
                          {selectedFlight.fees ? ` + $${selectedFlight.fees} fees` : ''}
                        </div>
                      </div>
                    </div>
                  )}
                  {selectedHotel && (
                    <div className="flex items-center gap-4 p-4 rounded-lg bg-muted/50 border border-border">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                        <Building2 className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
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

              {/* Steps */}
              <Card className="border-border">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base">Step-by-Step Instructions</CardTitle>
                    <span className="text-sm text-muted-foreground">
                      {completedSteps.length}/{roadmapSteps.length} complete
                    </span>
                  </div>
                  <div className="h-2 w-full bg-muted rounded-full overflow-hidden mt-2">
                    <div 
                      className="h-full bg-primary transition-all duration-500 rounded-full"
                      style={{ width: `${completionPercentage}%` }}
                    />
                  </div>
                </CardHeader>
                <CardContent>
                  <ol className="space-y-4">
                    {roadmapSteps.map((step) => {
                      const isComplete = completedSteps.includes(step.step);
                      return (
                        <li 
                          key={step.step} 
                          className={cn(
                            'flex gap-4 p-4 rounded-lg border cursor-pointer transition-all',
                            isComplete 
                              ? 'bg-primary/5 border-primary/20' 
                              : 'border-border hover:border-primary/30'
                          )}
                          onClick={() => toggleStepComplete(step.step)}
                        >
                          <div className={cn(
                            'flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-all',
                            isComplete 
                              ? 'bg-primary' 
                              : 'border-2 border-muted-foreground/30'
                          )}>
                            {isComplete ? (
                              <Check className="h-4 w-4 text-primary-foreground" />
                            ) : (
                              <span className="text-sm font-medium text-muted-foreground">{step.step}</span>
                            )}
                          </div>
                          <div className="flex-1 pt-0.5">
                            <div className={cn(
                              'font-medium transition-all',
                              isComplete ? 'text-muted-foreground line-through' : 'text-foreground'
                            )}>
                              {step.instruction}
                            </div>
                            {step.details && (
                              <div className="mt-1 text-sm text-muted-foreground">{step.details}</div>
                            )}
                          </div>
                        </li>
                      );
                    })}
                  </ol>
                </CardContent>
              </Card>

              {/* Backup Option */}
              <Card className="border-border border-dashed bg-muted/30">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <Info className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <div className="font-medium text-foreground">Backup Option</div>
                      <div className="text-sm text-muted-foreground mt-1">
                        If your preferred flight is unavailable, try booking through Aeroplan using flexible dates. 
                        You can also check partner availability on United.com before transferring points.
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Total Cost */}
              <Card className="border-border bg-gradient-to-br from-primary/10 via-primary/5 to-transparent">
                <CardContent className="p-6">
                  <div className="text-center">
                    <div className="text-sm font-medium text-muted-foreground mb-1">Total Cost</div>
                    <div className="text-3xl font-bold text-foreground mb-1">
                      {totalPoints.toLocaleString()}
                    </div>
                    <div className="text-primary font-medium">points</div>
                    {totalFees > 0 && (
                      <div className="text-sm text-muted-foreground mt-2">+ ${totalFees} in fees</div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Actions */}
              <div className="space-y-3">
                <Button onClick={handleCopyRoadmap} variant="outline" className="w-full justify-start">
                  {copied ? <Check className="mr-2 h-4 w-4" /> : <Copy className="mr-2 h-4 w-4" />}
                  {copied ? 'Copied!' : 'Copy roadmap'}
                </Button>
                <Button onClick={handleNewTrip} className="w-full justify-start">
                  <Plus className="mr-2 h-4 w-4" />
                  Start new trip
                </Button>
                <Button onClick={() => navigate('/app')} variant="outline" className="w-full justify-start">
                  <Pencil className="mr-2 h-4 w-4" />
                  Edit trip
                </Button>
              </div>

              {/* Footer */}
              <div className="text-center text-xs text-muted-foreground pt-4 border-t border-border">
                Generated by PointPath AI
                <br />
                Point estimates are not guaranteed
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Roadmap;
