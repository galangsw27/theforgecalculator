-- Supabase Database Setup for Vector Search
-- Run this in Supabase SQL Editor: https://supabase.com/dashboard/project/coeysqecwwlawmgcjjmf/sql

-- 1. Enable pgvector extension
create extension if not exists vector;

-- 2. Create documents table for storing wiki data with embeddings
create table if not exists forge_documents (
    id bigserial primary key,
    name text not null,
    type text not null,  -- 'Ore', 'Weapon', 'Armor', 'Enemy', etc.
    content text not null,  -- Full text content for context
    metadata jsonb,  -- Original JSON data
    embedding vector(1536),  -- OpenAI text-embedding-ada-002 dimension
    created_at timestamp with time zone default now()
);

-- 3. Create index for fast vector similarity search
create index if not exists forge_documents_embedding_idx 
    on forge_documents 
    using ivfflat (embedding vector_cosine_ops)
    with (lists = 100);

-- 4. Create index for type filtering
create index if not exists forge_documents_type_idx 
    on forge_documents (type);

-- 5. Create index for name search
create index if not exists forge_documents_name_idx 
    on forge_documents 
    using gin (to_tsvector('english', name));

-- 6. Function to search documents by vector similarity
create or replace function match_forge_documents (
    query_embedding vector(1536),
    match_threshold float default 0.5,
    match_count int default 5
)
returns table (
    id bigint,
    name text,
    type text,
    content text,
    metadata jsonb,
    similarity float
)
language sql stable
as $$
    select
        forge_documents.id,
        forge_documents.name,
        forge_documents.type,
        forge_documents.content,
        forge_documents.metadata,
        1 - (forge_documents.embedding <=> query_embedding) as similarity
    from forge_documents
    where 1 - (forge_documents.embedding <=> query_embedding) > match_threshold
    order by forge_documents.embedding <=> query_embedding
    limit match_count;
$$;

-- 7. Enable Row Level Security (RLS) for public read access
alter table forge_documents enable row level security;

-- 8. Create policy for public read access
create policy "Allow public read access" 
    on forge_documents 
    for select 
    using (true);

-- Done! Now run the upload script to populate the data.
