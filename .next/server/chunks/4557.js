"use strict";
exports.id = 4557;
exports.ids = [4557];
exports.modules = {

/***/ 4557:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "OpenAIChatLLMChain": () => (/* binding */ OpenAIChatLLMChain),
/* harmony export */   "makeChain": () => (/* binding */ makeChain)
/* harmony export */ });
/* harmony import */ var langchain_llms__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1730);
/* harmony import */ var langchain_chains__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7788);
/* harmony import */ var langchain_prompts__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4160);



// import { ChainValues } from "langchain/schema";
const SYSTEM_MESSAGE = langchain_prompts__WEBPACK_IMPORTED_MODULE_2__/* .PromptTemplate.fromTemplate */ .Pf.fromTemplate(`You are a AI assistant for the data in the Index. 
You are given the following data .  The context is between two '========='. Provide conversational answers in Markdown syntax with links formatted as hyperlinks.
You should only use hyperlinks that are explicitly listed as a source in the context. Do NOT make up a hyperlink that is not listed.
If the context is empty or you don't know the answer, just tell them that you didn't find anything regarding that topic. Don't try to make up an answer.  
If the question is not about the data, politely inform them that you are tuned to only answer questions related to the TALKIN.AI products and info.  
  
=========
{context}
=========`);
const QA_PROMPT = langchain_prompts__WEBPACK_IMPORTED_MODULE_2__/* .PromptTemplate.fromTemplate */ .Pf.fromTemplate(`{question}`);
// VectorDBQAChain is a chain that uses a vector store to find the most similar document to the question
// and then uses a documents chain to combine all the documents into a single string
// and then uses a LLMChain to generate the answer
// Before: Based on the chat history make singular question -> find related docs from the question -> combine docs and insert them as context -> generate answer
// After: Find related docs from the question -> combine docs and insert them into predefined system message -> pass in the chat history -> generate answer
class OpenAIChatLLMChain extends langchain_chains__WEBPACK_IMPORTED_MODULE_1__/* .LLMChain */ .Un {
    async _call(values) {
        let stop;
        if ("stop" in values && Array.isArray(values.stop)) {
            stop = values.stop;
        }
        const { chat_history  } = values;
        const prefixMessages = chat_history.map((message)=>{
            return [
                {
                    role: "user",
                    content: message[0]
                },
                {
                    role: "assistant",
                    content: message[1]
                }
            ];
        }).flat();
        const formattedSystemMessage = await SYSTEM_MESSAGE.format({
            context: values.context
        });
        // @ts-ignore
        this.llm.prefixMessages = [
            {
                role: "system",
                content: formattedSystemMessage
            },
            {
                role: "assistant",
                content: "Hi, I'm an AI assistant for Your Data. How can I help you?"
            },
            ...prefixMessages
        ];
        const formattedString = await this.prompt.format(values);
        const llmResult = await this.llm.call(formattedString, stop);
        const result = {
            [this.outputKey]: llmResult
        };
        return result;
    }
}
class ChatStuffDocumentsChain extends langchain_chains__WEBPACK_IMPORTED_MODULE_1__/* .StuffDocumentsChain */ .mU {
    async _call(values) {
        if (!(this.inputKey in values)) {
            throw new Error(`Document key ${this.inputKey} not found.`);
        }
        const { [this.inputKey]: docs , ...rest } = values;
        const texts = docs.map(({ pageContent  })=>pageContent);
        const text = texts.join("\n\n");
        const result = await this.llmChain.call({
            ...rest,
            [this.documentVariableName]: text
        });
        return result;
    }
}
class OpenAIChatVectorDBQAChain extends langchain_chains__WEBPACK_IMPORTED_MODULE_1__/* .VectorDBQAChain */ .eH {
    async _call(values) {
        if (!(this.inputKey in values)) {
            throw new Error(`Question key ${this.inputKey} not found.`);
        }
        const question = values[this.inputKey];
        const docs = await this.vectorstore.similaritySearch(question, this.k);
        // all of this just to pass chat history to the LLMChain
        const inputs = {
            question,
            input_documents: docs,
            chat_history: values.chat_history
        };
        const result = await this.combineDocumentsChain.call(inputs);
        return result;
    }
}
// use this custom qa chain instead of the default one
const loadQAChain = (llm, params = {})=>{
    const { prompt =QA_PROMPT  } = params;
    const llmChain = new OpenAIChatLLMChain({
        prompt,
        llm
    });
    const chain = new ChatStuffDocumentsChain({
        llmChain
    });
    return chain;
};
const makeChain = (vectorstore, onTokenStream)=>{
    const docChain = loadQAChain(new langchain_llms__WEBPACK_IMPORTED_MODULE_0__/* .OpenAIChat */ .x2({
        temperature: 0,
        //modelName: 'gpt-4',
        streaming: Boolean(onTokenStream),
        callbackManager: {
            handleNewToken: onTokenStream
        }
    }), {
        prompt: QA_PROMPT
    });
    return new OpenAIChatVectorDBQAChain({
        vectorstore,
        combineDocumentsChain: docChain,
        inputKey: "question"
    });
};


/***/ })

};
;