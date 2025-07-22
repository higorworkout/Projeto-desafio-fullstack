import express, { Request, Response, NextFunction } from 'express';
import { authRouter } from './modules/auth/routes/authRouter';
import { usersRouter } from './modules/users/routes/usersRouter';
import { taskRouter } from './modules/tasks/routes/taskRouter';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './swagger/swaggerConfig';
import { reportsRouter } from '@modules/reports/routes/reportsRouter';
import { errorHandler } from './middlewares/errorHandler';
import cors from 'cors';

console.log(JSON.stringify(swaggerSpec, null, 2));

class App {
    public app: express.Application;
    
    constructor() {
        this.app = express();
        this.initializeMiddlewares();
        this.initializeRoutes();
        this.initializeErrorHandling();
        this.initializeSwagger();
       
    }

    initializeSwagger() {
        this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    }
    
    initializeMiddlewares() {
        this.app.use(cors());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(express.json());
    }
    
    initializeRoutes() {
        this.app.use("/users", usersRouter);
        this.app.use("/auth", authRouter);
        this.app.use("/task", taskRouter);
        this.app.use("/reports", reportsRouter);
    }
    
    initializeErrorHandling() {
      /*  this.app.all('*', (req, res, next) => {
            throw new NotFoundError('Rota não encontrada');
        });*/
      this.app.use(errorHandler);

    }
}


export default new App().app;