import { ReadBook } from '@/app/lib/definitions';
import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
import {v4 as uuidv4} from 'uuid';


export async function GET(request:Request){
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('user_id');
    const bookId = searchParams.get('book_id');
    const readBookId = uuidv4();
    const data = await sql<ReadBook>`
      INSERT INTO books_read (
        id,
        user_id,
        book_id
      ) VALUES (
        ${`%${readBookId}%`},
        ${`%${userId}%`},
        ${`%${bookId}%`},
      )
    `;
    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
