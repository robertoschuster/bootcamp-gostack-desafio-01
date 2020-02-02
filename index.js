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
var reqCount = 0;
server.use((req, res, next) => {
   reqCount++;
   console.log(`Total de Requisições: ${reqCount}`);
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
  const index = projects.map((e) => { return e.id }).indexOf(id);

  if (index === -1) {
    return res.status(400).json(`Project ${id} does not exists.`);
  }

  req.project = projects[index];
  req.projectIndex = index;

  return next();

}

function checkProjectRepeated(req, res, next) {

  const { id } = req.body;
  const index = projects.map((e) => { return e.id }).indexOf(id);

  if (index !== -1) {
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
  
  return res.json(projects);

})

// PUT
server.put('/projects/:id', checkProjectRequiredParams, checkProjectIdExists, (req, res) => {

  const { title } = req.body;

  // req.project foi definido no middleware checkProjectIdExists
  if (req.project)
    req.project.title = title;
  
  return res.json(projects);

})

// DELETE
server.delete('/projects/:id', checkProjectIdExists, (req, res) => {

  // req.project foi definido no middleware checkProjectIdExists
  if (req.projectIndex)
    projects.splice(req.projectIndex, 1);

  return res.status(200).json();

})

// POST (tasks)
server.post('/projects/:id/tasks', checkProjectIdExists, (req, res) => {

  const { title } = req.body;

  // req.project foi definido no middleware checkProjectIdExists
  if (req.project)
    req.project.tasks.push(title);
  
  return res.json(projects);
  
})

server.listen(3000);
