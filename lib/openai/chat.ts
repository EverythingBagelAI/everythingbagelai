import { OpenAI } from 'openai';
import { createClient } from '@/lib/supabase/server';
import { openai, defaultModel, defaultTemperature, defaultMaxTokens } from './config';

export type ChatMessage = OpenAI.Chat.ChatCompletionMessageParam;

interface ChatOptions {
  messages: ChatMessage[];
  sessionId?: string;
  userId?: string;
  model?: string;
  temperature?: number;
  maxTokens?: number;
}

export async function createChatCompletion({
  messages,
  sessionId,
  userId,
  model = defaultModel,
  temperature = defaultTemperature,
  maxTokens = defaultMaxTokens,
}: ChatOptions) {
  try {
    // Create chat completion
    const completion = await openai.chat.completions.create({
      model,
      messages,
      temperature,
      max_tokens: maxTokens,
      stream: true,
    });

    // Log the chat in Supabase if sessionId is provided
    if (sessionId) {
      const supabase = await createClient();
      const lastUserMessage = messages[messages.length - 1];
      
      await supabase.from('chat_logs').insert({
        session_id: sessionId,
        user_id: userId,
        message: lastUserMessage.content,
        context: {
          messages: messages.slice(0, -1), // Store previous context
          model,
          temperature,
        },
      });
    }

    return completion;
  } catch (error) {
    console.error('Error in createChatCompletion:', error);
    throw error;
  }
}

export async function createEmbedding(text: string) {
  try {
    const response = await openai.embeddings.create({
      model: 'text-embedding-3-small',
      input: text,
    });

    return response.data[0].embedding;
  } catch (error) {
    console.error('Error in createEmbedding:', error);
    throw error;
  }
} 