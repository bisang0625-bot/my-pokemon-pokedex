import fs from 'fs';
import path from 'path';

async function listModelsRaw() {
    try {
        const envPath = path.resolve(process.cwd(), '.env');
        const envContent = fs.readFileSync(envPath, 'utf8');
        const match = envContent.match(/VITE_GEMINI_API_KEY=(.*)/);

        if (!match) {
            console.error("API Key not found in .env");
            return;
        }

        const apiKey = match[1].trim();
        console.log(`Checking models for API Key: ${apiKey.substring(0, 4)}... (Length: ${apiKey.length})`);

        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`);

        if (!response.ok) {
            console.error(`HTTP Error: ${response.status} ${response.statusText}`);
            const text = await response.text();
            console.error("Response body:", text);
            return;
        }

        const data = await response.json();

        if (!data.models) {
            console.log("No models found in response.");
            console.log(JSON.stringify(data, null, 2));
            return;
        }

        console.log(`Found ${data.models.length} models:`);
        data.models.forEach(m => {
            console.log(`- ${m.name} (${m.displayName}): ${m.supportedGenerationMethods.join(', ')}`);
        });

    } catch (error) {
        console.error("Script error:", error);
    }
}

listModelsRaw();
