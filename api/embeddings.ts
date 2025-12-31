
export const config = {
    runtime: 'edge',
};

export default async function handler(req: Request) {
    if (req.method !== 'POST') {
        return new Response('Method not allowed', { status: 405 });
    }

    try {
        const { text } = await req.json();
        const apiKey = process.env.OPENROUTER_API_KEY;

        if (!apiKey) {
            return new Response(JSON.stringify({ error: 'Server configuration error: Missing API Key' }), {
                status: 500,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        const response = await fetch('https://openrouter.ai/api/v1/embeddings', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json',
                'HTTP-Referer': 'https://fantasy-forge-calculator.vercel.app',
                'X-Title': 'Fantasy Forge Calculator',
            },
            body: JSON.stringify({
                model: 'openai/text-embedding-ada-002',
                input: text.substring(0, 8000), // Token limit safety
            }),
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            return new Response(JSON.stringify({ error: `API Error: ${response.status}`, details: errorData }), {
                status: response.status,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        const data = await response.json();
        return new Response(JSON.stringify(data), {
            headers: { 'Content-Type': 'application/json' },
        });

    } catch (error: any) {
        console.error("Embeddings API Handler Error:", error);
        return new Response(JSON.stringify({ error: 'Internal Server Error', details: error.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
