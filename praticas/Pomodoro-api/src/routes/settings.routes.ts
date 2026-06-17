import { Router } from 'express';
import { prisma } from '../lib/prisma';

const router = Router();

// GET /settings - Busca configurações ou cria os padrões (defaults)
router.get('/', async (req, res) => {
  let settings = await prisma.settings.findFirst();
  
  if (!settings) {
    settings = await prisma.settings.create({
      data: {
        workTime: 25,
        shortBreakTime: 5,
        longBreakTime: 15
      }
    });
  }
  
  res.json(settings);
});

// PUT /settings - Atualiza e valida o payload numérico inteiro
router.put('/', async (req, res) => {
  const { workTime, shortBreakTime, longBreakTime } = req.body;

  if (
    typeof workTime !== 'number' || 
    typeof shortBreakTime !== 'number' || 
    typeof longBreakTime !== 'number'
  ) {
    return res.status(400).json({ error: 'Todos os campos devem ser números inteiros.' });
  }

  let settings = await prisma.settings.findFirst();

  if (settings) {
    settings = await prisma.settings.update({
      where: { id: settings.id },
      data: { workTime, shortBreakTime, longBreakTime }
    });
  } else {
    settings = await prisma.settings.create({
      data: { workTime, shortBreakTime, longBreakTime }
    });
  }

  res.json(settings);
});

export { router as settingsRoutes };