"use strict";
exports.id = 6526;
exports.ids = [6526];
exports.modules = {

/***/ 9044:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "V": () => (/* reexport */ OpenAIEmbeddings)
});

// UNUSED EXPORTS: Embeddings

// EXTERNAL MODULE: external "openai"
var external_openai_ = __webpack_require__(3118);
// EXTERNAL MODULE: external "exponential-backoff"
var external_exponential_backoff_ = __webpack_require__(8537);
// EXTERNAL MODULE: ./node_modules/langchain/dist/util/axios-fetch-adapter.js + 46 modules
var axios_fetch_adapter = __webpack_require__(3234);
// EXTERNAL MODULE: ./node_modules/langchain/dist/util/index.js
var util = __webpack_require__(9600);
;// CONCATENATED MODULE: ./node_modules/langchain/dist/embeddings/base.js
class Embeddings {
}
//# sourceMappingURL=base.js.map
;// CONCATENATED MODULE: ./node_modules/langchain/dist/embeddings/openai.js





class OpenAIEmbeddings extends Embeddings {
    constructor(fields) {
        super();
        Object.defineProperty(this, "modelName", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: "text-embedding-ada-002"
        });
        Object.defineProperty(this, "batchSize", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 20
        });
        Object.defineProperty(this, "maxRetries", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 6
        });
        Object.defineProperty(this, "apiKey", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "client", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        const apiKey = fields?.openAIApiKey ?? process.env.OPENAI_API_KEY;
        if (!apiKey) {
            throw new Error("OpenAI API key not found");
        }
        this.modelName = fields?.modelName ?? this.modelName;
        this.batchSize = fields?.batchSize ?? this.batchSize;
        this.apiKey = apiKey;
        this.maxRetries = fields?.maxRetries ?? this.maxRetries;
    }
    async embedDocuments(texts) {
        const subPrompts = (0,util/* chunkArray */.F3)(texts, this.batchSize);
        const embeddings = [];
        for (let i = 0; i < subPrompts.length; i += 1) {
            const input = subPrompts[i];
            const { data } = await this.embeddingWithRetry({
                model: this.modelName,
                input,
            });
            for (let j = 0; j < input.length; j += 1) {
                embeddings.push(data.data[j].embedding);
            }
        }
        return embeddings;
    }
    async embedQuery(text) {
        const { data } = await this.embeddingWithRetry({
            model: this.modelName,
            input: text,
        });
        return data.data[0].embedding;
    }
    async embeddingWithRetry(request) {
        if (!this.client) {
            const clientConfig = new external_openai_.Configuration({
                apiKey: this.apiKey,
                baseOptions: { adapter: axios_fetch_adapter/* default */.Z },
            });
            this.client = new external_openai_.OpenAIApi(clientConfig);
        }
        const makeCompletionRequest = () => this.client.createEmbedding(request);
        return (0,external_exponential_backoff_.backOff)(makeCompletionRequest, {
            startingDelay: 4,
            maxDelay: 10,
            numOfAttempts: this.maxRetries,
        });
    }
}
//# sourceMappingURL=openai.js.map
;// CONCATENATED MODULE: ./node_modules/langchain/dist/embeddings/index.js


//# sourceMappingURL=index.js.map
;// CONCATENATED MODULE: ./node_modules/langchain/embeddings.js


/***/ }),

/***/ 5337:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "FI": () => (/* reexport */ HNSWLib)
});

// UNUSED EXPORTS: Chroma, PineconeStore, SaveableVectorStore, VectorStore

