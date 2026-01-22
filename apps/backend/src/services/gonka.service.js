"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.gonkaChat = gonkaChat;
exports.gonkaGetEndpoints = gonkaGetEndpoints;
const gonka_openai_1 = require("gonka-openai");
const GONKA_SOURCE_URL = process.env.GONKA_SOURCE_URL?.replace(/\/$/, '');
const GONKA_PRIVATE_KEY = process.env.GONKA_PRIVATE_KEY;
let clientPromise = null;
let endpointsPromise = null;
async function getClient() {
    if (!clientPromise) {
        clientPromise = (async () => {
            if (!endpointsPromise) {
                endpointsPromise = (0, gonka_openai_1.resolveEndpoints)({
                    sourceUrl: GONKA_SOURCE_URL,
                });
            }
            const endpoints = await endpointsPromise;
            console.log("Gonka endpoints resolved:", endpoints);
            return new gonka_openai_1.GonkaOpenAI({
                apiKey: GONKA_SOURCE_URL,
                gonkaPrivateKey: GONKA_PRIVATE_KEY,
                endpoints,
            });
        })();
    }
    return clientPromise;
}
async function gonkaChat(message, model = 'Qwen/Qwen3-32B-FP8') {
    const client = await getClient();
    try {
        const response = await client.chat.completions.create({
            model,
            messages: [{ role: 'user', content: message }],
        });
        return response;
    }
    catch (error) {
        throw error;
    }
}
async function gonkaGetEndpoints() {
    if (!endpointsPromise) {
        endpointsPromise = (0, gonka_openai_1.resolveEndpoints)({
            sourceUrl: GONKA_SOURCE_URL,
        });
    }
    return endpointsPromise;
}
