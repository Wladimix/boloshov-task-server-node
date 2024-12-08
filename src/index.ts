import mongoose from 'mongoose';
import router from './router';
import server from './server';

const PORT = process.env.PORT || 3000;
const DB_URL = process.env.DB_URL || 'mongodb://admin:pass@localhost:8080/users?authSource=admin';
export const DOMAIN = process.env.DOMAIN || 'http://localhost:3000';

async function start() {
    try {
        await mongoose.connect(DB_URL);
        router();
        server.listen(PORT, () => console.log(`сервер запущен на порте ${PORT}`));
    } catch (e) {
        console.log(e as Error);
    }
}

start();
