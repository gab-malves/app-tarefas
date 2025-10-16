const Task = require('../models/Task');

class TaskController {
    async create(req, res) {
        try {
            const { title, description } = req.body;
            const task = await Task.create({ title, description, user: req.userId });
            return res.status(201).json(task);
        } catch (err) {
            return res.status(500).json({ error: 'Falha ao criar tarefa.' });
        }
    }
    async index(req, res) {
        try {
            const tasks = await Task.find({ user: req.userId });
            return res.json(tasks);
        } catch (err) {
            return res.status(500).json({ error: 'Falha ao listar tarefas.' });
        }
    }
    async update(req, res) {
        try {
            const { title, description, completed } = req.body;
            const task = await Task.findByIdAndUpdate(
                req.params.id,
                { title, description, completed },
                { new: true }
            );
            if (!task || task.user.toString() !== req.userId) {
                return res.status(404).json({ error: 'Tarefa não encontrada.' });
            }
            return res.json(task);
        } catch (err) {
            return res.status(500).json({ error: 'Falha ao atualizar tarefa.' });
        }
    }
    async delete(req, res) {
        try {
            const task = await Task.findById(req.params.id);
            if (!task || task.user.toString() !== req.userId) {
                return res.status(404).json({ error: 'Tarefa não encontrada.' });
            }
            await task.deleteOne();
            return res.status(204).send();
        } catch (err) {
            return res.status(500).json({ error: 'Falha ao apagar tarefa.' });
        }
    }
}

module.exports = new TaskController();