import { carsController } from "./car.controller";

export default (app: any) => {

    app.get(
        '/api/cars/list',
        // [
        //    Common.authenticateToken,
        //    Common.authenticateAccount,
        // ],
        (req: Request, res: Response) => carsController.getCarsList(req, res)
     );
};