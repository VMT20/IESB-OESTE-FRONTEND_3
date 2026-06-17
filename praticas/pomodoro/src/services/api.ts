const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3333';

export async function getSettings() {
  const response = await fetch(`${API_URL}/settings`);
  if (!response.ok) throw new Error('Erro ao buscar configurações');
  return response.json();
}

export async function updateSettings(data: { workTime: number; shortBreakTime: number; longBreakTime: number }) {
  const response = await fetch(`${API_URL}/settings`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Erro ao atualizar configurações');
  return response.json();
}

export async function getTasks() {
  const response = await fetch(`${API_URL}/tasks`);
  if (!response.ok) throw new Error('Erro ao buscar tarefas');
  return response.json();
}

export async function createTask(data: { id: string; name: string; duration: number; type: string; startDate: number }) {
  const response = await fetch(`${API_URL}/tasks`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Erro ao criar tarefa');
  return response.json();
}

export async function completeTask(id: string, completedDate: number) {
  const response = await fetch(`${API_URL}/tasks/${id}/complete`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ completedDate }),
  });
  if (!response.ok) throw new Error('Erro ao concluir tarefa');
  return response.json();
}

export async function interruptTask(id: string, interruptDate: number) {
  const response = await fetch(`${API_URL}/tasks/${id}/interrupt`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ interruptDate }),
  });
  if (!response.ok) throw new Error('Erro ao interromper tarefa');
  return response.json();
}

export async function clearTasks() {
  const response = await fetch(`${API_URL}/tasks`, { method: 'DELETE' });
  if (!response.ok) throw new Error('Erro ao limpar histórico');
  return response.json();
}