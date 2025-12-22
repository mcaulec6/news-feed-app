import * as dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';
import express, { Request, Response } from 'express';
import authRoutes from './routes/authRoutes';
import keywordRoutes from './routes/keywordRoutes';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use('/auth', authRoutes);
app.use ('/keywords', keywordRoutes);

app.get('/', (_req: Request, res: Response) => {
  res.json({status: "ok"});
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});