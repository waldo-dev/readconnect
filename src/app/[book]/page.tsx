'use client'
import React from 'react'
import { Book } from "../lib/definitions";
import { Image, Button } from "@nextui-org/react";
import axios from 'axios';

export default function Book({ params }: { params: { book: number } }) {
    const [book, setBook] = React.useState<Book>()
    const authors: string[] = book?.authors as unknown as string[];
    const categories: string[] = book?.categories as unknown as string[];

    React.useEffect(() => {
        axios.get(`api/book/get-book?bookId=${params.book}`)
        .then(({data}) => {
            setBook(data.data.rows[0])
        }).catch((err) => {
            console.error(err);
        });
    }, [params]);

    return (
        <div className="container mx-auto flex">
            {
                book ? (
                    <>
                        <div className="basis-1/4 m-2">
                            <Image 
                                src={book.thumbnail_url}
                                alt={'book image'}
                                width={300}
                            />
                            <Button className="m-2" color="primary">
                                Añadir a lista de leídos
                            </Button> 
                            <Button className="m-2" color="primary">
                                Añadir a lista de desearía leer
                            </Button>  
                            rankear
                        </div>
                        <div className=" basis-1/2">
                            <h1 className="text-5xl mt-2">{book.title}</h1>
                            <div className="flex"> 
                                {
                                    authors.map(author => (
                                        <p key={author} className="text-xl mr-2">{author}</p>
                                    ))
                                }
                            </div> 
                            promedios, 
                            <p className="text-xm m-2">{book.long_description}</p>
                            <div className="flex"> 
                                {
                                    categories.map(categorie => (
                                        <p key={categorie} className="text-xl mr-2">{categorie}</p>
                                    ))
                                } 
                            </div>  
                            <p className="text-lg m-2">{book.pageCount}</p> 
                            <p className="text-lg m-2">{book.published_date.$date}</p>
                        </div>
                    </>
                ) : <>Cargando...</> 
            }
        </div>
    )
}
