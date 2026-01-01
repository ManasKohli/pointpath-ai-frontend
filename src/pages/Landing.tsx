import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Compass, Plane, Building2, Route, Check, ArrowRight, Sparkles } from 'lucide-react';

const Landing = () => {
  const navigate = useNavigate();

  const steps = [
    {
      number: '1',
      title: 'Enter trip details',
      description: 'Where you\'re going, when, and how many travelers',
    },
    {
      number: '2',
      title: 'Choose your flight',
      description: 'AI recommends the best redemption paths',
    },
    {
      number: '3',
      title: 'Get your roadmap',
      description: 'Step-by-step booking instructions',
    },
  ];

  const programs = [
    {
      title: 'Amex MR (Canada)',
      description: 'Transfer or use directly when it\'s smarter',
      icon: '💳',
    },
    {
      title: 'Aeroplan',
      description: 'Find the best Aeroplan strategy and backups',
      icon: '✈️',
    },
    {
      title: 'RBC Avion',
      description: 'Unlock Avion value via Avios-style paths',
      icon: '🎯',
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
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <Compass className="h-6 w-6 text-primary" />
            <span className="text-lg font-semibold text-foreground">PointPath AI</span>
          </div>
          <Button variant="ghost" onClick={() => navigate('/auth')}>
            Log in
          </Button>
        </div>
      </header>

      {/* Hero */}
      <section className="py-20 sm:py-28">
        <div className="container mx-auto px-4 text-center">
          <div className="mx-auto max-w-3xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm text-primary">
              <Sparkles className="h-4 w-4" />
              Built for Canadians
            </div>
            <h1 className="mb-6 text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Plan trips with points in minutes
            </h1>
            <p className="mb-10 text-lg text-muted-foreground sm:text-xl">
              Our AI compares transfer paths and builds a step-by-step booking roadmap for Canadians using Amex MR, Aeroplan, and RBC Avion.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button size="lg" onClick={() => navigate('/auth')} className="gap-2">
                Get started
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}>
                See how it works
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="border-t border-border bg-card py-20">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-3xl font-bold text-foreground">How it works</h2>
          <div className="mx-auto grid max-w-4xl gap-8 sm:grid-cols-3">
            {steps.map((step) => (
              <div key={step.number} className="text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-xl font-bold text-primary-foreground">
                  {step.number}
                </div>
                <h3 className="mb-2 font-semibold text-foreground">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Programs supported */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="mb-4 text-center text-3xl font-bold text-foreground">What it supports</h2>
          <p className="mb-12 text-center text-muted-foreground">Flights only, Hotels only, or both</p>
          <div className="mx-auto grid max-w-4xl gap-6 sm:grid-cols-3">
            {programs.map((program) => (
              <Card key={program.title} className="border-border bg-card">
                <CardContent className="p-6 text-center">
                  <div className="mb-4 text-4xl">{program.icon}</div>
                  <h3 className="mb-2 font-semibold text-foreground">{program.title}</h3>
                  <p className="text-sm text-muted-foreground">{program.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Value props */}
      <section className="border-t border-border bg-card py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl">
            <h2 className="mb-12 text-center text-3xl font-bold text-foreground">Why PointPath AI?</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {valueProps.map((prop) => (
                <div key={prop} className="flex items-center gap-3">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10">
                    <Check className="h-4 w-4 text-primary" />
                  </div>
                  <span className="text-foreground">{prop}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-3xl font-bold text-foreground">What users say</h2>
          <div className="mx-auto grid max-w-4xl gap-6 sm:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-border bg-card">
                <CardContent className="p-6">
                  <p className="mb-4 text-foreground">"{testimonial.quote}"</p>
                  <p className="text-sm text-muted-foreground">— {testimonial.author}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border bg-card py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-6 text-3xl font-bold text-foreground">Ready to plan your trip?</h2>
          <Button size="lg" onClick={() => navigate('/auth')} className="gap-2">
            Get started free
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="container mx-auto px-4">
          <div className="mb-6 text-center text-sm text-muted-foreground">
            Point estimates are not guaranteed. Always verify availability before transferring points.
          </div>
          <div className="flex justify-center gap-6 text-sm text-muted-foreground">
            <button className="hover:text-foreground transition-colors">Terms</button>
            <button className="hover:text-foreground transition-colors">Privacy</button>
          </div>
          <div className="mt-6 text-center text-xs text-muted-foreground">
            © {new Date().getFullYear()} PointPath AI
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
