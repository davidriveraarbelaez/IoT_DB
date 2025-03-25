CREATE TABLE IF NOT EXISTS lecturas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_dispositivo INT NOT NULL,
    temperatura FLOAT NOT NULL,
    humedad FLOAT NOT NULL,
    voltaje FLOAT NOT NULL,
    corriente FLOAT NOT NULL,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
);
