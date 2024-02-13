import debug from "debug";
const log = debug("embeddings.js:mistral");

const ENDPOINT = "https://api.mistral.ai/v1/embeddings";
const MODEL = "mistral-embed";

export default async function Mistral(input, options = {}) {

    let apiKey = null;
    if (typeof options.apikey === "string") {
        apiKey = options.apikey
    } else {
        apiKey = process.env.MISTRAL_API_KEY;
    }

    // no fallback, either empty apikey string or env, not both
    if (!apiKey) { throw new Error("No Mistral API key provided") }

    const body = {
        model: options.model || MODEL,
        input,
    };

    log(`sending to ${ENDPOINT} with body ${JSON.stringify(body)}`);

    const response = await fetch(options.endpoint || ENDPOINT, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Bearer ${apiKey}`
        },
        body: JSON.stringify(body)
    });

    if (!response.ok) { throw new Error(`HTTP error! status: ${response.status}`) }

    const data = await response.json();
    return data.data[0].embedding;
}


Mistral.defaultModel = MODEL;
