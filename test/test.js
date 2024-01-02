import assert from "assert";
import embeddings from "../src/index.js";

describe("Array", function () {
    it("create embedding", async function () {
        this.timeout(10000);
        const embedding = await embeddings("Hello World!");
        assert(embedding);
        assert(embedding.length == 384);
    });
});