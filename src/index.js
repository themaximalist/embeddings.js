import { pipeline } from '@xenova/transformers';

export default async function embeddings(input) {
    let pipe = await pipeline("feature-extraction", "Xenova/all-MiniLM-L6-v2");
    const embedding = await pipe(input, { pooling: "mean", normalize: true });
    return Array.from(embedding.data);
}
