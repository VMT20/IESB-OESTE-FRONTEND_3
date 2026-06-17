import { Router } from 'express';
import { prisma } from '../lib/prisma';

const router = Router();

// GET /tasks - Lista tarefas ordenadas pela data de início decrescente
router.get('/', async (req, res) => {
  const tasks = await prisma.task.findMany({
    orderBy: { startDate: 'desc' }
  });
  res.json(tasks);
});

// POST /tasks - Cria uma nova tarefa
router.post('/', async (req, res) => {
  const { id, name, duration, type, startDate } = req.body;

  const task = await prisma.task.create({
    data: {
      id,
      name,
      duration,
      type,
      startDate: BigInt(startDate)
    }
  });

  res.json(task);
});

// PATCH /tasks/:id/complete - Marca tarefa como concluída
router.patch('/:id/complete', async (req, res) => {
  const { id } = req.params;
  const { completedDate } = req.body;

  const task = await prisma.task.update({
    where: { id },
    data: { completedDate: BigInt(completedDate) }
  });

  res.json(task);
});

// PATCH /tasks/:id/interrupt - Marca tarefa como interrompida
router.patch('/:id/interrupt', async (req, res) => {
  const { id } = req.params;
  const { interruptDate } = req.body;

  const task = await prisma.task.update({
    where: { id },
    data: { interruptDate: BigInt(interruptDate) }
  });

  res.json(task);
});

// DELETE /tasks - Limpa todo o histórico
router.delete('/', async (req, res) => {
  await prisma.task.deleteMany();
  res.json({ message: 'Histórico limpo com sucesso!' });
});

export { router as tasksRoutes };