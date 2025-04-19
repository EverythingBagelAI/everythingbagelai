import OpenAI from 'openai';

// Set the runtime to edge for streaming
export const runtime = 'edge';

if (!process.env.OPENAI_API_KEY) {
  throw new Error('OPENAI_API_KEY is not set in environment variables');
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    // Create chat completion with streaming
    const response = await openai.chat.completions.create({
      model: process.env.AI_MODEL || 'gpt-4',
      stream: true,
      messages,
      temperature: parseFloat(process.env.AI_TEMPERATURE || '0.7'),
      max_tokens: parseInt(process.env.AI_MAX_TOKENS || '4096'),
    });

    // Create a readable stream from the response
    const stream = new ReadableStream({
      async start(controller) {
        for await (const chunk of response) {
          const content = chunk.choices[0]?.delta?.content;
          if (content) {
            controller.enqueue(new TextEncoder().encode(content));
          }
        }
        controller.close();
      },
    });

    // Return the stream
    return new Response(stream);
  } catch (error) {
    console.error('Error in chat route:', error);
    return new Response(
      JSON.stringify({ 
        error: 'Internal Server Error',
        details: error instanceof Error ? error.message : 'Unknown error'
      }), 
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
} 
