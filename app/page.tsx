import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const services = [
  {
    title: 'AI Strategy & Tool Advisory',
    description: 'Expert guidance on selecting and implementing the right AI tools for your business.',
    emoji: '🧠',
  },
  {
    title: 'Lead Generation',
    description: 'AI-powered systems that find and engage your ideal prospects 24/7.',
    emoji: '🎯',
  },
  {
    title: 'Sales Automation',
    description: 'Transform your CRM into an intelligent system that nurtures and closes deals.',
    emoji: '💼',
  },
  {
    title: 'Content Creation',
    description: 'Get a full AI creative team that generates engaging content across all channels.',
    emoji: '✍️',
  },
];

export default function Home() {
  return (
    <div className="container space-y-12 py-8">
      <div className="space-y-4 text-center">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">
          AI That Actually Does Stuff — No Nerd Squad Required <span className="inline-block">✨</span>
        </h1>
        <p className="mx-auto max-w-[700px] text-lg text-muted-foreground">
          From custom automations to smart tools and strategy, we make AI work for your business (not the other way around).
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
          We help businesses leverage AI effectively through expert consulting and implementation.
          Our team specializes in creating custom AI solutions that automate workflows, generate
          leads, and scale your operations.
        </p>
        <p className="text-sm">
          Join the businesses already transforming their operations with EverythingBagel AI.
        </p>
      </div>
    </div>
  );
}
