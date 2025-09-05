import express,{Application} from 'express';
import sequelize from '../database/connection';
import { User } from './user';
import { routerRegisterUser } from '../routes/routesUser';


class Server{

    private app!: Application;
    private port!: string;

    constructor() {
    
        this.app = express();
        this.port = process.env.PORT || '3000';
        this.listen();
        this.DBconnection();

    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Server is running on port ${this.port}`);
        });

    }
    Middleware(){
        this.app.use(express.json())
    }
    Router(){
        this.app.use(routerRegisterUser);
    }

    
    async DBconnection() {
     
        try {
            await sequelize.authenticate();
            await User.sync({force:true})
            console.log('Connection to the database has been established successfully!!.');
        } catch (error) {
            console.error('Unable to connect to the database:', error);
        }
    }
    async DBconnection_test() {
     
        try {
            await sequelize.authenticate();
            console.log('Connection to the database has been established successfully!!.');
        } catch (error) {
            console.error('Unable to connect to the database:', error);
        }
    }
}

export default Server;