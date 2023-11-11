export type User = {
    id: string | null;
    name: string;
    email: string;
    password: string;
};
  
export type publishedDate = {
    $date: string
};

export type Book = {
    id: number;
    title: string;
    isbn: string;
    pageCount: number;
    published_date: publishedDate;
    thumbnail_url: string;
    status: string;
    authors: string;
    categories: string;
    short_description: string;
    long_description: string;
};
  
export type ReadBook = {
    id: string | null;
    user_id: string;
    book_id: number; 
};

export type BookToRead = {
    id: string | null;
    user_id: string;
    book_id: number;
}

export type Review = {
    id: string | null;
    user_id: string;
    book_id: number;
    review: string;
}

export type Evaluation = {
    id: string | null;
    user_id: string;
    book_id: number;
    evaluation: number;
}

export type Following = {
    id: string | null;
    user_id: string;
    following_user_id: string;
}