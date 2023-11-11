import { sql } from '@vercel/postgres';
import {v4 as uuidv4} from 'uuid';
const bcrypt = require('bcrypt');

/*
Login
quitar de lista de leidos*
quitar de lista por leer*
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
        ${`%${review.user_id}%`},
        ${`%${review.book_id}%`},
        ${`%${review.review}%`}
      )
    `;
    
    return data.rows;
  } catch(err) {
    console.error('Database error:', err);
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
        ${`%${evaluation.user_id}%`},
        ${`%${evaluation.book_id}%`},
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
      SELECT * FROM books WHERE books.id = ${`${bookId}`}
    `;
    
    return data.rows;   
  } catch (err) {
    console.error(err);
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
        ${`%${following.user_id}%`},
        ${`%${following.following_user_id}%`},
      )
    `;

    return data.rows;
  } catch (err) {
    console.error(err);
  }
}
