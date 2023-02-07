const { Configuration, OpenAIAPI } = require("openai");

const configuration = new Configuration({
    apiKey: process.env.API_KEY,
});

const openai = new OpenAIAPI(configuration);

async function getSuggestions(prompt) {
    const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: prompt,
        temperature: 0.95,
        max_tokens: 3000,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
    });

    const choices = response.data.choices[0].text
    var res = JSON.parse(choices)
  return res
}

export default async function handler(req, res) {
    const { interests, type } = req.body;
    const prompt = `Suggest 10 ${type} gifts for a friend who has interest in ${interests}. Return the result only in array format. The Format :["gift1","gift2","gift3",....,"gift10"].`;

    var choices = await getSuggestions(prompt);
    return res.status(200).json({ data: choices });
}
