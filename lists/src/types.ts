export type Author = {
    name: string;
    age: number;
    country: string;
    books: string[];
}

export type Book = {
    name: string;
    pages: number;
    title: string;
    price: number;
}

export type Books = {
    books: Book[];
}