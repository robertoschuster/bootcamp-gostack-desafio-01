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

const projects = [];

/******************************************************************************
 * 
 * Middlewares
 *  
 ******************************************************************************/
server.use((req, res, next) => {
   console.count('Total de Requisições');
   return next();
})

function checkProjectRequiredParams(req, res, next) {

  // POST
  if ((req.method == 'POST') && (!req.body.id)) {
    return res.status(400).json("Id is required.");
  } 

  // POST + PUT
  if (!req.body.title) {
    return res.status(400).json("Title is required.");
  }

  return next();

}

function checkProjectIdExists(req, res, next) {

  const { id } = req.params;
  const project = projects.find(proj => proj.id == id);

  if (!project) {
    return res.status(400).json(`Project ${id} does not exists.`);
  }

  return next();

}

function checkProjectRepeated(req, res, next) {

  const { id } = req.body;
  const project = projects.find(proj => proj.id == id);

  if (project) {
    return res.status(400).json(`Id ${id} already exists.`);
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
server.post('/projects', checkProjectRequiredParams, checkProjectRepeated, (req, res) => {

  const { id, title } = req.body;

  const project = { id, title, tasks: [] };
  projects.push(project);
  
  return res.json(project);

})

// PUT
server.put('/projects/:id', checkProjectRequiredParams, checkProjectIdExists, (req, res) => {

  const { id } = req.params;
  const { title } = req.body;

  const project = projects.find(proj => proj.id == id);
  project.title = title;
  
  return res.json(project);

})

// DELETE
server.delete('/projects/:id', checkProjectIdExists, (req, res) => {

  const { id } = req.params;
  const index = projects.findIndex(proj => proj.id == id);

  projects.splice(index, 1);

  return res.status(200).send();

})

// POST (tasks)
server.post('/projects/:id/tasks', checkProjectIdExists, (req, res) => {
 
  const { id } = req.params;
  const { title } = req.body;

  const project = projects.find(proj => proj.id == id);
  project.tasks.push(title);
  
  return res.json(project);
  
})

server.listen(3000);
