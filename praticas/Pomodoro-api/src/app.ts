import express from 'express';
import cors from 'cors';
import { settingsRoutes } from './routes/settings.routes';
import { tasksRoutes } from './routes/tasks.routes';

// 🎯 Solução para a observação técnica: Impede erro de JSON.stringify com BigInt
(BigInt.prototype as any).toJSON = function () {
  return this.toString();
};

const app = express();

app.use(cors());
app.use(express.json());

// Rota de Health Check
app.get('/health', (req, res) => {
  res.json({ ok: true });
});

// Registrando os endpoints oficiais da especificação
app.use('/settings', settingsRoutes);
app.use('/tasks', tasksRoutes);

export { app };