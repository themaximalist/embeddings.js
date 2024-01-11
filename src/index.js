import transformers from "./transformers.js"
import openai from "./openai.js"
import modeldeployer from "./modeldeployer.js"
import { get, set } from "./cache.js"

const DEFAULT_SERVICE = "transformers";
const DEFAULT_MODEL = "Xenova/all-MiniLM-L6-v2";

function parseServiceModel(service = null, model = null) {
    if (!service && !model) { return { service: DEFAULT_SERVICE, model: DEFAULT_MODEL } }

    // guess the service
    if (!service && model) {
        if (model.indexOf("text-embedding-ada-") === 0) {
            return { service: "openai", model }
        } else if (model.indexOf("modeldeployer://") === 0) {
            return { service: "modeldeployer", model }
        }
    }

    // guess the model
    if (service && !model) {
        if (service === "openai") {
            return { service, model: "text-embedding-ada-002" }
        }
    }

    return { service, model }
}

export default async function embeddings(input, options = {}) {
    if (typeof options.cache === "undefined") { options.cache = true }

    const { service, model } = parseServiceModel(options.service, options.model);

    let embedding = await get(input, model);
    if (options.cache && embedding) return embedding;


    if (service === "openai") {
        embedding = await openai(input, options);
    } else if (service === "modeldeployer") {
        embedding = await modeldeployer(input, options);
    } else if (service === "transformers") {
        embedding = await transformers(input, options);
    } else {
        throw new Error("Unknown model: " + model);
    }

    if (options.cache && embedding) {
        await set(input, embedding, model);
    }

    return embedding;
}

// TODO: convert this to service/model, just like LLM
/*
export default async function embeddings(input, options = {}) {




    if (model == MODEL_OPENAI) {
        embedding = await openai(input, options);
    } else if (model == MODEL_MODELDEPLOYER) {
        embedding = await modeldeployer(input, options);
    } else if (model == MODEL_LOCAL) {
        embedding = await local(input, options);
    } else {
        throw new Error("Unknown model: " + model);
    }

    if (cache && embedding) {
        await set(input, embedding, model);
    }

    return embedding;
}
*/

// readme