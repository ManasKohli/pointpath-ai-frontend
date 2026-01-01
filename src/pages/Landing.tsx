import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Compass, Check, ArrowRight, Sparkles, Plane, Building2 } from 'lucide-react';

// Logo components for points programs
const AmexLogo = () => (
  <div className="flex items-center justify-center h-12 px-4">
    <div className="bg-[#006FCF] text-white font-bold text-sm px-3 py-2 rounded">
      AMERICAN EXPRESS
    </div>
  </div>
);

const AeroplanLogo = () => (
  <div className="flex items-center justify-center h-12 px-4">
    <div className="text-foreground font-bold text-lg tracking-wide">
      <span className="text-[#00A550]">●</span> Aeroplan
    </div>
  </div>
);

const AvionLogo = () => (
  <div className="flex items-center justify-center h-12 px-4">
    <div className="text-[#1E3A5F] font-serif font-bold text-lg tracking-wider">
      AVION
    </div>
  </div>
);

// Airline logos
const AirCanadaLogo = () => (
  <div className="flex items-center gap-2 h-10 px-3 opacity-70 hover:opacity-100 transition-opacity">
    <div className="w-6 h-6 rounded-full border-2 border-[#F01428] flex items-center justify-center">
      <span className="text-[#F01428] text-xs">🍁</span>
    </div>
    <span className="text-foreground font-medium text-sm">Air Canada</span>
  </div>
);

const BritishAirwaysLogo = () => (
  <div className="flex items-center gap-1 h-10 px-3 opacity-70 hover:opacity-100 transition-opacity">
    <span className="text-[#2E5C99] font-serif text-sm tracking-wide">BRITISH AIRWAYS</span>
  </div>
);

const AirFranceLogo = () => (
  <div className="flex items-center gap-1 h-10 px-3 opacity-70 hover:opacity-100 transition-opacity">
    <span className="text-[#002157] font-bold text-sm tracking-wide">AIRFRANCE</span>
    <span className="text-[#ED1C24]">↗</span>
  </div>
);

const QatarLogo = () => (
  <div className="flex items-center h-10 px-3 opacity-70 hover:opacity-100 transition-opacity">
    <span className="text-[#5C0632] font-serif text-sm tracking-wide">QATAR AIRWAYS</span>
  </div>
);

const LufthansaLogo = () => (
  <div className="flex items-center gap-1 h-10 px-3 opacity-70 hover:opacity-100 transition-opacity">
    <div className="w-5 h-5 rounded-full bg-[#05164D] flex items-center justify-center">
      <span className="text-[#FFD700] text-xs">✦</span>
    </div>
    <span className="text-[#05164D] font-medium text-sm">Lufthansa</span>
  </div>
);

const UnitedLogo = () => (
  <div className="flex items-center h-10 px-3 opacity-70 hover:opacity-100 transition-opacity">
    <span className="text-[#0033A0] font-bold text-sm">UNITED</span>
  </div>
);

const EmiratesLogo = () => (
  <div className="flex items-center h-10 px-3 opacity-70 hover:opacity-100 transition-opacity">
    <span className="text-[#D71920] font-serif text-sm italic">Emirates</span>
  </div>
);

// Hotel logos
const MarriottLogo = () => (
  <div className="flex items-center h-10 px-3 opacity-70 hover:opacity-100 transition-opacity">
    <span className="text-foreground font-medium text-sm tracking-widest">MARRIOTT BONVOY</span>
  </div>
);

const HiltonLogo = () => (
  <div className="flex items-center h-10 px-3 opacity-70 hover:opacity-100 transition-opacity">
    <span className="text-foreground font-bold text-sm">Hilton</span>
    <span className="text-muted-foreground text-xs ml-1">HONORS</span>
  </div>
);

const HyattLogo = () => (
  <div className="flex items-center h-10 px-3 opacity-70 hover:opacity-100 transition-opacity">
    <span className="text-foreground font-medium text-sm tracking-wide">WORLD OF HYATT</span>
  </div>
);