// EXTERNAL MODULE: external "fs/promises"
var promises_ = __webpack_require__(3292);
// EXTERNAL MODULE: external "path"
var external_path_ = __webpack_require__(1017);
;// CONCATENATED MODULE: ./node_modules/langchain/dist/vectorstores/base.js
class base_VectorStore {
    constructor(embeddings) {
        Object.defineProperty(this, "embeddings", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.embeddings = embeddings;
    }
    async similaritySearch(query, k = 4) {
        const results = await this.similaritySearchVectorWithScore(await this.embeddings.embedQuery(query), k);
        return results.map((result) => result[0]);
    }
    async similaritySearchWithScore(query, k = 4) {
        return this.similaritySearchVectorWithScore(await this.embeddings.embedQuery(query), k);
    }
}
class SaveableVectorStore extends base_VectorStore {
    static load(_directory, _embeddings) {
        throw new Error("Not implemented");
    }
}
//# sourceMappingURL=base.js.map
// EXTERNAL MODULE: ./node_modules/langchain/dist/document.js
var dist_document = __webpack_require__(1549);
;// CONCATENATED MODULE: ./node_modules/langchain/dist/docstore/base.js
class Docstore {
}
//# sourceMappingURL=base.js.map
;// CONCATENATED MODULE: ./node_modules/langchain/dist/docstore/in_memory.js

class InMemoryDocstore extends Docstore {
    constructor(docs) {
        super();
        Object.defineProperty(this, "_docs", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this._docs = docs ?? new Map();
    }
    /** Method for getting count of documents in _docs */
    get count() {
        return this._docs.size;
    }
    search(search) {
        return this._docs.get(search) ?? `ID ${search} not found.`;
    }
    add(texts) {
        const keys = [...this._docs.keys()];
        const overlapping = Object.keys(texts).filter((x) => keys.includes(x));
        if (overlapping.length > 0) {
            throw new Error(`Tried to add ids that already exist: ${overlapping}`);
        }
        for (const [key, value] of Object.entries(texts)) {
            this._docs.set(key, value);
        }
    }
}
//# sourceMappingURL=in_memory.js.map
;// CONCATENATED MODULE: ./node_modules/langchain/dist/vectorstores/hnswlib.js





class HNSWLib extends SaveableVectorStore {
    constructor(args, embeddings, docstore, index) {
        super(embeddings);
        Object.defineProperty(this, "_index", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "docstore", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "args", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this._index = index;
        this.args = args;
        this.embeddings = embeddings;
        this.docstore = docstore;
    }
    async addDocuments(documents) {
        const texts = documents.map(({ pageContent }) => pageContent);
        return this.addVectors(await this.embeddings.embedDocuments(texts), documents);
    }
    static async getHierarchicalNSW(args) {
        const { HierarchicalNSW } = await HNSWLib.imports();
        if (!args.space) {
            throw new Error("hnswlib-node requires a space argument");
        }
        if (args.numDimensions === undefined) {
            throw new Error("hnswlib-node requires a numDimensions argument");
        }
        return new HierarchicalNSW(args.space, args.numDimensions);
    }
    async initIndex(vectors) {
        if (!this._index) {
            if (this.args.numDimensions === undefined) {
                this.args.numDimensions = vectors[0].length;
            }
            this.index = await HNSWLib.getHierarchicalNSW(this.args);
        }
        if (!this.index.getCurrentCount()) {
            this.index.initIndex(vectors.length);
        }
    }
    get index() {
        if (!this._index) {
            throw new Error("Vector store not initialised yet. Try calling `addTexts` first.");
        }
        return this._index;
    }
    set index(index) {
        this._index = index;
    }
    async addVectors(vectors, documents) {
        if (vectors.length === 0) {
            return;
        }
        await this.initIndex(vectors);
        // TODO here we could optionally normalise the vectors to unit length
        // so that dot product is equivalent to cosine similarity, like this
        // https://github.com/nmslib/hnswlib/issues/384#issuecomment-1155737730
        // While we only support OpenAI embeddings this isn't necessary
        if (vectors.length !== documents.length) {
            throw new Error(`Vectors and metadatas must have the same length`);
        }
        if (vectors[0].length !== this.args.numDimensions) {
            throw new Error(`Vectors must have the same length as the number of dimensions (${this.args.numDimensions})`);
        }
        const capacity = this.index.getMaxElements();
        const needed = this.index.getCurrentCount() + vectors.length;
        if (needed > capacity) {
            this.index.resizeIndex(needed);
        }
        const docstoreSize = this.docstore.count;
        for (let i = 0; i < vectors.length; i += 1) {
            this.index.addPoint(vectors[i], docstoreSize + i);
            this.docstore.add({ [docstoreSize + i]: documents[i] });
        }
    }
    async similaritySearchVectorWithScore(query, k) {
        if (query.length !== this.args.numDimensions) {
            throw new Error(`Query vector must have the same length as the number of dimensions (${this.args.numDimensions})`);
        }
        if (k > this.index.getCurrentCount()) {
            const total = this.index.getCurrentCount();
            console.warn(`k (${k}) is greater than the number of elements in the index (${total}), setting k to ${total}`);
            // eslint-disable-next-line no-param-reassign
            k = total;
        }
        const result = this.index.searchKnn(query, k);
        return result.neighbors.map((docIndex, resultIndex) => [
            this.docstore.search(String(docIndex)),
            result.distances[resultIndex],
        ]);
    }
    async save(directory) {
        await promises_.mkdir(directory, { recursive: true });
        await Promise.all([
            this.index.writeIndex(external_path_.join(directory, "hnswlib.index")),
            await promises_.writeFile(external_path_.join(directory, "args.json"), JSON.stringify(this.args)),
            await promises_.writeFile(external_path_.join(directory, "docstore.json"), JSON.stringify(Array.from(this.docstore._docs.entries()))),
        ]);
    }
    static async load(directory, embeddings) {
        const args = JSON.parse(await promises_.readFile(external_path_.join(directory, "args.json"), "utf8"));
        const index = await HNSWLib.getHierarchicalNSW(args);
        const [docstoreFiles] = await Promise.all([
            promises_.readFile(external_path_.join(directory, "docstore.json"), "utf8")
                .then(JSON.parse),
            index.readIndex(external_path_.join(directory, "hnswlib.index")),
        ]);
        const docstore = new InMemoryDocstore(new Map(docstoreFiles));
        return new HNSWLib(args, embeddings, docstore, index);
    }
    static async fromTexts(texts, metadatas, embeddings, docstore = new InMemoryDocstore()) {
        const docs = [];
        for (let i = 0; i < texts.length; i += 1) {
            const newDoc = new dist_document/* Document */.B({
                pageContent: texts[i],
                metadata: metadatas[i],
            });
            docs.push(newDoc);
        }
        return HNSWLib.fromDocuments(docs, embeddings, docstore);
    }
    static async fromDocuments(docs, embeddings, docstore = new InMemoryDocstore()) {
        const args = {
            space: "ip", // dot product
        };
        const instance = new this(args, embeddings, docstore);
        await instance.addDocuments(docs);
        return instance;
    }
    static async imports() {
        try {
            const { default: { HierarchicalNSW }, } = await Promise.resolve(/* import() */).then(__webpack_require__.t.bind(__webpack_require__, 7571, 19));
            return { HierarchicalNSW };
        }
        catch (err) {
            throw new Error("Please install hnswlib-node as a dependency with, e.g. `npm install -S hnswlib-node`");
        }
    }
}
//# sourceMappingURL=hnswlib.js.map
;// CONCATENATED MODULE: ./node_modules/langchain/dist/vectorstores/chroma.js



let ChromaClient = null;
try {
    // eslint-disable-next-line global-require,import/no-extraneous-dependencies
    ({ ChromaClient } = require("chromadb"));
}
catch {
    // ignore error
}
class Chroma extends (/* unused pure expression or super */ null && (VectorStore)) {
    constructor(args, embeddings, index) {
        super(embeddings);
        Object.defineProperty(this, "index", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "args", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "collectionName", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "url", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.index = index;
        this.args = args;
        this.embeddings = embeddings;
        this.collectionName = ensureCollectionName(args.collectionName);
        this.url = args.url || "http://localhost:8000";
    }
    async addDocuments(documents) {
        const texts = documents.map(({ pageContent }) => pageContent);
        await this.addVectors(await this.embeddings.embedDocuments(texts), documents);
    }
    async addVectors(vectors, documents) {
        if (vectors.length === 0) {
            return;
        }
        if (!this.index) {
            if (this.args.numDimensions === undefined) {
                this.args.numDimensions = vectors[0].length;
            }
            if (ChromaClient === null) {
                throw new Error("Please install chromadb as a dependency with, e.g. `npm install -S chromadb`");
            }
            this.index = new ChromaClient(this.url);
            try {
                await this.index.createCollection(this.collectionName);
            }
            catch {
                // ignore error
            }
        }
        if (vectors.length !== documents.length) {
            throw new Error(`Vectors and metadatas must have the same length`);
        }
        if (vectors[0].length !== this.args.numDimensions) {
            throw new Error(`Vectors must have the same length as the number of dimensions (${this.args.numDimensions})`);
        }
        const collection = await this.index.getCollection(this.collectionName);
        const docstoreSize = await collection.count();
        await collection.add(Array.from({ length: vectors.length }, (_, i) => (docstoreSize + i).toString()), vectors, documents.map(({ metadata }) => metadata), documents.map(({ pageContent }) => pageContent));
    }
    async similaritySearchVectorWithScore(query, k) {
        if (!this.index) {
            throw new Error("Vector store not initialised yet. Try calling `addTexts` first.");
        }
        const collection = await this.index.getCollection(this.collectionName);
        // similaritySearchVectorWithScore supports one query vector at a time
        // chroma supports multiple query vectors at a time
        const result = await collection.query(query, k);
        const { ids, distances, documents, metadatas } = result;
        // get the result data from the first and only query vector
        const [firstIds] = ids;
        const [firstDistances] = distances;
        const [firstDocuments] = documents;
        const [firstMetadatas] = metadatas;
        const results = [];
        for (let i = 0; i < firstIds.length; i += 1) {
            results.push([
                new Document({
                    pageContent: firstDocuments[i],
                    metadata: firstMetadatas[i],
                }),
                firstDistances[i],
            ]);
        }
        return results;
    }
    static async fromTexts(texts, metadatas, embeddings, collectionName, url) {
        const docs = [];
        for (let i = 0; i < texts.length; i += 1) {
            const newDoc = new Document({
                pageContent: texts[i],
                metadata: metadatas[i],
            });
            docs.push(newDoc);
        }
        return Chroma.fromDocuments(docs, embeddings, collectionName, url);
    }
    static async fromDocuments(docs, embeddings, collectionName, url) {
        if (ChromaClient === null) {
            throw new Error("Please install chromadb as a dependency with, e.g. `npm install -S chromadb`");
        }
        const args = {
            collectionName,
            url,
        };
        const instance = new this(args, embeddings);
        await instance.addDocuments(docs);
        return instance;
    }
}
function ensureCollectionName(collectionName) {
    if (!collectionName) {
        return `langchain-${uuidv4()}`;
    }
    return collectionName;
}
//# sourceMappingURL=chroma.js.map
;// CONCATENATED MODULE: ./node_modules/langchain/dist/vectorstores/index.js




//# sourceMappingURL=index.js.map
;// CONCATENATED MODULE: ./node_modules/langchain/vectorstores.js


/***/ })

};
;