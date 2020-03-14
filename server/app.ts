import express, {Request, Response, NextFunction} from 'express';
import compression from 'compression';
import path from 'path';
import morgan from 'morgan';
import {Port} from './utils/port.util';


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
        firstname: 'John',
        lastname: 'Doe'
    });
});

app.get('/api/database', (req: Request, res: Response) => {
    res.send("Database access here ...");
});


// Listen
app.listen(PORT, () => {
    if (LOCAL) {
        console.log(`Listening on http://localhost:${PORT}`);
    }
});