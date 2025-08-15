import express,{Application} from 'express';
import sequelize from '../database/connection';

class Server{

    private app!: Application;
    private port!: string;

    constructor() {
    
        this.app = express();
        this.port = process.env.PORT || '3000';
        this.listen();
        console.log(`Server fernando is running from the port:${this.port}`);
        this.DBconnection();
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Server is running on port ${this.port}`);
        });
    }

    async DBconnection() {
     
        try {
            await sequelize.authenticate();
            console.log('Connection to the database has been established successfully!!.');
        } catch (error) {
            console.error('Unable to connect to the database:', error);
        }
    }
}
export default Server;