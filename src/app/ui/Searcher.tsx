'use client';

import React, { Dispatch } from "react";
import { Input } from "@nextui-org/react";
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { Book } from "../lib/definitions";

type SearcherProps = {
  setBooks: Dispatch<React.SetStateAction<Book[]>>;
}

export default function Searcher(props: SearcherProps) {
  const [searcher, setSearcher] = React.useState('');
  const handleOnSubmit = (e: any) => {
    e.preventDefault();
    axios.get(`api/book/search?searcher=${searcher}`)
    .then(({data}) => {
      props.setBooks(data.booksByTitle.rows)
    })
    .catch((err) => {
      console.error(err);
    });
  };

    return (
      <form onSubmit={handleOnSubmit} className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
        <Input onChange={(e) => setSearcher(e.target.value)} type="text" variant={'flat'} label="Searcher" />
      </form>
  );
}