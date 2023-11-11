import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
import {v4 as uuidv4} from 'uuid';
const bcrypt = require('bcrypt');
 
export async function GET(request: Request, res: Response) {
  try {
    const { searchParams } = new URL(request.url);
    const name = searchParams.get('name');
    const email = searchParams.get('email');
    const password = searchParams.get('password');
    const hashedPassword = await bcrypt.hash(password, 10);
    const userId = uuidv4();
    const data = await sql`
      INSERT INTO users (
        id,
        name,
        password,
        email
      ) VALUES (
        ${userId},
        ${name},
        ${hashedPassword},
        ${email}
      )
    `;
    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
