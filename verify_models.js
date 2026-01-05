import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from 'fs';
import path from 'path';

async function listModels() {
    try {
        const envPath = path.resolve(process.cwd(), '.env');
        const envContent = fs.readFileSync(envPath, 'utf8');
        const match = envContent.match(/VITE_GEMINI_API_KEY=(.*)/);

        if (!match) {
            console.error("API Key not found in .env");
            return;
        }

        const apiKey = match[1].trim();
        console.log(`Current API Key in .env: ${apiKey.substring(0, 4)}...${apiKey.substring(apiKey.length - 4)} (Length: ${apiKey.length})`);
        const genAI = new GoogleGenerativeAI(apiKey);

        const modelsToTest = [
            "gemini-2.0-flash",
            "gemini-2.0-flash-lite",
            "gemini-2.5-flash-lite",
            "gemini-flash-latest",
            "gemini-2.5-flash"
        ];

        console.log("Testing model availability...");

        for (const modelName of modelsToTest) {
            try {
                const model = genAI.getGenerativeModel({ model: modelName });
                const result = await model.generateContent("Hello");
                console.log(`✅ ${modelName}: Available`);
            } catch (error) {
                if (error.message.includes('404')) {
                    console.log(`❌ ${modelName}: Not Found (404)`);
                } else if (error.message.includes('429')) {
                    console.log(`⚠️ ${modelName}: Rate Limited (429) - Exists but quota exceeded`);
                } else {
                    console.log(`❓ ${modelName}: Error ${error.message}`);
                }
            }
        }

    } catch (error) {
        console.error("Script error:", error);
    }
}

listModels();
