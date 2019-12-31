const express = require('express');

const app = express();

app.get('/', (req, res) => res.json({ msg: 'Egoscue app index route!' }));

// Define routes
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/exercises', require('./routes/exercises'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
