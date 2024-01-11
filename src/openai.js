import OpenAI from "openai";

export default async function embeddings(input, options = {}) {
    if (!input || typeof input !== "string") throw new Error("input must be a string");

    const OPENAI_API_KEY = options.apikey || process.env.OPENAI_API_KEY;

    if (!OPENAI_API_KEY) throw new Error("OPENAI_API_KEY environment variable is required");
    const openai = new OpenAI({ apiKey: OPENAI_API_KEY });

    if (typeof options.model === "undefined") { options.model = "text-embedding-ada-002" }
    if (options.model === "openai") { options.model = "text-embedding-ada-002" }
    const model = options.model;

    const response = await openai.embeddings.create({ input, model });
    if (!response) throw new Error('No response from OpenAI API');
    if (!response.data) throw new Error('No data in response from OpenAI API');
    if (!response.data) throw new Error('No internal data in response from OpenAI API');
    if (response.data.length !== 1) throw new Error('Expected 1 embedding, got ' + response.data.data.length);
    if (!response.data[0].embedding) throw new Error('No embedding in response from OpenAI API');

    return response.data[0].embedding;
}