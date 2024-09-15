import { NextFunction, Request, Response } from 'express';
import { Helper } from "../../utils/helper";
import { RaceRecord } from './race.model';
import mongoose from 'mongoose';
import { isNumber } from 'util';


class RaceValidator {
    public tokenCheck(req: Request, res: Response, next: NextFunction) {
        const errors = {};
        const { user } = req.body;

        if (!user) {
            errors["user"] = "NO_DATA";
        }
        Helper.returnErrorOrPassToNext(res, next, errors);
    }

    public async getRace(req: Request, res: Response, next: NextFunction) {
        const errors = {};
        const { raceId } = req.body;
console.log(req.body);

        if (!raceId) {
            errors["race"] = "ID_REQUIRED";
        }

        Helper.returnErrorOrPassToNext(res, next, errors);
    }

    public async createRace(req: Request, res: Response, next: NextFunction) {
        const errors = {};
        const { user, vMin, vMax, startAt, endAt, duration, mode } = req.body;

        if (!user) {
            errors['user'] = 'USER_REQUIRED';
        }

        if (!vMin) {
            errors['vMin'] = 'V_MIN_REQUIRED';
        }

        if (!vMax) {
            errors['vMax'] = 'V_MAX_REQUIRED';
        }

        if (!startAt) {
            errors['startAt'] = 'START_AT_REQUIRED';
        }

        if (!endAt) {
            errors['endAt'] = 'END_AT_REQUIRED';
        }

        if (!duration) {
            errors['duration'] = 'DURATION_REQUIRED';
        }

        if (!mode) {
            errors['mode'] = 'MODE_REQUIRED';
        }else if (mode !== "AUTO" && mode !== "MANUAL") {
            errors["mode"] = "MODE_TYPE_ERROR";
        }

        Helper.returnErrorOrPassToNext(res, next, errors);
    }
}
export default new RaceValidator();