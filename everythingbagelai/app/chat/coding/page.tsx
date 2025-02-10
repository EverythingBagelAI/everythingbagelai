import { ChatInterface } from '@/components/chat-interface';
import { v4 as uuidv4 } from 'uuid';

export default function CodingChatPage() {
  const sessionId = uuidv4();
  const context = `You are a helpful coding assistant. You help users with:
1. Code review and suggestions
2. Debugging assistance
3. Best practices and patterns
4. Performance optimization
5. Security considerations

Always provide code examples when relevant, and explain your reasoning clearly.`;

  return (
    <div className="container py-4">
      <div className="mx-auto max-w-4xl">
        <div className="mb-4">
          <h1 className="text-2xl font-bold">Coding Assistant</h1>
          <p className="text-muted-foreground">
            Get help with code review, debugging, and development best practices.
          </p>
        </div>
        <ChatInterface sessionId={sessionId} context={context} />
      </div>
    </div>
  );
}

