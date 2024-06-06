import { reportsController } from "./reports.controller";

export default (app: any) => {
    app.get(
        '/api/reports/list',
        // [
        //    Common.authenticateToken,
        //    Common.authenticateAccount,
        // ],
        (req: Request, res: Response) => reportsController.getReportsList(req, res)
     );
};