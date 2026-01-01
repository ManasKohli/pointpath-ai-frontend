import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Compass, Check, ArrowRight, Sparkles, Plane, Building2 } from 'lucide-react';
import { AnimatedSection } from '@/components/AnimatedSection';

// Logo components for points programs
const AmexLogo = () => (
  <div className="flex items-center justify-center h-14 px-6 bg-[#006FCF] rounded-lg">
    <span className="text-white font-bold text-sm tracking-wide">AMERICAN EXPRESS</span>
  </div>
);

const AeroplanLogo = () => (
  <div className="flex items-center justify-center h-14 px-6 bg-white/10 rounded-lg border border-white/20">
    <div className="flex items-center gap-2">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="10" fill="#00A550"/>
        <path d="M8 12L11 15L16 9" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
      <span className="text-white font-semibold text-lg">Aeroplan</span>
    </div>
  </div>
);

const AvionLogo = () => (
  <div className="flex items-center justify-center h-14 px-6 bg-[#003168] rounded-lg">
    <div className="flex items-center gap-2">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path d="M12 2L22 8.5V15.5L12 22L2 15.5V8.5L12 2Z" fill="#FFD700"/>
      </svg>
      <span className="text-white font-bold text-lg tracking-wider">RBC AVION</span>
    </div>
  </div>
);

// Airline logos - cleaner styled versions
const AirlineLogo = ({ name, color }: { name: string; color: string }) => (
  <div className="flex items-center justify-center h-10 px-4 rounded-md bg-card/50 border border-border/50 hover:border-primary/30 transition-all">
    <span className={`font-medium text-sm ${color}`}>{name}</span>
  </div>
);

// Hotel logos
const HotelLogo = ({ name }: { name: string }) => (
  <div className="flex items-center justify-center h-10 px-4 rounded-md bg-card/50 border border-border/50 hover:border-primary/30 transition-all">
    <span className="font-medium text-sm text-foreground/80">{name}</span>
  </div>
);

