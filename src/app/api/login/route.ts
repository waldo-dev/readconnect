import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
 
export async function GET(request: Request, res: Response) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');
    const password = searchParams.get('password');
    const data = await sql`
      SELECT * FROM users WHERE users.email = ${email}
    `;

    const user = data.rows[0];;

    return NextResponse.json({ user }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
