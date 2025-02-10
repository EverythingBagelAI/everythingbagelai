import { ChatInterface } from '@/components/chat-interface';
import { v4 as uuidv4 } from 'uuid';

export default function AiAppsChatPage() {
  const sessionId = uuidv4();
  const context = `You are a helpful AI applications assistant. You help users with:
1. AI tool recommendations
2. Feature comparisons
3. Integration guidance
4. Use case analysis
5. Best practices for AI implementation
6. Cost and performance considerations

Always provide specific tool recommendations and practical implementation advice.`;

  return (
    <div className="container h-full py-6">
      <div className="mx-auto max-w-4xl space-y-4">
        <div>
          <h1 className="text-2xl font-bold">AI Apps Assistant</h1>
          <p className="text-muted-foreground">
            Get help discovering and implementing AI applications for your needs.
          </p>
        </div>
        <ChatInterface sessionId={sessionId} context={context} />
      </div>
    </div>
  );
}

