import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const features = [
  {
    title: 'AI Consulting',
    description: 'Expert guidance on AI strategy, tools, and implementation tailored to your business needs.',
    emoji: '🧠',
    href: '/consulting',
  },
  {
    title: 'AI Tools',
    description: 'Access our suite of AI-powered tools for automation, content creation, and more.',
    emoji: '🛠️',
    href: '/tools/coming-soon',
  },
  {
    title: 'AI Directory',
    description: 'Curated collection of the best AI tools and resources, updated regularly.',
    emoji: '📚',
    href: '/directory/coming-soon',
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

      <div className="flex flex-col gap-4 max-w-2xl mx-auto">
        {features.map((feature) => (
          <Card
            key={feature.title}
            className="flex flex-col items-start gap-2 p-6 transition-colors hover:bg-muted/50"
          >
            <Link href={feature.href} className="w-full">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{feature.emoji}</span>
                <h3 className="font-semibold">{feature.title}</h3>
              </div>
              <p className="mt-2 text-muted-foreground">{feature.description}</p>
            </Link>
          </Card>
        ))}
      </div>

      <div className="mx-auto max-w-[700px] space-y-4 text-center text-muted-foreground">
        <p>
          From strategy to implementation, we help businesses leverage AI effectively. Our consulting services
          and curated tools empower you to automate workflows, generate leads, and scale your operations.
        </p>
        <p className="text-sm">
          Join the businesses already transforming their operations with EverythingBagel AI.
        </p>
      </div>
    </div>
  );
}
