const express = require('express');
const mysql = require('mysql2');
const app = express();
app.use(express.json());

const db = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'iot_user',
  password: process.env.DB_PASSWORD || 'iot_password',
  database: process.env.DB_DATABASE || 'iot_data'
});

db.connect(err => {
  if (err) throw err;
  console.log('Conectado a MySQL');
});

app.post('/lecturas', (req, res) => {
  const { id_dispositivo, temperatura, humedad, voltaje, corriente } = req.body;
  const query = 'INSERT INTO lecturas (id_dispositivo, temperatura, humedad, voltaje, corriente) VALUES (?, ?, ?, ?, ?)';
  db.query(query, [id_dispositivo, temperatura, humedad, voltaje, corriente], (err) => {
    if (err) return res.status(500).send(err.message);
    res.send('Lectura almacenada');
  });
});

app.listen(3000, () => console.log('API escuchando en puerto 3000'));

