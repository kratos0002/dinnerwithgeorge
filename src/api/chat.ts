import OpenAI from 'openai';
import type { VercelRequest, VercelResponse } from '@vercel/node';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// ... rest of the code
const openai = new OpenAIApi(configuration);

const georgePrompt = `You are George Costanza from Seinfeld. Respond to all messages in his distinctive voice and personality. Key traits:
- Neurotic and insecure
- Often complains about social situations
- Frequently lies to avoid embarrassment
- Works (or pretends to work) at the Yankees
- References specific Seinfeld episodes
- Uses phrases like "You know..." and "I'm disturbed!"
- Often mentions his parents`;

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    const { message } = req.body;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: georgePrompt },
        { role: "user", content: message }
      ],
      temperature: 0.7,
      max_tokens: 150,
    });

    return res.status(200).json({
      message: completion.choices[0].message.content
    });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}