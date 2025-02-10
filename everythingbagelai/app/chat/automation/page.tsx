import { ChatInterface } from '@/components/chat-interface';
import { v4 as uuidv4 } from 'uuid';

export default function AutomationChatPage() {
  const sessionId = uuidv4();
  const context = `You are a helpful automation assistant. You help users with:
1. Workflow automation strategies
2. Tool selection and comparison
3. Integration patterns
4. Best practices for automation
5. Troubleshooting automation workflows

Always provide practical examples and step-by-step guidance when relevant.`;

  return (
    <div className="container py-4">
      <div className="mx-auto max-w-4xl">
        <div className="mb-4">
          <h1 className="text-2xl font-bold">Automation Assistant</h1>
          <p className="text-muted-foreground">
            Get help with workflow automation, tool selection, and integration strategies.
          </p>
        </div>
        <ChatInterface sessionId={sessionId} context={context} />
      </div>
    </div>
  );
}

