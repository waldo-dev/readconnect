const { db } = require('@vercel/postgres');
const {
  users,
  books,
  readBooks,
  evaluations,
  following,
  booksToRead,
  reviews
} = require('../src/app/lib/data-seed.js');
const bcrypt = require('bcrypt');

async function seedUsers(client) {
  try {
    
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS users (
        id UUID  PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL,
        profile_image_url TEXT
      );
    `;

    console.log(`Created "users" table`);

    const insertedUsers = await Promise.all(
      users.map(async (user) => {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        return client.sql`
        INSERT INTO users (id, name, email, password)
        VALUES (${user.id}, ${user.name}, ${user.email}, ${hashedPassword})
        ON CONFLICT (id) DO NOTHING;
      `;
      }),
    );

    console.log(`Seeded ${insertedUsers.length} users`);

    return {
      createTable,
      users: insertedUsers,
    };
  } catch (error) {
    console.error('Error seeding users:', error);
    throw error;
  }
}

async function seedBooks(client) {
  try {
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS books (
        id INT PRIMARY KEY,
        title VARCHAR NOT NULL,
        isbn VARCHAR,
        page_count INT NOT NULL,
        published_date VARCHAR NOT NULL,
        thumbnail_url VARCHAR NOT NULL,
        status VARCHAR,
        authors TEXT [] NOT NULL,
        categories TEXT [] NOT NULL,
        evaluation_count INT,
        evaluation_average INT,
        short_description TEXT,
        long_description TEXT
      );
    `;

    console.log(`Created "books" table`);

    const insertedBooks = await Promise.all(
      books.map(
        async (book) => client.sql`
        INSERT INTO books (
          id, 
          title, 
          isbn, 
          page_count, 
          published_date, 
          thumbnail_url, 
          status, 
          authors, 
          categories, 
          evaluation_count, 
          evaluation_average, 
          short_description, 
          long_description
          )
        VALUES (
          ${book.id}, 
          ${book.title}, 
          ${book.isbn}, 
          ${book.pageCount}, 
          ${book.publishedDate}, 
          ${book.thumbnailUrl}, 
          ${book.status}, 
          ${book.authors}, 
          ${book.categories}, 
          ${book.evaluationCount},
          ${book.evaluationAverage},
          ${book.shortDescription},
          ${book.longDescription}
        )
        ON CONFLICT (id) DO NOTHING;
      `,
      ),
    );

    console.log(`Seeded ${insertedBooks.length} books`);

    return {
      createTable,
      books: insertedBooks,
    };
  } catch (error) {
    console.error('Error seeding books:', error);
    throw error;
  }
}

async function seedBooksRead(client) {
  try {
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS books_read (
        id UUID PRIMARY KEY,
        user_id UUID NOT NULL,
        book_id INT NOT NULL
      );
    `;

    console.log(`Created "booksRead" table`);

    const insertedBooksRead = await Promise.all(
      readBooks.map(
        async (bookRead) => client.sql`
        INSERT INTO books_read ( id, user_id, book_id )
        VALUES ( ${bookRead.id}, ${bookRead.userId}, ${bookRead.bookId} )
        ON CONFLICT (id) DO NOTHING;
      `,
      ),
    );

    console.log(`Seeded ${insertedBooksRead.length} read books`);
  
    return {
      createTable,
      bocksRead: insertedBooksRead,
    };
  } catch (error) {
    console.error('Error seeding booksRead:', error);
    throw error;
  }
}


async function seedBookToRead(client) {
  try { 
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS books_to_read (
        id TEXT NOT NULL UNIQUE,
        user_id UUID NOT NULL,
        book_id INT NOT NULL
      );
    `;

    console.log(`Created "books_to_read" table`);

    const insertedBookToRead = await Promise.all(
      booksToRead.map(
        async (book) => client.sql`
          INSERT INTO books_to_read ( id, user_id, book_id )
          VALUES ( ${book.id}, ${book.userId}, ${book.bookId} )
          ON CONFLICT (id) DO NOTHING;
        `,
      ),
    );

    console.log(`Seeded ${insertedBookToRead.length} book to read`);

    return {
      createTable,
     booksToRead: insertedBookToRead,
    };
  } catch (error) {
    console.error('Error seeding books to read:', error);
    throw error;
  }
}

async function seedReview(client) {
  try {
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS reviews (
        id UUID NOT NULL UNIQUE,
        user_id UUID NOT NULL,
        book_id INT NOT NULL,
        review TEXT NOT NULL
      );
    `;
    console.log(`Created "reviews" table`);

    const insertedReview = await Promise.all(
      reviews.map(async (review) => client.sql`
        INSERT INTO reviews (id, user_id, book_id, review)
        VALUES (${review.id}, ${review.userId}, ${review.bookId}, ${review.review})
        ON CONFLICT (id) DO NOTHING;  
      `,
      ),
    );
    
    console.log(`Seeded ${insertedReview.length} reviews`);

    return {
      createTable,
      reviews: insertedReview,
    }
  } catch (err) {
    console.error('Error seeding review:', err);
    throw err;
  }
} 

async function seedEvaluation(client) {
  try {
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS evaluations (
        id UUID NOT NULL UNIQUE,
        user_id UUID NOT NULL,
        book_id INT NOT NULL,
        evaluation INT NOT NULL
      );
    `;

    console.log(`Created "evaluations" table`);

    const insertedEvaluations = await Promise.all(
      evaluations.map(async (evaluation) => client.sql`
        INSERT INTO evaluations ( id, user_id, book_id, evaluation )
        VALUES ( ${evaluation.id}, ${evaluation.userId}, ${evaluation.bookId}, ${evaluation.evaluation} )
        ON CONFLICT (id) DO NOTHING;
        `,
      ),
    );

    console.log(`Seeded ${insertedEvaluations.length} evaluations`);
    return {
      createTable,
      evaluations: insertedEvaluations
    }
  } catch (error) {
    console.error('Error seeding evaluation:', error);
    throw error;
  }
}

async function seedFollowing(client) {
  try {
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS followings (
        id UUID NOT NULL UNIQUE,
        user_id UUID NOT NULL,
        following_user_id UUID NOT NULL
      );
    `;

    console.log(`Created "followings" table`);

    const insertedFollowing = await Promise.all(
      following.map(async (follow) => client.sql`
        INSERT INTO followings ( id, user_id, following_user_id )
        VALUES ( ${follow.id}, ${follow.userId}, ${follow.followingUserId} )
        ON CONFLICT (id) DO NOTHING;
      `,
      ),
    );

    console.log(`Seeded ${insertedFollowing.length} followings`);

    return {
      createTable,
      following: insertedFollowing
    }
  } catch (err) {
    console.error('Error seeding following:', err);
    throw err;
  }
}

async function main() {
  const client = await db.connect();

  await seedUsers(client);
  await seedBooks(client);
  await seedBooksRead(client);
  await seedBookToRead(client);
  await seedReview(client);
  await seedEvaluation(client);
  await seedFollowing(client);

  await client.end();
}

main().catch((err) => {
  console.error(
    'An error occurred while attempting to seed the database:',
    err,
  );
});