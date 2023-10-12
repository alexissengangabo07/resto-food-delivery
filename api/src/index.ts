import mongoose from 'mongoose';
import app from './app';

const PORT = process.env.PORT;
const DB_URL = process.env.DATABASE_URL;

mongoose.connect(DB_URL!)
    .then(() => {
        console.log(`Base de donnée connecté`)
        app.listen(PORT, () => console.log(`Le serveur écoute sur le port ${PORT}`))
    })
    .catch(err => console.error(err));