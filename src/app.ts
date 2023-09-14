import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import productRouter from './routes/product';
import orderRouter from './routes/order';
import loginRouter from './routes/login';

const app = express();

app.use(express.json());
app.use('/login', loginRouter);
app.use('/products', productRouter);
app.use('/orders', orderRouter);

app.use((err: Error, _req:Request, res:Response, next:NextFunction) => {
  if (err) {
    const msgError = err.message;
    return res.status(333).json({ message: `Erro: ${msgError}` });
  }
  next();
});

export default app;
