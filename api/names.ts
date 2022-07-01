import { VercelRequest, VercelResponse } from "@vercel/node";
import { Configuration, OpenAIApi } from "openai";

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(config);

const handler = async (req: VercelRequest, res: VercelResponse) => {
  const { data } = await openai.createCompletion({
    model: "text-davinci-002",
    prompt: `Create a list of ${req.body.quantity} names from these seed words: ${req.body.seeds}`,
    max_tokens: 60,
    temperature: 0.8,
    top_p: 1.0,
    frequency_penalty: 0.0,
    presence_penalty: 0.0,
  });

  res.status(200).json({ names: data });
};

export default handler;
