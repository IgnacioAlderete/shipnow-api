import express from 'express';
import cors from 'cors';
import usersRouter from './routes/users.router.js';
import productsRouter from './routes/products.router.js';
//import apiRouter from './routes/index.js';


const app = express();
//app.use('/api', apiRouter);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/users', usersRouter);
app.use('/api/products', productsRouter);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString()});
});




app.use((req, res) => {
  res.status(404).send('Ruta no encontrada');
});

export default app;
