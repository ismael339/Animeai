<<<<<<< HEAD
// Importamos dependencias
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { Configuration, OpenAIApi } = require('openai');

// Cargamos variables de entorno (como la API Key)
dotenv.config();

// Configuración de OpenAI
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY
});
const openai = new OpenAIApi(configuration);

// Creamos el servidor
const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Ruta para recibir la descripción del usuario
app.post('/buscar-anime', async (req, res) => {
    const { descripcion } = req.body;

    if (!descripcion) {
        return res.status(400).json({ error: 'Debes enviar una descripción' });
    }

    try {
        // Llamada a la API de OpenAI
        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: `Lista 5 animes que coincidan con esta descripción: "${descripcion}". Devuelve en formato JSON con "title", "genres", "description", "year" y "rating".`,
            max_tokens: 500,
            temperature: 0.7
        });

        // Convertimos la respuesta a JSON
        const result = JSON.parse(response.data.choices[0].text.trim());
        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al procesar la IA' });
    }
});

// Iniciamos el servidor
app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
=======
// Importamos dependencias
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { Configuration, OpenAIApi } = require('openai');

// Cargamos variables de entorno (como la API Key)
dotenv.config();

// Configuración de OpenAI
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY
});
const openai = new OpenAIApi(configuration);

// Creamos el servidor
const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Ruta para recibir la descripción del usuario
app.post('/buscar-anime', async (req, res) => {
    const { descripcion } = req.body;

    if (!descripcion) {
        return res.status(400).json({ error: 'Debes enviar una descripción' });
    }

    try {
        // Llamada a la API de OpenAI
        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: `Lista 5 animes que coincidan con esta descripción: "${descripcion}". Devuelve en formato JSON con "title", "genres", "description", "year" y "rating".`,
            max_tokens: 500,
            temperature: 0.7
        });

        // Convertimos la respuesta a JSON
        const result = JSON.parse(response.data.choices[0].text.trim());
        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al procesar la IA' });
    }
});

// Iniciamos el servidor
app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
>>>>>>> 09080b61c6c1e32de7e8ab4d51a41d7235b0a899
