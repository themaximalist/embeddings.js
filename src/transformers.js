const MODEL = "Xenova/all-MiniLM-L6-v2";

export default async function embeddings(input, options = {}) {
    const { pipeline } = await import("@xenova/transformers");

    let pipe = await pipeline("feature-extraction", options.model || MODEL);

    const embedding = await pipe(input, { pooling: "mean", normalize: true });
    return Array.from(embedding.data);
}