const IHGLogo = () => (
  <div className="flex items-center h-10 px-3 opacity-70 hover:opacity-100 transition-opacity">
    <span className="text-[#004987] font-bold text-sm">IHG</span>
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

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-md">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <Compass className="h-6 w-6 text-primary" />
            <span className="text-lg font-semibold text-foreground">PointPath AI</span>
          </div>
          <Button variant="default" size="sm" onClick={() => navigate('/auth')}>
            Get Started
          </Button>
        </div>
      </header>

      {/* Hero - Dark gradient like resumax */}
      <section className="relative pt-16 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent" />
        <div className="container mx-auto px-4 py-20 sm:py-28 relative z-10">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary/20 border border-primary/30 px-4 py-2 text-sm text-primary-foreground/90">
              <Sparkles className="h-4 w-4 text-primary" />
              Built for Canadians
            </div>
            <h1 className="mb-6 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Plan trips with points
              <span className="block bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent">
                in minutes
              </span>
            </h1>
            <p className="mb-10 text-lg text-slate-300 sm:text-xl max-w-2xl mx-auto">
              Our AI compares transfer paths and builds a step-by-step booking roadmap for Canadians using Amex MR, Aeroplan, and RBC Avion.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button size="lg" onClick={() => navigate('/auth')} className="gap-2 bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/25">
                Get started
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" className="border-slate-600 text-slate-200 hover:bg-slate-800 hover:text-white" onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}>
                See how it works
              </Button>
            </div>
            
            {/* Stats like resumax */}
            <div className="mt-16 grid grid-cols-3 gap-4 max-w-2xl mx-auto">
              <Card className="bg-slate-800/50 border-slate-700 backdrop-blur">
                <CardContent className="p-4 text-center">
                  <div className="text-primary text-2xl font-bold">AI</div>
                  <div className="text-slate-400 text-xs mt-1">Powered</div>
                </CardContent>
              </Card>
              <Card className="bg-slate-800/50 border-slate-700 backdrop-blur">
                <CardContent className="p-4 text-center">
                  <div className="text-primary text-2xl font-bold">100%</div>
                  <div className="text-slate-400 text-xs mt-1">Canada-First</div>
                </CardContent>
              </Card>
              <Card className="bg-slate-800/50 border-slate-700 backdrop-blur">
                <CardContent className="p-4 text-center">
                  <div className="text-primary text-2xl font-bold">3+</div>
                  <div className="text-slate-400 text-xs mt-1">Programs</div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Points Programs Logos */}
      <section className="bg-slate-900 py-10 border-y border-slate-800">
        <div className="container mx-auto px-4">
          <p className="text-center text-slate-500 text-sm mb-6">Supported Points Programs</p>
          <div className="flex flex-wrap justify-center items-center gap-8">
            <AmexLogo />
            <AeroplanLogo />
            <AvionLogo />
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="bg-background py-20">
        <div className="container mx-auto px-4">
          <h2 className="mb-4 text-center text-3xl font-bold text-foreground">How it works</h2>
          <p className="mb-12 text-center text-muted-foreground">Three simple steps to your perfect trip</p>
          <div className="mx-auto grid max-w-4xl gap-8 sm:grid-cols-3">
            {steps.map((step) => (
              <Card key={step.number} className="border-border bg-card hover:shadow-md transition-shadow">
                <CardContent className="p-6 text-center">
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    {step.icon}
                  </div>
                  <h3 className="mb-2 font-semibold text-foreground">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Airlines Section */}
      <section className="bg-secondary/50 py-12 border-y border-border">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center gap-2 mb-6">
            <Plane className="h-5 w-5 text-muted-foreground" />
            <p className="text-center text-muted-foreground text-sm">Works with major airlines</p>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-6 md:gap-10">
            <AirCanadaLogo />
            <BritishAirwaysLogo />
            <AirFranceLogo />
            <QatarLogo />
            <LufthansaLogo />
            <UnitedLogo />
            <EmiratesLogo />
          </div>
        </div>
      </section>

      {/* Value props */}
      <section className="bg-card py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-4 text-center text-3xl font-bold text-foreground">Why PointPath AI?</h2>
            <p className="mb-12 text-center text-muted-foreground">Maximize your points, minimize mistakes</p>
            <div className="grid gap-4 sm:grid-cols-2">
              {valueProps.map((prop) => (
                <Card key={prop} className="border-border">
                  <CardContent className="flex items-center gap-3 p-4">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10">
                      <Check className="h-4 w-4 text-primary" />
                    </div>
                    <span className="text-foreground font-medium">{prop}</span>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Hotels Section */}
      <section className="bg-secondary/50 py-12 border-y border-border">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center gap-2 mb-6">
            <Building2 className="h-5 w-5 text-muted-foreground" />
            <p className="text-center text-muted-foreground text-sm">Hotel partners included</p>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-6 md:gap-10">
            <MarriottLogo />
            <HiltonLogo />
            <HyattLogo />
            <IHGLogo />
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-background py-20">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-3xl font-bold text-foreground">What users say</h2>
          <div className="mx-auto grid max-w-4xl gap-6 sm:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-border bg-card">
                <CardContent className="p-6">
                  <p className="mb-4 text-foreground italic">"{testimonial.quote}"</p>
                  <p className="text-sm text-muted-foreground">— {testimonial.author}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA - Dark gradient */}
      <section className="bg-gradient-to-b from-slate-900 to-slate-800 py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-4 text-3xl font-bold text-white">Ready to plan your trip?</h2>
          <p className="mb-8 text-slate-400">Start maximizing your points today</p>
          <Button size="lg" onClick={() => navigate('/auth')} className="gap-2 bg-primary hover:bg-primary/90 shadow-lg shadow-primary/25">
            Get started free
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-slate-800 py-8">
        <div className="container mx-auto px-4">
          <div className="mb-6 text-center text-sm text-slate-500">
            Point estimates are not guaranteed. Always verify availability before transferring points.
          </div>
          <div className="flex justify-center gap-6 text-sm text-slate-500">
            <button className="hover:text-slate-300 transition-colors">Terms</button>
            <button className="hover:text-slate-300 transition-colors">Privacy</button>
          </div>
          <div className="mt-6 text-center text-xs text-slate-600">
            © {new Date().getFullYear()} PointPath AI
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
