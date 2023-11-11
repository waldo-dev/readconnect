'use client';

import React from "react";
import {Card, CardHeader, CardBody, Image} from "@nextui-org/react";
import { useRouter } from 'next/navigation'
import { dateFormatter } from "../lib/formatters";
import { publishedDate } from "../lib/definitions";


type BookCardProps = {
    id: number,
    title: string,
    author: string,
    thumbnailUrl: string | null,
    categories: string,
    publishedDate: publishedDate,
    shortDescription: string | null
};

export default function BookCard(props: BookCardProps) {
    const router = useRouter();

    const handleOnClick = React.useCallback(() => router.push(`/${props.id}`)
    , [props.id, router]);

    const categories = props.categories.slice(1, -1);
    const categoriesArray = categories.split('"');

    const authors = props.author.slice(1, -1);
    const authorsArray = authors.split('"');
    
    const publishDate = JSON.parse(props.publishedDate as unknown as string);

    return (
        <Card className="m-2">
            <CardHeader onClick={handleOnClick} className="pb-0 pt-2 px-4 flex-col items-start max-w-xs cursor-pointer">
                <p className="text-tiny uppercase font-bold">{authorsArray}</p>
                <small className="text-base">{categoriesArray}</small>
                <small className="text-sm">{dateFormatter(publishDate.$date)}</small>
                <h4 className="font-bold text-large">{props.title}</h4>
            </CardHeader>
            <CardBody className="overflow-visible py-2">
                <Image
                    alt="Card background"
                    className="object-cover rounded-xl cursor-pointer"
                    src={props.thumbnailUrl ? props.thumbnailUrl : "/images/hero-card-complete.jpeg"}
                    width={100}
                    onClick={handleOnClick}
                />
            </CardBody>
        </Card>
  );
}
