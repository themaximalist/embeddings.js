import fs from "fs";

const CACHE_FILE = ".embeddings.cache.json";

export default class Cache {
    constructor(cache_file = CACHE_FILE) {
        this.cache = {};
        this.cache_file = cache_file;
    }
    async load() {
        if (fs.existsSync(this.cache_file)) {
            const data = fs.readFileSync(this.cache_file, "utf8");
            this.cache = JSON.parse(data);
        }
    }

    async save() {
        fs.writeFileSync(this.cache_file, JSON.stringify(this.cache));
    }

    async set(key, value, model) {
        this.cache[`${key}-${model}`] = value;
        await this.save();
    }

    async get(key, model) {
        return this.cache[`${key}-${model}`] || null;
    }
}
