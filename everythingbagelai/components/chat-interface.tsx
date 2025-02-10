"use client"

import * as React from "react"
import { Send } from "lucide-react"
import { useChat } from 'ai/react'
import { useEffect, useRef, useState } from 'react'
import { motion } from "framer-motion"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"

interface ChatInterfaceProps {
  context?: string;
  sessionId?: string;
}

const contextOptions = [
  "Documentation",
  "Code Examples",
  "Best Practices",
  "Troubleshooting",
  "Integration",
  "Security",
  "Performance",
  "Testing",
  "API Reference",
  "Database Design",
  "UI Components",
  "State Management",
  "Error Handling",
  "Authentication",
  "Authorization",
  "Data Validation",
  "Caching",
  "Deployment",
  "Monitoring",
  "Logging",
  "Unit Testing",
  "E2E Testing",
  "CI/CD",
  "Architecture",
  "Optimization"
];

export function ChatInterface({ context, sessionId }: ChatInterfaceProps) {
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: '/api/chat',
    body: {
      sessionId,
      context,
    },
  });

  const [selectedContexts, setSelectedContexts] = useState<string[]>([]);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const toggleContext = (contextOption: string) => {
    setSelectedContexts((prev) =>
      prev.includes(contextOption) 
        ? prev.filter((item) => item !== contextOption)
        : [...prev, contextOption]
    );
  };

  // Scroll to bottom when messages change
  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="flex h-[calc(100vh-11rem)] flex-col bg-background rounded-lg">
      <ScrollArea ref={scrollAreaRef} className="flex-1 px-4 pt-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`mb-4 flex ${
              message.role === 'assistant' ? 'justify-start' : 'justify-end'
            }`}
          >
            <div
              className={`rounded-lg px-4 py-2 ${
                message.role === 'assistant'
                  ? 'bg-secondary text-secondary-foreground'
                  : 'bg-primary text-primary-foreground'
              }`}
            >
              {message.content}
            </div>
          </div>
        ))}
      </ScrollArea>
      <div className="bg-background p-4 space-y-4">
        <form onSubmit={handleSubmit}>
          <div className="flex gap-4">
            <Input
              value={input}
              onChange={handleInputChange}
              placeholder="Type your message..."
              disabled={isLoading}
              className="flex-1"
            />
            <Button type="submit" disabled={isLoading}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </form>
        <div className="flex flex-wrap gap-2">
          {contextOptions.map((contextOption) => (
            <motion.div key={contextOption} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                type="button"
                variant={selectedContexts.includes(contextOption) ? "default" : "secondary"}
                onClick={() => toggleContext(contextOption)}
                className="transition-colors text-[11px] py-1 h-7 px-3"
                size="sm"
              >
                {contextOption}
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

