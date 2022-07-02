import { VercelRequest, VercelResponse } from "@vercel/node";
import { Configuration, OpenAIApi } from "openai";

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(config);

const promptGenerator = (keywords: string[]) => {
  const prompt = `Generate a list of 15 names by inventing a new word inspired by the keywords.\nKeywords: ${keywords.join(
    ", ",
  )}`;
  return prompt;
};

const handler = async (req: VercelRequest, res: VercelResponse) => {
  if (req.method === "POST") {
    const { data } = await openai.createCompletion({
      model: "text-davinci-002",
      prompt: promptGenerator(req.body.keywords),
      max_tokens: 60,
      temperature: 0.9,
      frequency_penalty: 0.8,
      presence_penalty: 1.4,
    });

    if (data.choices) {
      let text: string | undefined = data.choices[0].text;
      if (typeof text === "string") {
        let names = text.replace(/[^a-zA-Z ]+/g, "").split(" ");
        res.status(200).json({ names: names, success: true });
      }
    }
  } else {
    res.status(500).json({ success: false });
  }
};

export default handler;
