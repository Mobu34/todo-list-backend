const express = require("express");
const router = express.Router();

const Task = require("../models/Task");

router.post("/task/add", async (req, res) => {
  try {
    const { name, position } = req.fields;

    const newTask = new Task({
      name,
      position,
    });

    await newTask.save();

    res.status(200).json(newTask);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get("/task/update", async (req, res) => {
  try {
    const { id } = req.query;

    const newUpdate = await Task.findById(id);

    newUpdate.isDone = !newUpdate.isDone;

    await newUpdate.save();

    res.status(200).json(newUpdate);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get("/task/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const deleteTask = await Task.findById(id);
    await deleteTask.deleteOne(); // suppression de la tâche => OK

    const tasks = await Task.find(); // je récupère toutes les tâches
    tasks.map((task, index) => {
      // puis je boucle pour leur réassigner une position qui me sert à les replacer correctement lorsque je les coche/décoche
      task.position = index;
    });

    await tasks.save(); // le save() ne fonctionne pas, il me renvoi l'erreur => save is not a function

    res.status(200).json(tasks);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get("/tasks", async (req, res) => {
  try {
    const tasks = await Task.find();

    res.status(200).json(tasks);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
