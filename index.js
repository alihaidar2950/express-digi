import express from 'express';

const app = express();
const port = 3000;
app.use(express.json());

let teaData = []
let nextId = 1;

app.post('/teas', (req, res) => {
    const {name, price} = req.body;
    const newTea = {id: nextId++, name, price};
    teaData.push(newTea);
    res.status(201).send(newTea);
})

app.get('/teas', (req, res) => {
    res.status(200).send(teaData);
})

app.get('/teas/:id', (req, res) => {
    const teaId = parseInt(req.params.id);
    const tea = teaData.find(tea => tea.id === teaId);
    if (tea) {
        res.status(200).send(tea);
    } else {
        res.status(404).send('Tea not found');
    }
})

app.put('/teas/:id', (req, res) => {
    const teaId = parseInt(req.params.id);
    const {name, price} = req.body;
    const tea = teaData.find(tea => tea.id === teaId);
    if (tea) {
        tea.name = name;
        tea.price = price;
        res.status(200).send(tea);
    } else {
        res.status(404).send('Tea not found');
    }
})

app.delete('/teas/:id', (req, res) => {
    const teaId = parseInt(req.params.id);
    const tea = teaData.find(tea => tea.id === teaId);
    if (tea) {
        teaData = teaData.filter(tea => tea.id !== teaId);
        res.status(204).send();
    } else {
        res.status(404).send('Tea not found');
    }
})



app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
})