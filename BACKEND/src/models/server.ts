import express,{Application} from 'express';
import sequelize from '../database/connection.js';
import { User } from './user';
import { routerRegisterUser,routerLoginUser, authPassword } from '../routes/routesUserAuth.js';
import { routerRegisterProduct,routerGetAllProducts } from '../routes/routesProduct.js';
import { Product } from './product.js';
import cors from 'cors'


class Server{

    private app!: Application;
    private port!: string;

    constructor() {
    
        this.app = express();
        this.port = process.env.PORT || '3000';
        this.DBconnection();
        this.Middleware();
        this.Router();
        this.listen();
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Server is running on port ${this.port}`);
        });

    }
    Middleware(){
        this.app.use(express.json())
        this.app.use(cors())
    }
    Router(){
        this.app.use(routerRegisterUser);
        this.app.use(routerLoginUser);
        this.app.use(routerRegisterProduct);
        this.app.use(routerGetAllProducts);
        this.app.use(authPassword)
    }

    
    async DBconnection() {
     
        try {
            await sequelize.authenticate();
            await User.sync({alter:false});
            await Product.sync({force:false})
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