/**
 * @description Api de cadastro de projetos e suas tarefas, conforme orientações
 * no desafio 01 do bootcamp GoStack da Rocketseat.
 * 
 * @author Roberto Schuster
 * @date 01/02/2020
 * 
 */

const express = require("express");
const server = express();
server.use(express.json());

// array de projetos
const projects = [
  { id: "0", title: "Projeto 0", tasks: ["Tarefa A", "Tarefa B", "Tarefa C"] },
  { id: "1", title: "Projeto 1", tasks: ["Tarefa D", "Tarefa E", "Tarefa F"] },
  { id: "2", title: "Projeto 2", tasks: ["Tarefa G", "Tarefa H", "Tarefa I"] },
];

/******************************************************************************
 * 
 * Middlewares
 *  
 ******************************************************************************/
function checkProjectRequiredParams(req, res, next) {

  const { id, title, tasks } = req.body;

  if (!id) {
    return res.status(400).json("Id is required.");
  }
  if (!title) {
    return res.status(400).json("Title is required.");
  }
  if (!tasks) {
    res.status(400).json("Tasks is required.");
  }

  return next();

}

/******************************************************************************
 * 
 * Routes
 *  
 ******************************************************************************/

// GET
server.get('/projects', (req, res) => {
  
  res.json(projects);

})

// POST
server.post('/projects', checkProjectRequiredParams, (req, res) => {

  const { id, title, tasks } = req.body;
  projects.push({ id, title, tasks });
  
  return res.json(projects);

})

// PUT
server.put('/projects/:id', checkProjectRequiredParams, (req, res) => {

  const { id, title, tasks } = req.body;
  projects.push({ id, title, tasks });
  
  return res.json(projects);

})


server.listen(3000);
