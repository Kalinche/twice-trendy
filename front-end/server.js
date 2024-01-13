const express = require('express');
const path = require('path');  // Импортиране на модула path
const app = express();
const port = 3000;

// Serve static files
app.use(express.static('public'));

// Catch all routes and redirect to index.html
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public\\src\\common\\html', 'index.html'));
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
