## Embeddings.js

<img src="public/logo.png" alt="Embeddings.js — Simple Embeddings library for Node.js" class="logo" />

<div class="badges" style="text-align: center; margin-top: -10px;">
<a href="https://github.com/themaximal1st/embeddings.js"><img alt="GitHub Repo stars" src="https://img.shields.io/github/stars/themaximal1st/embeddings.js"></a>
<a href="https://www.npmjs.com/package/@themaximalist/embeddings.js"><img alt="NPM Downloads" src="https://img.shields.io/npm/dt/%40themaximalist%2Fembeddings.js"></a>
<a href="https://github.com/themaximal1st/embeddings.js"><img alt="GitHub code size in bytes" src="https://img.shields.io/github/languages/code-size/themaximal1st/embeddings.js"></a>
<a href="https://github.com/themaximal1st/embeddings.js"><img alt="GitHub License" src="https://img.shields.io/github/license/themaximal1st/embeddings.js"></a>
</div>
<br />

`Embeddings.js` is a simple way to get text embeddings in Node.js. Embeddings are useful for text similarity search using a [vector database](https://vectordbjs.themaximalist.com/).

```javascript
await embeddings("Hello World!"); // embedding array
```

-   Easy to use
-   Works with any vector database
-   Supports multiple embedding models with the same simple interface
    -   Local with [Xenova/all-MiniLM-L6-v2](https://huggingface.co/Xenova/all-MiniLM-L6-v2)
    -   OpenAI with [text-embedding-ada-002](https://platform.openai.com/docs/guides/embeddings/how-to-get-embeddings)
    -   Mistral with [mistral-embed](https://docs.mistral.ai/platform/client/#embeddings)
-   Caches embeddings
-   MIT license



## Install

```bash
npm install @themaximalist/embeddings.js
```

To use local embeddings, be sure to install the model as well

```bash
npm install @xenova/transformers
```

## Configure

`Embeddings.js` works out of the box with local embeddings, but if you use the OpenAI or Mistral embeddings you'll need an API key in your environment.

```bash
export OPENAI_API_KEY=<your-openai-api-key>
export MISRAL_API_KEY=<your-mistral-api-key>
```



## Usage

Using `Embeddings.js` is as simple as calling a function with any string.

```javascript
import embeddings from "@themaximalist/embeddings.js";

// defaults to local embeddings
const embedding = await embeddings("Hello World!");
// 384 dimension embedding array
```

Switching embedding models is easy:
```javascript
// openai
const embedding = await embeddings("Hello World", {
    service: "openai"
});
// 1536 dimension embedding array

// mistral
const embedding = await embeddings("Hello World", {
    service: "mistral"
})
// 1024 dimension embedding array
```

## Cache
`Embeddings.js` caches by default, but you can disable it by passing `cache: false` as an option.

```javascript
// don't cache (on by default)
const embedding = await embeddings("Hello World!", {
    cache: false
});
```

The cache file is written to `.embeddings.cache.json`—you can also delete this file to reset the cache.

## API

The `Embeddings.js` API is a simple function you call with your text, with an optional config object.


```javascript
await embeddings(
    input, // Text input to compute embeddings
    {
        service: "openai", // Embedding service
        model: "text-embedding-ada-002", // Embedding model
        cache: true, // Cache embeddings
    }
);
```

**Options**

* **`service`** `<string>`: Embedding service provider. Default is `transformers`, a local embedding provider.
* **`model`** `<string>`: Embedding service model. Default is `Xenova/all-MiniLM-L6-v2`, a local embedding model. If no model is provided, it will use the default for the selected `service`.
* **`cache`** `<bool>`: Cache embeddings. Default is `true`.

**Response**

`Embeddings.js` returns a `float[]` — an array of floating-point numbers.

```javascript
[ -0.011776604689657688,   0.024298833683133125,  0.0012317118234932423, ... ]
```

The length of the array is the `dimensions` of the embedding. When performing text similarity, you'll want to know the dimensions of your embeddings to use them in a vector database.

**Dimension Embeddings**

* Local: 384
* OpenAI: 1536
* Mistral: 1024

The `Embeddings.js` API ensures you have a simple way to use embeddings from multiple providers.

## Debug

`Embeddings.js` uses the `debug` npm module with the `embeddings.js` namespace.

View debug logs by setting the `DEBUG` environment variable.

```bash
> DEBUG=embeddings.js*
> node src/get_embeddings.js
# debug logs
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


## License

MIT


## Author

Created by [The Maximalist](https://twitter.com/themaximal1st), see our [open-source projects](https://themaximalist.com/products).

