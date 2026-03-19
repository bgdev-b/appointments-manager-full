
import express from 'express';
import cors from 'cors';
import './db/database.js';

import clientsRoutes from './routes/clients.routes.js';
import servicesRouter from './routes/services.routes.js';
import appointmentsRoutes from './routes/appointments.routes.js';

const app = express();
const allowedOrigins = process.env.FRONTEND_ORIGIN
    ? process.env.FRONTEND_ORIGIN.split(',').map((origin) => origin.trim()).filter(Boolean)
    : [];

app.use(cors({
    origin(origin, callback) {
        if (!origin || allowedOrigins.length === 0 || allowedOrigins.includes(origin)) {
            callback(null, true);
            return;
        }

        callback(new Error('Origin not allowed by CORS'));
    },
}));
app.use(express.json());

app.use('/clients', clientsRoutes);
app.use('/services', servicesRouter);
app.use('/appointments', appointmentsRoutes);

app.get('/health', (req, res) => {
    res.json({ status: 'ok' });
});

app.get('/', (req, res) => {
    res.json({ message: 'Appointments Management Backend' });
});

export default app;