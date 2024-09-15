import common from "../../utils/common/common";
import { raceController } from "./race.controller";
import validator from './race.validator';


export default (app: any) => {
    app.get(
        '/api/race/list',
        [
            common.authenticateTokenBis,
            validator.tokenCheck
        ],
        (req, res) => raceController.getRacesList(req, res)
    );

    app.post(
        '/api/race/details', 
        [
            validator.getRace
        ],
        (req, res) => raceController.getRace(req, res)
    );

    app.post(
        '/api/race',
        [
            common.authenticateToken,
            validator.createRace
        ],
        (req, res) => raceController.createRace(req, res)
    );

};