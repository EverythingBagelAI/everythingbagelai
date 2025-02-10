import OpenAI from 'openai';

if (!process.env.OPENAI_API_KEY) {
  throw new Error('Missing OPENAI_API_KEY environment variable');
}

export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const defaultModel = process.env.AI_MODEL || 'gpt-4-0125-preview';
export const defaultTemperature = parseFloat(process.env.AI_TEMPERATURE || '0.7');
export const defaultMaxTokens = parseInt(process.env.AI_MAX_TOKENS || '4096', 10); 