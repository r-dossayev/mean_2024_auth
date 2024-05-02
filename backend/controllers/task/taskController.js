const Task = require("../../models/task");


const createTask = async (req, res) => {
  try {
    let {title, description, status} = req.body;
    status = status? status: "pending";
    const task = new Task({
      title,
      description,
      status,
    });
    await task.save();
    res.status(201).json(task)
  } catch (error) {
    res.status(500).json({message: error.message});
  }
}

const taskList = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).json({tasks});
  } catch (error) {
    res.status(500).json({message: error.message});
  }
}

const taskWhereId = async (req, res) => {
  try {
    const task = await Task.findById(req.params.task_id);
    res.status(200).json({task});
  } catch (error) {
    res.status(500).json({message: error.message});
  }
}

const updateTask = async (req, res) => {
  try {
    const {title, description, status} = req.body
    await Task.findByIdAndUpdate(req.params.task_id, {
      title,
      description,
      status,
    });
    const task = await Task.findById(req.params.task_id);
    res.status(200).json(task)
  } catch (error) {
    res.status(500).json({message: error.message});
  }
}

//deleteTask

const deleteTask = async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.task_id);
    res.status(200).json({message: "Task deleted successfully"});
  } catch (error) {
    res.status(500).json({message: error.message});
  }
}


module.exports = {
  createTask,
  taskList,
  taskWhereId,
  updateTask,
  deleteTask,
}
