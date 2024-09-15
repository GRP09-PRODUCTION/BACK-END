import HttpStatus from 'http-status-codes';
import { Helper } from '../../utils/helper';
import { logger } from '../../utils/logger';
import { Request, Response } from 'express';
import { RaceRecord } from './race.model';
import mongoose from 'mongoose';

class RaceController {
    public async getRacesList(req: Request, res: Response) {
      const { user } = req.body;
        try {
           if (!user) {
              return Helper.createResponse(res, HttpStatus.NO_CONTENT, 'USER_DATA_NOT_FOUND', { });
           }
           const races = await RaceRecord.find({ user_id: user._id }).lean();
           return Helper.createResponse(res, HttpStatus.OK, 'RACES_LIST_FETCHED', { races });
        } catch (error) {
           logger.error(__filename, {
              method: 'getRacesList',
              requestId: req['uuid'],
              custom_message: 'Error while fetching races list',
              error
           });
           return Helper.createResponse(res, HttpStatus.INTERNAL_SERVER_ERROR, 'RACES_LIST_FETCH_ERROR', {});
        }
     }

     public async getRace(req: Request, res: Response) {
      const { raceId } = req.body;  
      console.log(raceId);
          
        try {
           const race = await RaceRecord.findOne({ _id: mongoose.Types.ObjectId(raceId) }).lean();

           return Helper.createResponse(res, HttpStatus.OK, 'RACE_FETCHED', { race });
        } catch (error) {
           logger.error(__filename, {
              method: 'getRace',
              requestId: req['uuid'],
              custom_message: 'Error while fetching race',
              error
           });
           return Helper.createResponse(res, HttpStatus.INTERNAL_SERVER_ERROR, 'RACE_FETCH_ERROR', {});
        }
     }

     public async createRace(req: Request, res: Response) {
      const { user, vMin, vMax, startAt, endAt, duration, mode } = req.body;
      try { 
         const v_min = vMin * ((0.0585 * Math.PI)/ 60);
         const v_max = vMax * ((0.0585 * Math.PI)/ 60);  
         const v_moyen = (v_min + v_max) / 2;   
         const distance = v_moyen * duration;
         const race = new RaceRecord({
            start_at: startAt,
            end_at: endAt,
            duration, // s
            v_min, // m/s
            v_max, // m/s
            v_moyen, // m/s
            distance, // m
            mode,
            user_id: user._id ,
         });
         await race.save();
         return Helper.createResponse(res, HttpStatus.OK, 'RACE_CREATED', { });
      } catch (error) {
         logger.error(__filename, {
            method: 'createRace',
            requestId: req['uuid'],
            custom_message: 'Error while create new race',
            error
         });
         return Helper.createResponse(res, HttpStatus.INTERNAL_SERVER_ERROR, 'CREATE_RACE_ERROR', {});
      }
   }

}
export const raceController = new RaceController();