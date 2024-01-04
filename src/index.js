import local from "./local.js";
import openai from "./openai.js";
import { get, set } from "./cache.js";

const MODEL_LOCAL = "local";
const MODEL_OPENAI = "openai";

export default async function embeddings(input, model = MODEL_LOCAL, cache = true) {

    let embedding = await get(input, model);

    if (cache && embedding) return embedding;

    if (model == MODEL_OPENAI) {
        embedding = await openai(input);
    } else {
        embedding = await local(input);
    }

    if (cache && embedding) {
        await set(input, embedding, model);
    }

    return embedding;
}

// readme