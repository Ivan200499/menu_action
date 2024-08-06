const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const menuRoutes = require('./routes/menuRoutes');
const menuData = require('./menu.json');

// Configurazione dei middleware
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST'],
}));
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Rotte
app.use('/', menuRoutes);

app.get('/menu', (req, res) => {
    res.json(menuData);
});

app.get('/orders', (req, res) => {
    fs.readFile('orders.json', (err, data) => {
        if (err) {
            res.status(500).send('Errore nel leggere gli ordini');
            return;
        }
        res.json(JSON.parse(data));
    });
});

app.post('/orders', (req, res) => {
    fs.readFile('orders.json', (err, data) => {
        if (err) {
            res.status(500).send('Errore nel leggere gli ordini');
            return;
        }
        const orders = JSON.parse(data);
        orders.push(req.body);
        fs.writeFile('orders.json', JSON.stringify(orders, null, 2), (err) => {
            if (err) {
                res.status(500).send('Errore nel salvare l\'ordine');
                return;
            }
            res.send('Ordine inviato con successo');
        });
    });
});

// Avvio del server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server in esecuzione sulla porta ${PORT}`);
});
