const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

let nextId = 5; 

let todos = [
  {
    id: 1,
    title: "Belajar Cloud Computing",
    description: "Mengerjakan tugas besar komputasi awan",
    completed: true,
    dueDate: "2025-06-25",
    createdAt: "2025-06-16T13:00:00Z"
  },
  {
    id: 2,
    title: "Seminar Proposal",
    description: "Melaksanakan Seminar Proposal",
    completed: false,
    dueDate: "2025-07-28",
    createdAt: "2025-06-15T09:30:00Z"
  },
  {
    id: 3,
    title: "Tugas Besar PWEB",
    description: "Membuat video dan laporan akhir Website",
    completed: true,
    dueDate: "2025-06-22",
    createdAt: "2025-06-17T09:30:00Z"
  },
  {
    id: 4,
    title: "UAS RPL",
    description: "Melaksanakan UAS RPL pada tanggal 2 Juli 2025 ",
    completed: false,
    dueDate: "2025-07-02",
    createdAt: "2025-06-26T09:30:00Z"
  }
];

function successResponse(message, data) {
  return {
    status: "success",
    message,
    data
  };
}

function errorResponse(message) {
  return {
    status: "error",
    message
  };
}

app.get('/api/todos', (req, res) => {
  res.json(successResponse('Data retrieved successfully', todos));
});

app.post('/api/todos', (req, res) => {
  const { title, description, completed, dueDate } = req.body;

  if (!title || !description || !dueDate) {
    return res.status(400).json(errorResponse('Title, description, dan dueDate wajib diisi'));
  }

  const newTodo = {
    id: nextId++,
    title,
    description,
    completed: completed || false,
    dueDate,
    createdAt: new Date().toISOString()
  };

  todos.push(newTodo);
  res.status(201).json(successResponse('To-do created successfully', newTodo));
});

app.get('/api/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const todo = todos.find(t => t.id === id);

  if (!todo) {
    return res.status(404).json(errorResponse('To-do with the given ID not found'));
  }

  res.json(successResponse('Data retrieved successfully', todo));
});

app.put('/api/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const todoIndex = todos.findIndex(t => t.id === id);

  if (todoIndex === -1) {
    return res.status(404).json(errorResponse('To-do with the given ID not found'));
  }

  const { title, description, completed, dueDate } = req.body;
  const updatedTodo = { ...todos[todoIndex] };

  if (title !== undefined) updatedTodo.title = title;
  if (description !== undefined) updatedTodo.description = description;
  if (completed !== undefined) updatedTodo.completed = completed;
  if (dueDate !== undefined) updatedTodo.dueDate = dueDate;

  todos[todoIndex] = updatedTodo;
  res.json(successResponse('To-do updated successfully', updatedTodo));
});

app.delete('/api/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const todoIndex = todos.findIndex(t => t.id === id);

  if (todoIndex === -1) {
    return res.status(404).json(errorResponse('To-do with the given ID not found'));
  }

  const deletedTodo = todos.splice(todoIndex, 1)[0];
  res.json(successResponse('To-do deleted successfully', deletedTodo));
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
