import { OpenAIStream } from 'ai';
import { createChatCompletion } from '@/lib/openai/chat';
import { createClient } from '@/lib/supabase/server';

export const runtime = 'edge';

export async function POST(req: Request) {
  try {
    const json = await req.json();
    const { messages, sessionId } = json;
    
    // Get user session from Supabase
    const supabase = createClient();
    const { data: { session } } = await supabase.auth.getSession();
    const userId = session?.user?.id;

    const completion = await createChatCompletion({
      messages,
      sessionId,
      userId,
    });

    // Create a stream from the completion
    const stream = OpenAIStream(completion);

    // Return the stream
    return new Response(stream);
  } catch (error) {
    console.error('Error in chat API:', error);
    return new Response(
      JSON.stringify({ error: 'There was an error processing your request' }),
      { status: 500 }
    );
  }
} 
