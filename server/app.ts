import express, {Request, Response, NextFunction} from 'express';
import compression from 'compression';
import path from 'path';
import morgan from 'morgan';
import {Port} from './utils/port.util';

import {Sequelize} from 'sequelize';
import {UserModel} from "./database/user.model";

// Database
// @ts-ignore
const sequelize = new Sequelize(process.env.DATABASE_URL.toString(), {dialectOptions: {ssl: true}});
const User = UserModel(sequelize);


// Create express app
const app = express();

const DEVELOPMENT = app.get('env') === 'development';
const PRODUCTION = app.get('env') === 'production';
const LOCAL = process.env.LOCAL === 'true';

const PORT = Port.ensurePort(5000);


if (PRODUCTION) {
    app.disable('x-powered-by');
    app.use(compression());
    app.use(morgan('common'));

    app.use(express.static(path.resolve(__dirname, '..', 'build')));
    app.get('*', (req: Request, res: Response, next: NextFunction) => {
        if (req.originalUrl.toString().startsWith('/api')) return next();
        res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
    });
}

if (DEVELOPMENT) {
    app.use(morgan('dev'));
}


// Routes
app.get('/api/example', (req: Request, res: Response) => {
    res.json({
        first_name: 'John',
        last_name: 'Doe'
    });
});


app.get('/api/database', (req: Request, res: Response) => {
    sequelize.authenticate();

    User.sync();

    // @ts-ignore
    User.findAll().then(users => {
        res.json(users[0]);
    });
});


// Listen
app.listen(PORT, () => {
    if (LOCAL) {
        console.log(`Listening on http://localhost:${PORT}`);
    }
});