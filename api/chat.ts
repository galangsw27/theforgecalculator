
export const config = {
    runtime: 'edge',
};

export default async function handler(req: Request) {
    if (req.method !== 'POST') {
        return new Response('Method not allowed', { status: 405 });
    }

    try {
        const { messages } = await req.json();
        const apiKey = process.env.OPENROUTER_API_KEY;

        if (!apiKey) {
            return new Response(JSON.stringify({ error: 'Server configuration error: Missing API Key' }), {
                status: 500,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${apiKey}`,
                "Content-Type": "application/json",
                "HTTP-Referer": "https://fantasy-forge-calculator.vercel.app", // Replace with your actual domain if known, or keep generic
                "X-Title": "Fantasy Forge Calculator",
            },
            body: JSON.stringify({
                "model": "google/gemini-2.5-flash",
                "messages": messages,
                "stream": true
            })
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            return new Response(JSON.stringify({ error: `API Error: ${response.status}`, details: errorData }), {
                status: response.status,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        // Proxy the stream directly
        return new Response(response.body, {
            headers: {
                'Content-Type': 'text/event-stream',
                'Cache-Control': 'no-cache',
                'Connection': 'keep-alive',
            },
        });

    } catch (error: any) {
        console.error("API Handler Error:", error);
        return new Response(JSON.stringify({ error: 'Internal Server Error', details: error.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
