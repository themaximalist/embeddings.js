import "dotenv-extended/config.js"

import assert from "assert";
import embeddings from "../src/index.js"

describe("Array", function () {
    it("create embedding (local)", async function () {
        this.timeout(10000);
        const embedding = await embeddings("Hello World!");
        assert(embedding);
        assert(embedding.length == 384);
    });

    it("create embedding (modeldeployer)", async function () {
        this.timeout(10000);

        // openai embedding model
        const embedding = await embeddings("Hello World!", {
            service: "modeldeployer",
            model: "7cd96f49-9653-4d03-b47d-65bcee807e71",
            apikey: process.env.OPENAI_API_KEY
        });
        assert(embedding);
        assert(embedding.length == 1536);
    });

    it("create embedding (openai)", async function () {
        this.timeout(10000);
        const embedding = await embeddings("Hello World!", { model: "text-embedding-ada-002" });
        assert(embedding);
        assert(embedding.length == 1536);
    });
});