const Landing = () => {
  const navigate = useNavigate();

  const steps = [
    {
      number: '1',
      title: 'Enter trip details',
      description: 'Where you\'re going, when, and how many travelers',
      icon: <Compass className="h-5 w-5" />,
    },
    {
      number: '2',
      title: 'Choose your flight',
      description: 'AI recommends the best redemption paths',
      icon: <Plane className="h-5 w-5" />,
    },
    {
      number: '3',
      title: 'Get your roadmap',
      description: 'Step-by-step booking instructions',
      icon: <Building2 className="h-5 w-5" />,
    },
  ];

  const valueProps = [
    'AI-recommended options',
    'Clear step-by-step instructions',
    'Avoid irreversible transfer mistakes',
    'Canada-first points logic',
  ];

  const testimonials = [
    {
      quote: 'Finally, a tool that understands Canadian points programs!',
      author: 'Travel enthusiast',
    },
    {
      quote: 'Saved me from making a costly transfer mistake.',
      author: 'Points collector',
    },
    {
      quote: 'The step-by-step roadmap made booking so easy.',
      author: 'First-time points user',
    },
  ];

  const airlines = [
    { name: 'Air Canada', color: 'text-[#F01428]' },
    { name: 'British Airways', color: 'text-[#2E5C99]' },
    { name: 'Air France', color: 'text-[#002157]' },
    { name: 'Qatar Airways', color: 'text-[#5C0632]' },
    { name: 'Lufthansa', color: 'text-[#05164D]' },
    { name: 'United', color: 'text-[#0033A0]' },
    { name: 'Emirates', color: 'text-[#D71920]' },
  ];

  const hotels = ['Marriott Bonvoy', 'Hilton Honors', 'World of Hyatt', 'IHG One Rewards'];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/95 backdrop-blur-md">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <Compass className="h-6 w-6 text-primary" />
            <span className="text-lg font-semibold text-foreground">PointPath AI</span>
          </div>
          <Button onClick={() => navigate('/auth')}>
            Get Started
          </Button>
        </div>
      </header>

      {/* Hero */}
      <section className="relative pt-16 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent" />
        <div className="container mx-auto px-4 py-20 sm:py-28 relative z-10">
          <div className="mx-auto max-w-3xl text-center">
            <AnimatedSection>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/20 px-4 py-2 text-sm text-white/90">
                <Sparkles className="h-4 w-4 text-primary" />
                Built for Canadians
              </div>
            </AnimatedSection>
            
            <AnimatedSection delay={100}>
              <h1 className="mb-6 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
                Plan trips with points
                <span className="block bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent">
                  in minutes
                </span>
              </h1>
            </AnimatedSection>
            
            <AnimatedSection delay={200}>
              <p className="mb-10 text-lg text-slate-300 sm:text-xl max-w-2xl mx-auto leading-relaxed">
                Our AI compares transfer paths and builds a step-by-step booking roadmap for Canadians using Amex MR, Aeroplan, and RBC Avion.
              </p>
            </AnimatedSection>
            
            <AnimatedSection delay={300}>
              <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
                <Button 
                  size="lg" 
                  onClick={() => navigate('/auth')} 
                  className="gap-2 shadow-lg shadow-primary/30"
                >
                  Get started
                  <ArrowRight className="h-4 w-4" />
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-white/30 bg-white/5 text-white hover:bg-white/10 hover:text-white hover:border-white/50" 
                  onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  See how it works
                </Button>
              </div>
            </AnimatedSection>
            
            {/* Stats */}
            <AnimatedSection delay={400}>
              <div className="mt-16 grid grid-cols-3 gap-4 max-w-2xl mx-auto">
                <Card className="bg-white/5 border-white/10 backdrop-blur">
                  <CardContent className="p-4 text-center">
                    <div className="text-primary text-2xl font-bold">AI</div>
                    <div className="text-slate-400 text-xs mt-1">Powered</div>
                  </CardContent>
                </Card>
                <Card className="bg-white/5 border-white/10 backdrop-blur">
                  <CardContent className="p-4 text-center">
                    <div className="text-primary text-2xl font-bold">100%</div>
                    <div className="text-slate-400 text-xs mt-1">Canada-First</div>
                  </CardContent>
                </Card>
                <Card className="bg-white/5 border-white/10 backdrop-blur">
                  <CardContent className="p-4 text-center">
                    <div className="text-primary text-2xl font-bold">3+</div>
                    <div className="text-slate-400 text-xs mt-1">Programs</div>
                  </CardContent>
                </Card>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Points Programs Logos */}
      <section className="bg-slate-900 py-12 border-y border-slate-800">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <p className="text-center text-slate-400 text-sm mb-8 font-medium">Supported Points Programs</p>
            <div className="flex flex-wrap justify-center items-center gap-6">
              <AmexLogo />
              <AeroplanLogo />
              <AvionLogo />
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="bg-background py-20">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <h2 className="mb-4 text-center text-3xl font-bold text-foreground">How it works</h2>
            <p className="mb-12 text-center text-muted-foreground">Three simple steps to your perfect trip</p>
          </AnimatedSection>
          <div className="mx-auto grid max-w-4xl gap-8 sm:grid-cols-3">
            {steps.map((step, index) => (
              <AnimatedSection key={step.number} delay={index * 150}>
                <Card className="border-border bg-card hover:shadow-lg hover:border-primary/20 transition-all duration-300 h-full">
                  <CardContent className="p-6 text-center">
                    <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                      {step.icon}
                    </div>
                    <h3 className="mb-2 font-semibold text-foreground">{step.title}</h3>
                    <p className="text-sm text-muted-foreground">{step.description}</p>
                  </CardContent>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Airlines Section */}
      <section className="bg-secondary/30 py-14 border-y border-border">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <div className="flex items-center justify-center gap-2 mb-8">
              <Plane className="h-5 w-5 text-primary" />
              <p className="text-foreground font-medium">Works with major airlines</p>
            </div>
            <div className="flex flex-wrap justify-center items-center gap-4">
              {airlines.map((airline) => (
                <AirlineLogo key={airline.name} name={airline.name} color={airline.color} />
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Value props */}
      <section className="bg-card py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <AnimatedSection>
              <h2 className="mb-4 text-center text-3xl font-bold text-foreground">Why PointPath AI?</h2>
              <p className="mb-12 text-center text-muted-foreground">Maximize your points, minimize mistakes</p>
            </AnimatedSection>
            <div className="grid gap-4 sm:grid-cols-2">
              {valueProps.map((prop, index) => (
                <AnimatedSection key={prop} delay={index * 100}>
                  <Card className="border-border hover:border-primary/30 transition-all">
                    <CardContent className="flex items-center gap-3 p-4">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10">
                        <Check className="h-4 w-4 text-primary" />
                      </div>
                      <span className="text-foreground font-medium">{prop}</span>
                    </CardContent>
                  </Card>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Hotels Section */}
      <section className="bg-secondary/30 py-14 border-y border-border">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <div className="flex items-center justify-center gap-2 mb-8">
              <Building2 className="h-5 w-5 text-primary" />
              <p className="text-foreground font-medium">Hotel partners included</p>
            </div>
            <div className="flex flex-wrap justify-center items-center gap-4">
              {hotels.map((hotel) => (
                <HotelLogo key={hotel} name={hotel} />
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-background py-20">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <h2 className="mb-12 text-center text-3xl font-bold text-foreground">What users say</h2>
          </AnimatedSection>
          <div className="mx-auto grid max-w-4xl gap-6 sm:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <AnimatedSection key={index} delay={index * 150}>
                <Card className="border-border bg-card hover:shadow-lg transition-all duration-300 h-full">
                  <CardContent className="p-6">
                    <p className="mb-4 text-foreground italic leading-relaxed">"{testimonial.quote}"</p>
                    <p className="text-sm text-muted-foreground">— {testimonial.author}</p>
                  </CardContent>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-b from-slate-900 to-slate-800 py-20">
        <div className="container mx-auto px-4 text-center">
          <AnimatedSection>
            <h2 className="mb-4 text-3xl font-bold text-white">Ready to plan your trip?</h2>
            <p className="mb-8 text-slate-300">Start maximizing your points today</p>
            <Button 
              size="lg" 
              onClick={() => navigate('/auth')} 
              className="gap-2 shadow-lg shadow-primary/30"
            >
              Get started free
              <ArrowRight className="h-4 w-4" />
            </Button>
          </AnimatedSection>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-slate-800 py-8">
        <div className="container mx-auto px-4">
          <div className="mb-6 text-center text-sm text-slate-400">
            Point estimates are not guaranteed. Always verify availability before transferring points.
          </div>
          <div className="flex justify-center gap-6 text-sm text-slate-400">
            <button className="hover:text-white transition-colors">Terms</button>
            <button className="hover:text-white transition-colors">Privacy</button>
          </div>
          <div className="mt-6 text-center text-xs text-slate-500">
            © {new Date().getFullYear()} PointPath AI
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
