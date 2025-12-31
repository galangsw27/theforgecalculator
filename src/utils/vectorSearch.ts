import { supabase, ForgeDocument } from '../lib/supabaseClient';

/**
 * Generate embedding using Backend API (OpenRouter)
 */
async function generateEmbedding(text: string): Promise<number[] | null> {
    try {
        const response = await fetch('/api/embeddings', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                text: text,
            }),
        });

        if (!response.ok) {
            const error = await response.json().catch(() => ({}));
            console.error('Embedding API error:', error);
            return null;
        }

        const data = await response.json();
        return data.data?.[0]?.embedding || null;
    } catch (error) {
        console.error('Failed to generate embedding:', error);
        return null;
    }
}

/**
 * Search for similar documents using vector similarity
 */
export async function searchVectorDocuments(
    query: string,
    threshold = 0.65,
    limit = 5
): Promise<ForgeDocument[]> {
    if (!supabase) {
        console.warn('Supabase not configured, skipping vector search');
        return [];
    }

    const embedding = await generateEmbedding(query);

    if (!embedding) {
        console.warn('Failed to generate embedding for query');
        return [];
    }

    try {
        const { data, error } = await supabase.rpc('match_forge_documents', {
            query_embedding: embedding,
            match_threshold: threshold,
            match_count: limit,
        });

        if (error) {
            console.error('Vector search error:', error);
            return [];
        }

        return data || [];
    } catch (error) {
        console.error('Vector search failed:', error);
        return [];
    }
}

/**
 * Format vector search results for AI context
 */
export function formatVectorContext(documents: ForgeDocument[]): string {
    if (documents.length === 0) {
        return "No relevant information found in the knowledge base.";
    }

    return documents.map((doc, index) => {
        let context = `[${index + 1}] **${doc.name}** (${doc.type})\n`;
        context += doc.content;
        if (doc.similarity) {
            context += `\n📊 Relevance: ${(doc.similarity * 100).toFixed(1)}%`;
        }
        return context;
    }).join('\n\n---\n\n');
}

/**
 * Check if vector search is available
 */
export function isVectorSearchAvailable(): boolean {
    return !!supabase;
}
