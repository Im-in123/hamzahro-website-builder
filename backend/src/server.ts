//server.ts
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { createUsersTable, createProfilesTable, createAccessTokenTable } from './config/tables';
import { clearAccessTokenTable, dropAccessTokenTable, dropProfilesTable, dropUsersTable } from './config/dropTables';
import  { connect } from './config/db'; // Import the connect function
import morganMiddleware from './middlewares/morganMiddleware'
import userRouter from './routes/userRoutes'; // Import user routes
import profileRouter from './routes/profileRoutes';

const app = express();

app.use(express.json());
app.use(cors());
// app.use(morgan('dev'));
app.use(morganMiddleware)

app.get('/', (req, res) => {
  res.send('Hello, World!');
});
app.use('/api/users', userRouter); // Use the appropriate base URL
app.use('/api/profiles', profileRouter)


// Call the initializeApp function to create tables when the app starts
initializeApp();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});


async function initializeApp() {
  try {
     await connect(); // Connect to the database using the connect function

    // Create tables if they don't exist
    // await dropProfilesTable()
    // await dropAccessTokenTable()
    // await dropUsersTable()
    await createUsersTable();
    await createProfilesTable();
    await createAccessTokenTable();

    console.log('Tables created successfully');
  } catch (error) {
    console.error('Error creating tables:', error);
  }
}
