import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
 
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const searcher = searchParams.get('searcher');
    const booksByTitle = await sql`
    SELECT * FROM books WHERE books.title ILIKE ${searcher + '%'}`;
    
    //const booksByCategories = await sql`
    //  SELECT * FROM books WHERE books.categories ILIKE ${searcher + '%'}
    //`

   
    return NextResponse.json({ booksByTitle }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}