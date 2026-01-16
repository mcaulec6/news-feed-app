export type Article = {
    id: string;
    title: string;
    author: string | null;
    description: string | null;
    url: string;
    urlToImage: string | null;
    publishedAt: string;
    sourceName: string;
};