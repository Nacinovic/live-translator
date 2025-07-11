const { DB_USERNAME, DB_PASSWORD } = process.env

const mongoose = require('mongoose');
const uri = `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@cluster0.4qrjw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };

const db = async () => {
    const connection = await mongoose.connect(uri, clientOptions);
    await mongoose.connection.db.admin().command({ ping: 1 });

    return connection
}


export default db