import express, { Request, Response, NextFunction } from 'express';
import productRouter from './routes/product';
import 'express-async-errors';

const app = express();

app.use(express.json());
app.use('/products', productRouter);

app.use((err: Error, _req:Request, res:Response, _next:NextFunction) => {
  if (err) {
    const msgError = err.message;
    return res.status(333).json({ message: `Erro: ${msgError}` });
  }
});
export default app;
