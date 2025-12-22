import * as dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';
import express, { Request, Response } from 'express';
import authRoutes from './routes/authRoutes';
import keywordRoutes from './routes/keywordRoutes';
import articleRoutes from './routes/articleRoutes';

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());
app.use('/auth', authRoutes);
app.use ('/keywords', keywordRoutes);
app.use('/articles', articleRoutes);

app.get('/', (_req: Request, res: Response) => {
  res.json({status: "ok"});
});

if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
}

export { app };