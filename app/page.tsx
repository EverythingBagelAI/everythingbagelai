import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { AuroraBackground } from '@/components/ui/aurora-background';
import { StatsBar } from '@/components/sections/stats-bar';
import { Advantages } from '@/components/sections/advantages';
import { ServicesShowcase } from '@/components/sections/services-showcase';
import { HowItWorks } from '@/components/sections/how-it-works';
import { TechnologyStack } from '@/components/sections/technology-stack';
import { ResultsShowcase } from '@/components/sections/results-showcase';
import { FAQ } from '@/components/sections/faq';
import { FinalCTA } from '@/components/sections/final-cta';

export default function Home() {
  return (
    <>
      {/* Enhanced Hero Section */}
      <section className="snap-start snap-always w-screen">
        <AuroraBackground className="h-screen">
          <div className="relative z-10 text-center max-w-6xl mx-auto space-y-8 px-4">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tighter animate-fade-in-up">
              Build <span className="gradient-text">AI Systems</span>
              <br />
              That Actually Work
            </h1>

            <p
              className="text-xl sm:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed animate-fade-in-up"
              style={{ animationDelay: '150ms' }}
            >
              From strategy to implementation in weeks. No hype, just results.
            </p>

            <div
              className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-up"
              style={{ animationDelay: '300ms' }}
            >
              <Button
                asChild
                variant="rainbow"
                size="lg"
                className="text-lg px-8 py-6 hover:scale-105 transition-transform"
              >
                <Link href="/consulting">
                  Start Your AI Journey <span className="ml-2">→</span>
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="text-lg px-8 py-6 hover:scale-105 transition-transform"
              >
                <a href="#how-it-works">See How It Works</a>
              </Button>
            </div>

            <p
              className="text-sm text-muted-foreground animate-fade-in-up"
              style={{ animationDelay: '450ms' }}
            >
              Trusted by 100+ growing businesses
            </p>
          </div>
        </AuroraBackground>
      </section>

      {/* Stats Bar */}
      <section className="relative min-h-screen snap-start snap-always flex items-center justify-center py-20">
        <StatsBar />
      </section>

      {/* Advantages */}
      <section className="relative min-h-screen snap-start snap-always flex items-center justify-center py-20">
        <Advantages />
      </section>

      {/* Services Showcase - Part 1 */}
      <section className="relative min-h-screen snap-start snap-always flex items-center justify-center py-16">
        <div className="w-full">
          <div className="text-center mb-6">
            <h2 className="text-3xl lg:text-4xl font-bold mb-2">
              Our <span className="gradient-text">Services</span>
            </h2>
            <p className="text-base text-muted-foreground max-w-2xl mx-auto">
              Comprehensive AI solutions tailored to your business needs
            </p>
          </div>
          <ServicesShowcase serviceIndices={[0, 1]} />
        </div>
      </section>

      {/* Services Showcase - Part 2 */}
      <section className="relative min-h-screen snap-start snap-always flex items-center justify-center py-16">
        <ServicesShowcase serviceIndices={[2, 3]} />
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="relative min-h-screen snap-start snap-always flex items-center justify-center py-20">
        <HowItWorks />
      </section>

      {/* Technology Stack */}
      <section className="relative min-h-screen snap-start snap-always flex items-center justify-center py-20">
        <TechnologyStack />
      </section>

      {/* Results Showcase */}
      <section className="relative min-h-screen snap-start snap-always flex items-center justify-center py-20">
        <ResultsShowcase />
      </section>

      {/* FAQ */}
      <section className="relative min-h-screen snap-start snap-always flex items-center justify-center py-12">
        <FAQ />
      </section>

      {/* Final CTA */}
      <section className="relative min-h-screen snap-start snap-always flex items-center justify-center py-20">
        <FinalCTA />
      </section>
    </>
  );
}
