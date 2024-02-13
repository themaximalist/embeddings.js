import debug from "debug";
const log = debug("embeddings.js");

import transformers from "./transformers.js"
import openai from "./openai.js"
import modeldeployer from "./modeldeployer.js"
import Mistral from "./mistral.js"
import Cache from "./cache.js"

export default function Embeddings(arg1, arg2) {

    // function call
    if (!(this instanceof Embeddings)) {
        return new Promise(async (resolve, reject) => {
            const embeddings = new Embeddings(arg2);
            try {
                resolve(await embeddings.fetch(arg1));
            } catch (e) {
                reject(e);
            }
        });
    }

    this.options = arg1 || {};
    if (typeof this.options.cache === "undefined") { this.options.cache = true; }

    this.cache = null;

    const { service, model } = Embeddings.parseServiceModel(this.options.service, this.options.model);
    this.service = service;
    this.model = model;
}

Embeddings.prototype.fetch = async function (input) {
    if (this.options.cache && !this.cache) {
        this.cache = new Cache(this.options.cache_file);
        await this.cache.load();
    }


    let embedding = await this.cache.get(input, this.model);
    if (this.options.cache && embedding) {
        log(`found cached embedding for ${this.service}/${this.model}`);
        return embedding;
    }

    log(`fetching embedding from ${this.service}/${this.model} with ${JSON.stringify(this.options)}`);

    if (this.service === "openai") {
        embedding = await openai(input, this.options);
    } else if (this.service === "modeldeployer") {
        embedding = await modeldeployer(input, Object.assign({}, this.options, { model: this.model }));
    } else if (this.service === "transformers") {
        embedding = await transformers(input, this.options);
    } else if (this.service === "mistral") {
        embedding = await Mistral(input, Object.assign({}, this.options, { model: this.model }));
    } else {
        throw new Error("Unknown model: " + this.model);
    }

    if (this.options.cache && embedding) {
        await this.cache.set(input, embedding, this.model);
    }

    return embedding;
}

Embeddings.parseServiceModel = function (service = null, model = null) {
    if (!service && !model) { return { service: Embeddings.defaultService, model: Embeddings.defaultModel } }

    // guess the service
    if (!service && model) {
        if (model.indexOf("text-embedding-ada-") === 0) {
            return { service: "openai", model }
        } else if (model.indexOf("mistral-") === 0) {
            return { service: "mistral", model }
        } else if (model.indexOf("modeldeployer://") === 0) {
            return { service: "modeldeployer", model }
        }
    }

    // guess the model
    if (service && !model) {
        if (service === "openai") {
            return { service, model: "text-embedding-ada-002" }
        } else if (service === "mistral") {
            return { service, model: "mistral-embed" }
        }
    }

    return { service, model }
}

Embeddings.defaultService = "transformers";
Embeddings.defaultModel = "Xenova/all-MiniLM-L6-v2";
