import { useChat } from 'ai/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';

export function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();

  return (
    <div className="flex h-[600px] flex-col space-y-4">
      <ScrollArea className="flex-1 rounded-md border p-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={cn(
              'mb-4 flex items-start space-x-4 rounded-lg p-4',
              message.role === 'assistant'
                ? 'bg-muted'
                : 'bg-primary/10'
            )}
          >
            <div className="flex-1">
              <p className="font-semibold">
                {message.role === 'assistant' ? 'AI' : 'You'}
              </p>
              <p className="mt-1">{message.content}</p>
            </div>
          </div>
        ))}
      </ScrollArea>
      <form onSubmit={handleSubmit} className="flex space-x-2">
        <Input
          value={input}
          onChange={handleInputChange}
          placeholder="Type your message..."
          className="flex-1"
        />
        <Button type="submit">Send</Button>
      </form>
    </div>
  );
}
