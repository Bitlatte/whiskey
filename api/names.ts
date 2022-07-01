import { VercelRequest, VercelResponse } from "@vercel/node";
import { Configuration, OpenAIApi } from "openai";

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(config);

const handler = async (req: VercelRequest, res: VercelResponse) => {
  if (req.method === "POST") {
    const { data } = await openai.createCompletion({
      model: "text-davinci-002",
      prompt: `Create a list of ${req.body.quantity} names from these seed words: ${req.body.seeds}`,
      max_tokens: 60,
      temperature: 0.8,
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
    });

    res.status(200).json({ names: data, success: true });
  } else if (req.method === "GET") {
    const { data } = await openai.createCompletion({
      model: "text-davinci-002",
      prompt: `Create a list of 10 names from these seed words: pirate, cove, ship, fleet, oak, tavern, whiskey`,
      max_tokens: 60,
      temperature: 0.8,
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
    });

    res.status(200).json({ names: data, success: true });
  } else {
    res.status(500).json({ success: false });
  }
};

export default handler;
