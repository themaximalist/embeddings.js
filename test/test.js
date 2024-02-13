import "dotenv-extended/config.js"

import assert from "assert";
import Embeddings from "../src/index.js"

describe("Array", function () {
    it("create embedding (local)", async function () {
        this.timeout(10000);
        const embedding = await Embeddings("Hello World!");
        assert(embedding);
        assert(embedding.length == 384);
    });

    it("create embedding (modeldeployer)", async function () {
        this.timeout(10000);

        // remote openai embedding model
        const embedding = await Embeddings("Hello World!", {
            endpoint: process.env.MODELDEPLOYER_ENDPOINT,
            service: "modeldeployer",
            model: process.env.MODELDEPLOYER_API_KEY,
            apikey: process.env.OPENAI_API_KEY
        });
        assert(embedding);
        assert(embedding.length == 1536);
    });

    it("create embedding (openai)", async function () {
        this.timeout(10000);
        const embedding = await Embeddings("Hello World!", { model: "text-embedding-ada-002" });
        assert(embedding);
        assert(embedding.length == 1536);
    });

    it("embedding object (local)", async function () {
        this.timeout(10000);
        const embeddings = new Embeddings({
            cache_file: ".embeddings.cache2.json"
        });
        const embedding = await embeddings.fetch("Hello World!");
        assert(embedding);
        assert(embedding.length == 384);
    });

    it("create embedding (mistral)", async function () {
        this.timeout(10000);
        const embedding = await Embeddings("Hello World!", { model: "mistral-embed" });
        assert(embedding);
        assert(embedding.length == 1024);
    });
});