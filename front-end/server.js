import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const port = 3000;

// Получаване на текущата директория с използване на ES модулите
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Serve static files
app.use(express.static('public'));

// Catch all routes and redirect to index.html
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public\\src\\common\\html', 'index.html'));
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
