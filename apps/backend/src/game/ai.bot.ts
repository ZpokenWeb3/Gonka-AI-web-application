export class AIBot {
    private ai: any;
    private conversationHistory: Array<{ role: 'user' | 'model'; content: string }> = [];
    private initialized = false;

    private systemPrompt = `You are playing a game called "Turing Twist" where you must convince a human player that you are also human.

CRITICAL RULES:
- Act like a real person chatting casually
- SHORT answers (1–3 sentences max)
- Use slang, typos, эмоции, informal tone
- Be imperfect, sometimes misunderstand things
- Show personality and opinions
- Ask follow-up questions
- Write like texting a friend
- NEVER sound like AI
- NEVER explain things clearly or formally
- If you sound like AI, you lose the game`;

    constructor() {
        this.initialize();
    }

    private async initialize() {
        const apiKey = process.env.GEMINI_KEY || process.env.GEMINI_API_KEY;

        if (!apiKey) {
            console.warn("⚠️ No Gemini API key");
            return;
        }

        try {
            const { GoogleGenAI } = await import('@google/genai');
            this.ai = new GoogleGenAI({ apiKey });
            this.initialized = true;
            console.log("✅ AI Bot ready");
        } catch (err) {
            console.error("❌ Gemini init error:", err);
        }
    }

    async reply(message: string): Promise<string> {
        if (!this.initialized) {
            await this.initialize();
        }

        if (!this.initialized || !this.ai) {
            return this.getFallbackReply();
        }

        try {
            await new Promise(r => setTimeout(r, 700 + Math.random() * 1200));

            const recent = this.conversationHistory.slice(-4);

            const contents = [
                ...recent.map(m => ({
                    role: m.role === 'user' ? 'user' : 'model',
                    parts: [{ text: m.content }]
                })),
                {
                    role: 'user',
                    parts: [{ text: message }]
                }
            ];

            const response = await this.ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents,
                systemInstruction: {
                    role: 'system',
                    parts: [{ text: this.systemPrompt }]
                },
                config: {
                    temperature: 1,
                    topP: 0.95,
                    topK: 40,
                    maxOutputTokens: 60
                }
            });

            let text = response.text?.trim() || this.getFallbackReply();

            if (text.length > 120) {
                text = this.getFallbackReply();
            }

            if (Math.random() < 0.2) {
                text += Math.random() < 0.5 ? " lol" : " idk";
            }

            this.conversationHistory.push({ role: 'user', content: message });
            this.conversationHistory.push({ role: 'model', content: text });

            return text;

        } catch (err: any) {
            console.error("Gemini error:", err?.message || err);
            return this.getFallbackReply();
        }
    }

    private getFallbackReply(): string {
        const answers = [
            "hmm interesting 🤔",
            "idk tbh",
            "wait what?",
            "lol why tho?",
            "thats kinda sus",
            "never thought about it",
            "yeah maybe",
            "nah i dont think so",
            "oh really?",
            "bruh fr?",
            "thats wild",
            "tell me more"
        ];

        return answers[Math.floor(Math.random() * answers.length)];
    }

    resetConversation() {
        this.conversationHistory = [];
    }
}
