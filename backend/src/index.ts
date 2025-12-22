import * as dotenv from 'dotenv';
import cors from 'cors';
import express, { Request, Response } from 'express';
import authRoutes from './routes/authRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use('/auth', authRoutes);

app.get('/', (_req: Request, res: Response) => {
  res.json({status: "ok"});
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});