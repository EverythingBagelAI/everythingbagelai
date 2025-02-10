import { ChatInterface } from '@/components/chat-interface';
import { v4 as uuidv4 } from 'uuid';

export default function PrdChatPage() {
  const sessionId = uuidv4();
  const context = `You are a helpful PRD (Product Requirements Document) assistant. You help users with:
1. Creating comprehensive PRDs
2. Defining product requirements
3. User story development
4. Feature specification
5. Success metrics and KPIs
6. Technical requirements
7. Implementation considerations

Always focus on clarity, completeness, and actionable requirements.`;

  return (
    <div className="container py-4">
      <div className="mx-auto max-w-4xl">
        <div className="mb-4">
          <h1 className="text-2xl font-bold">PRD Assistant</h1>
          <p className="text-muted-foreground">
            Get help creating and refining product requirements documents.
          </p>
        </div>
        <ChatInterface sessionId={sessionId} context={context} />
      </div>
    </div>
  );
}

