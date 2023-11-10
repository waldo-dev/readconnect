import { sql } from '@vercel/postgres';
import {v4 as uuidv4} from 'uuid';
const bcrypt = require('bcrypt');

/*
Login
quitar de lista de leidos*
quitar de lista por leer*

Seguir a un usuario
Registro
Buscar un libro
Buscar libros
Evaluar un libro
traer reseñas de un libro
traer evaluaciones de un libro
Reseñar un libro
añadir a lista de leidos
añadir a lista por leer
*/
import {
  Book,
  BookToRead,
  ReadBook,
  Review,
  Evaluation,
  User,
  Following,
} from './definitions';

export async function fetchBooks() {
  try {
    const data = await sql<Book[]>`SELECT * FROM books`;

    return data.rows;
  } catch (error) {
    console.error('Database error:', error);
    throw new Error('Failed to fetch books data.');
  }
}

export async function fetchBookReviews(bookId: number) {
  try {
    const data = await sql<Review[]>`
      SELECT * FROM reviews
      WHERE reviews.book_id ILIKE ${`%${bookId}%`}
    `;

    return data.rows;
  } catch (error) {
    console.error('Database error:', error);
    throw new Error('Failed to fetch book reviews.');
  }
}

export async function fetchBookEvaluations(bookId: number) {
  try {
    const data = await sql<Evaluation[]>`
      SELECT * FROM books WHERE books.id ILIKE ${`%${bookId}%`}
    `;

    return data.rows;
  } catch(err) {
    console.error('Database error:', err);
  }
}

export async function addReview(review: Review) {
  try {
    const reviewId = uuidv4();
    const data = await sql<Review>`
      INSERT INTO reviews (
        id,
        user_id,
        book_id,
        review
      ) VALUES (
        ${`%${reviewId}%`},
        ${`%${review.userId}%`},
        ${`%${review.bookId}%`},
        ${`%${review.review}%`}
      )
    `;
    
    return data.rows;
  } catch(err) {
    console.error('Database error:', err);
  }
}

export async function addReadBook(readBook: ReadBook){
  try {
    const readBookId = uuidv4();
    const data = await sql<ReadBook>`
      INSERT INTO books_read (
        id,
        user_id,
        book_id
      ) VALUES (
        ${`%${readBookId}%`},
        ${`%${readBook.userId}%`},
        ${`%${readBook.bookId}%`},
      )
    `;

    return data.rows
  } catch (error) {
    console.error('Database error:', error);
  }
}

export async function addBookToRead(bookToRead: BookToRead){
  try {
    const bookToReadId = uuidv4();
    const data = await sql<ReadBook>`
      INSERT INTO books_to_read (
        id,
        user_id,
        book_id
      ) VALUES (
        ${`%${bookToReadId}%`},
        ${`%${bookToRead.userId}%`},
        ${`%${bookToRead.bookId}%`},
      )
    `;

    return data.rows
  } catch (err) {
    console.error('Database error:', err)
  }
}

export async function addEvaluation(evaluation: Evaluation) {
  try {
    const evaluationId = uuidv4();
    const data = await sql<Evaluation>`
      INSERT INTO evaluations (
        id,
        user_id,
        book_id
      ) VALUES (
        ${`%${evaluationId}%`},
        ${`%${evaluation.userId}%`},
        ${`%${evaluation.bookId}%`},
      )
    `;

    return data.rows;
  } catch (error) {
    console.error('Database error:', error);
  }
}

export async function fetchABook(bookId: number){
  try {
    const data = await sql<Book>`
      SELECT * FROM books WHERE books.id ILIKE ${`%${bookId}%`}
    `;
    
    return data.rows;   
  } catch (err) {
    console.error(err);
  }
}

export async function registerUser(user:User) {
  try {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    const userId = uuidv4();
    const data = await sql<User>`
      INSERT INTO users (
        id,
        name,
        password,
        email
      ) VALUES (
        ${`%${userId}%`},
        ${`%${user.name}%`},
        ${`%${hashedPassword}%`},
        ${`%${user.email}%`}
      )
    `;

    return data.rows;
  } catch (error) {
    console.error('Database error:', error);
  }
}

export async function addFolllowing(following: Following) {
  try {
    const followingId = uuidv4();
    const data = await sql<Following>`
      INSERT INTO followings (
        id,
        user_id,
        following_user_id
      ) VALUES (
        ${`%${followingId}%`},
        ${`%${following.userId}%`},
        ${`%${following.followingUserId}%`},
      )
    `;

    return data.rows;
  } catch (err) {
    console.error(err);
  }
}
