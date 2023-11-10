export type User = {
    id: string | null;
    name: string;
    email: string;
    password: string;
};
  
type publishedDate = {
    $date: string
}
export type Book = {
    id: number | null;
    title: string;
    isbn: string;
    pageCount: number;
    publishedDate: publishedDate;
    thumbnailUrl: string;
    status: string;
    authors: string[];
    categories: string[];
    shortDescription: string;
    longDescription: string;
};
  
export type ReadBook = {
    id: string | null;
    userId: string;
    bookId: number; 
};

export type BookToRead = {
    id: string | null;
    userId: string;
    bookId: number;
}

export type Review = {
    id: string | null;
    userId: string;
    bookId: number;
    review: string;
}

export type Evaluation = {
    id: string | null;
    userId: string;
    bookId: number;
    evaluation: number;
}

export type Following = {
    id: string | null;
    userId: string;
    followingUserId: string;
}