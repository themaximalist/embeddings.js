import fs from "fs";

let cache = {};
const CACHE_FILE = ".embeddings.cache.json";

async function load() {
    if (fs.existsSync(CACHE_FILE)) {
        const data = fs.readFileSync(CACHE_FILE);
        cache = JSON.parse(data);
    }
}

async function save() {
    fs.writeFileSync(CACHE_FILE, JSON.stringify(cache));
}

export async function set(key, value, model) {
    cache[`${key}-${model}`] = value;
    await save();
}

export async function get(key, model) {
    return cache[`${key}-${model}`] || null;
}

load();
