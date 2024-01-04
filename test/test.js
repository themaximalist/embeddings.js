import assert from "assert";
import embeddings from "../src/index.js";

describe("Array", function () {
    it("create embedding (local)", async function () {
        this.timeout(10000);
        const embedding = await embeddings("Hello World!");
        assert(embedding);
        assert(embedding.length == 384);
    });

    it("create embedding (openai)", async function () {
        this.timeout(10000);
        const embedding = await embeddings("Hello World!", "openai");
        assert(embedding);
        assert(embedding.length == 1536);
    });
});