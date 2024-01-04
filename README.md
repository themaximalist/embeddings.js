# embeddings.js

> simple embeddings for node.js

-   Easy to use text embeddings for Node.js
-   Supports local embeddings with [Xenova/all-MiniLM-L6-v2](https://huggingface.co/Xenova/all-MiniLM-L6-v2)
-   Supports openai embeddings with [text-embedding-ada-002](https://platform.openai.com/docs/guides/embeddings/how-to-get-embeddings)
-   Caches embeddings to `embeddings.cache.json`
-   Use a vector search database (like [vectordb.js](https://github.com/themaximal1st/vectordb.js) to find similar embeddings)



## Installation

```bash
npm install @themaximalist/embeddings.js
```



## Usage

```javascript
import embeddings from "@themaximalist/embeddings.js";

// local
const embedding = await embeddings("Hello World!");
// [ -0.011776604689657688,   0.024298833683133125,  0.0012317118234932423, ... ] // 384 dimension embedding array

// openai
const embedding = await embeddings("Hello World", "openai");
// [ 0.0023471874,  0.00028121442, -0.0022135566, ... ] // 1536 dimension embedding array

// don't cache (on by default)
const embedding = await embeddings("Hello World!", "local", false);
// ...
```

## Configuration

`embeddings.js` works out of the box, but if you use the OpenAI embeddings you'll need an `OPENAI_API_KEY` in your environment.

```bash
export OPENAI_API_KEY=<your-openai-api-key>
```



## About

https://themaximalist.com

https://twitter.com/themaximal1st



## License

MIT
