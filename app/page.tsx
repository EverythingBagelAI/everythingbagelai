import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const services = [
  {
    title: 'AI Strategy & Tool Advisory',
    description: 'Cut through the noise. We\'ll help you pick, set up, and actually use the right AI tools for your business.',
    emoji: '🧠',
  },
  {
    title: 'Lead Generation',
    description: 'AI systems that find and engage the right people — while you sleep.',
    emoji: '🎯',
  },
  {
    title: 'Sales Automation',
    description: 'Turn your CRM into a machine that chases leads, nurtures them, and closes deals without you babysitting it.',
    emoji: '💼',
  },
  {
    title: 'Content Creation',
    description: 'Your AI creative team — generating solid content across all your channels without the usual fluff.',
    emoji: '✍️',
  },
];

export default function Home() {
  return (
    <div className="container space-y-12 py-8">
      <div className="space-y-4 text-center">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">
          Tools That Automate. Systems That Scale. <span className="inline-block">✨</span>
        </h1>
        <p className="mx-auto max-w-[700px] text-lg text-muted-foreground">
          Custom automations, smart tools, real strategy.
        </p>
        <p className="mx-auto max-w-[700px] text-lg text-muted-foreground">
          We make AI work for you — not the other way around.
        </p>
        <div className="flex justify-center gap-4">
          <Button asChild variant="rainbow" size="lg">
            <Link href="/consulting">Get Started <span className="ml-2">→</span></Link>
          </Button>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 max-w-4xl mx-auto">
        {services.map((service) => (
          <Card
            key={service.title}
            className="flex flex-col items-start gap-2 p-6 transition-colors hover:bg-muted/50"
          >
            <Link href="/consulting" className="w-full">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{service.emoji}</span>
                <h3 className="font-semibold">{service.title}</h3>
              </div>
              <p className="mt-2 text-muted-foreground">{service.description}</p>
            </Link>
          </Card>
        ))}
      </div>

      <div className="mx-auto max-w-[700px] space-y-4 text-center text-muted-foreground">
        <p>
          We don\'t just recommend AI — we build systems that actually do something.
          From automation to lead gen to content, we make AI part of how your business works — not just a shiny add-on.
        </p>
        <p className="text-sm">
          Join the businesses already scaling smarter with EverythingBagel AI.
        </p>
      </div>
    </div>
  );
}
