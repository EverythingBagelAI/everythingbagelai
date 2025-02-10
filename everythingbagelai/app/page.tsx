import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Code, Cpu, FileText, Sparkles } from 'lucide-react';

const features = [
  {
    title: 'AI Directory',
    description: 'Explore curated AI tools and applications.',
    icon: Sparkles,
    href: '/directory',
  },
  {
    title: 'Smart Chat',
    description: 'Get assistance with coding, automation, and more.',
    icon: Code,
    href: '/chat',
  },
  {
    title: 'Automation Hub',
    description: 'Discover and create powerful automation workflows.',
    icon: Cpu,
    href: '/directory/automations',
  },
  {
    title: 'Documentation',
    description: 'Access guides and documentation for integration.',
    icon: FileText,
    href: '/docs',
  },
];

export default function Home() {
  return (
    <div className="container py-8">
      <div className="mx-auto max-w-2xl text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Everything Bagel AI</h1>
        <p className="text-xl text-muted-foreground mb-8">
          Your one-stop platform for discovering, comparing, and integrating AI tools and automations.
        </p>
        <div className="flex gap-4 justify-center">
          <Link href="/directory">
            <Button size="lg">
              Browse Directory
            </Button>
          </Link>
          <Link href="/chat">
            <Button size="lg" variant="outline">
              Start Chat
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        {features.map((feature) => {
          const Icon = feature.icon;
          return (
            <Link key={feature.title} href={feature.href}>
              <Card className="p-6 hover:bg-muted/50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="rounded-lg bg-primary/10 p-2">
                    <Icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h2 className="font-semibold">{feature.title}</h2>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              </Card>
            </Link>
          );
        })}
      </div>

      <div className="mt-16 text-center">
        <h2 className="text-2xl font-semibold mb-4">Why Everything Bagel AI?</h2>
        <div className="max-w-2xl mx-auto text-muted-foreground">
          <p className="mb-4">
            We curate and organize the best AI tools and applications, making it easy for you to find
            and integrate the right solutions for your needs.
          </p>
          <p>
            With our smart chat assistants and automation workflows, you can get started quickly and
            make the most of AI technology.
          </p>
        </div>
      </div>
    </div>
  );
}
