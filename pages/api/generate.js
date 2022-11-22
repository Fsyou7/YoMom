import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
  const completion = await openai.createCompletion({
    model: "text-davinci-002",
    prompt: generatePrompt(req.body.animal),
    temperature: 0.7,
    max_tokens: 256,
  });
  res.status(200).json({ result: completion.data.choices[0].text });
}

function generatePrompt(animal) {
  const capitalizedAnimal =
    animal[0].toUpperCase() + animal.slice(1).toLowerCase();
    return `Create an insult for you or your mama. 

    Adjective: ugly
    Insult: Your mama so ugly, goats give her makeup advice
    Adjective: fat
    Insult: Your mama so fat, she warps spacetime
    Adjective: dumb
    Insult: Your mama so dumb, she thought Steph Curry was an Indian dish
  
  Adjective: ${capitalizedAnimal}
  Insult:`;
  
}
