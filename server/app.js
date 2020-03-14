const express = require('express');
const compression = require('compression');
const morgan = require('morgan');
const path = require('path');
const Sequelize = require('sequelize');
const UserModel = require('./database/User.model');


// Database
const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialectOptions: {
        ssl: true
    }
});

const User = UserModel(sequelize);



const normalizedPort = port => parseInt(port, 10);
const PORT = normalizedPort(process.env.PORT || 5000);

const app = express();
const dev = app.get('env') !== 'production';


if (!dev) {
    app.disable('x-powered-by');
    app.use(compression());
    app.use(morgan('common'));
}
else {
    app.use(morgan('dev'));
}

// Serve React Statics
app.use(express.static(path.resolve(__dirname, '..', 'build')));


// Server endpoints
app.get('/api/data', (req, res) => {
    sequelize.authenticate()
        .catch(err => console.log(err));

    User.sync();

    User.findAll().then(users => {
        res.send(users);
    });
});


// React requests
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
});


// Serve
app.listen(PORT, () => {
    if (dev) {
        console.log("Listening on: http://localhost:" + PORT);
    }
});