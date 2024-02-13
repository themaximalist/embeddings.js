# embeddings.js

<img src="logo.png" />

<div class="badges" style="text-align: center; margin-top: 0px;">
<img alt="GitHub Repo stars" src="https://img.shields.io/github/stars/themaximal1st/embeddings.js">
<img alt="NPM Downloads" src="https://img.shields.io/npm/dt/%40themaximalist%2Fembeddings.js">
<img alt="GitHub code size in bytes" src="https://img.shields.io/github/languages/code-size/themaximal1st/embeddings.js">
<img alt="GitHub License" src="https://img.shields.io/github/license/themaximal1st/embeddings.js">
</div>
<br />

`Embeddings.js` is a simple way to get text embeddings in Node.js. Embeddings are useful for text similarity search using a [vector database](https://vectordbjs.themaximalist.com/).

```javascript
await embeddings("Hello World!"); // embedding array
```

-   Easy to use text embeddings for Node.js
-   Supports local embeddings with [Xenova/all-MiniLM-L6-v2](https://huggingface.co/Xenova/all-MiniLM-L6-v2)
-   Supports OpenAI embeddings with [text-embedding-ada-002](https://platform.openai.com/docs/guides/embeddings/how-to-get-embeddings)
-   Supports Mistral embeddings with [mistral-embed](https://docs.mistral.ai/platform/client/#embeddings)
-   Caches embeddings to `.embeddings.cache.json`
-   Use a vector search database (like [VectorDB.js](https://github.com/themaximal1st/vectordb.js)) to find similar embeddings
-   MIT license



## Installation

```bash
npm install @themaximalist/embeddings.js
```

To use local embeddings, be sure to install the model as well

```bash
npm install @xenova/transformers
```



## Usage

```javascript
import embeddings from "@themaximalist/embeddings.js";

// local
const embedding = await embeddings("Hello World!");
// [ -0.011776604689657688,   0.024298833683133125,  0.0012317118234932423, ... ] // 384 dimension embedding array

// openai
const embedding = await embeddings("Hello World", { service: "openai"});
// [ 0.0023471874,  0.00028121442, -0.0022135566, ... ] // 1536 dimension embedding array

// mistral
const embedding = await embeddings("Hello World", { service: "mistral" })
// [ -0.00690460205078125, 0.0176239013671875, ... ] // 1024 dimension embedding array

// don't cache (on by default)
const embedding = await embeddings("Hello World!", { model: "Xenova/all-MiniLM-L6-v2", cache: false});
```



## Configuration

`embeddings.js` works out of the box with local embeddings, but if you use the OpenAI or Mistral embeddings you'll need an `OPENAI_API_KEY` or `MISTRAL_API_KEY` in your environment.

```bash
export OPENAI_API_KEY=<your-openai-api-key>
export MISRAL_API_KEY=<your-mistral-api-key>
```



## Vector Database

Embeddings can be used in any vector database like Pinecone, Chroma, PG Vector, etc...

For a local vector database that runs in-memory and uses `Embeddings.js` internally, check out [VectorDB.js](https://vectordbjs.themaximalist.com).



## Projects

`Embeddings.js` is currently used in the following projects:

-   [AI.js](https://aijs.themaximalist.com) — simple AI library
-   [VectorDB.js](https://vectordbjs.themaximalist.com) — local text similarity search
-   [HyperType](https://hypertypelang.com) — knowledge graph toolkit
-   [HyperTyper](https://hypertyper.com) — multidimensional mind mapping




## Author

-   [The Maximalist](https://themaximalist.com/)
-   [@themaximal1st](https://twitter.com/themaximal1st)



## License

MIT
