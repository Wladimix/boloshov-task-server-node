import crypto from 'crypto';
import mongoose from "mongoose";

class HashService {

    md5Hash(id: mongoose.Types.ObjectId): string {
        return crypto.createHash('md5').update(id.toString()).digest('hex');
    }

}

export default new HashService();
