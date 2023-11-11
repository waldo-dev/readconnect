'use client'
import React from 'react'
import BookCard from "./ui/BookCard";
import axios from 'axios';
import { Book } from './lib/definitions';
import Searcher from './ui/Searcher';

export default function Home() {
  const [books, setBooks] = React.useState<Book[]>([]);
  const [searcherBooks, setSearcherBooks] = React.useState<Book[]>([]);

  React.useEffect(() => {
    axios.get('/api/book/get-books')
    .then(({data}) => {
      setBooks(data.data.rows);
    })
    .catch((error) => {
      console.log(error);
    })
  }, [setBooks]);

  return (
    <main>
      <div className="container mx-auto">
        <div className="flex flex-col gap-4 m-2">
          <Searcher setBooks={setSearcherBooks}/>
        </div>  
        <div className="grid grid-cols-4 gap-4">
          { 
            books.map(book => {
              return (
                <BookCard
                  key={book.id + 'b'}
                  id={book.id}
                  title={book.title} 
                  author={book.authors}
                  categories={book.categories} 
                  thumbnailUrl={book.thumbnail_url}
                  publishedDate={book.published_date} 
                  shortDescription="Java Foundation Classes: Swing Reference is the comprehensive guide to Swing 1.1 and Java 2's Swing package. Written by the programmers that maintain the Internet's Swing FAQ, this book is based on the much enhanced, most recent release of Swing"
                />
              )
            })
          }
        </div>
      </div>
    </main>
  )
}

