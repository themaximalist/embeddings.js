import debug from "debug";
const log = debug("embeddings.js:modeldeployer");

import fetch from "node-fetch"

const ENDPOINT = "http://127.0.0.1:3000/api/v1/embeddings";

export default async function embeddings(input, options = {}) {
    if (!input || typeof input !== "string") throw new Error("input must be a string");

    const apikey = options.model;
    if (!apikey) { throw new Error("No api key provided, ex: modeldeployer://api-key-goes-here") }
    delete options.model;

    const body = { input, options };

    log(`sending to ${ENDPOINT} with body ${JSON.stringify(body)}`);

    const response = await fetch(options.endpoint || ENDPOINT, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "x-api-key": apikey,
        },
        body: JSON.stringify(body)
    });

    if (!response.ok) { throw new Error(`HTTP error! status: ${response.status}`) }

    const payload = await response.json();

    if (!payload) { throw new Error(`No data returned from server`) }
    if (payload.error) { throw new Error(payload.error) }
    if (!payload.ok) { throw new Error(`Invalid data returned from server`) }

    return payload.data;
}