import OpenAI from "openai";

function createOpenAIAPI() {
    const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
    if (!OPENAI_API_KEY) throw new Error("OPENAI_API_KEY environment variable is required");

    return new OpenAI({
        apiKey: OPENAI_API_KEY,
    });
}

let openai = null;

export default async function embeddings(input, model = "text-embedding-ada-002") {
    if (!input || typeof input !== "string") throw new Error("input must be a string");

    if (!openai) {
        openai = createOpenAIAPI();
    }


    const response = await openai.embeddings.create({ input, model });
    if (!response) throw new Error('No response from OpenAI API');
    if (!response.data) throw new Error('No data in response from OpenAI API');
    if (!response.data) throw new Error('No internal data in response from OpenAI API');
    if (response.data.length !== 1) throw new Error('Expected 1 embedding, got ' + response.data.data.length);
    if (!response.data[0].embedding) throw new Error('No embedding in response from OpenAI API');

    return response.data[0].embedding;
}