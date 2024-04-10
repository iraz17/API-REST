const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());

let tasks = [
    { id: 1, description: 'Faire les courses'},
    { id: 2, description: 'Apprendre Node.js'},
    { id: 3, description: 'Nettoyer la maison'},
    { id: 4, description: 'Préparer le dîner'}
];

app.listen(port, () => {
    console.log(`Serveur écoutant sur le port ${port}`);
});

app.get('/tasks', (req, res) => {
    const taskReferences = tasks.map(task => `/task/${task.id}`);
    res.json(taskReferences);
}); 


app.get('/task/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    const task = tasks.find(task => task.id === taskId);

    if (task){
        res.json(task);
    } else {
        res.status(404).json({ error: 'Tâche non trouvée' });  
    }
});

app.post('/tasks', (req, res) => {
    const newTask = {
        id: tasks.length + 1,
        description: req.body.description
    };
    tasks.push(newTask);
    res.status(201).json({ message: 'Tâche ajoutée avec succès'})
});
//ANCHOR - Ajoutée taches //

app.post('/tasks', (req, res) => {
    const newTask = {
        id: tasks.length + 1,
        description : req.body.description
    };
    tasks.push(newTask);
    res.status(201).json({ message: 'Tâche ajoutée avec succès', task:
    newTask });
});

//ANCHOR - modification d'une tâche //

app.put('/task/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    const task = tasks.find(task => task.id === taskId);
    if (task) {
        task.description = req.body.description;
        res.json({ message: 'Tâche mise à jour avec succès', task});
    } else {
        res.status(404).json({ error : 'Tâche non trouvée'});
    }
});

//ANCHOR - SUPPRIMER UNE TÂCHE

app.delete('/task/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    tasks = tasks.filter(tasks => task.id !== taskId);
    res.json({message: 'Tâche supprimée avec succès'});
});