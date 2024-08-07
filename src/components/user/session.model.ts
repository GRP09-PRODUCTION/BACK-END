'use strict';

import * as mongoose from 'mongoose';
import { Constants } from '../../utils/constants/constant';

export interface Session extends mongoose.Document {
   _id: mongoose.Schema.Types.ObjectId;
   userId: mongoose.Schema.Types.ObjectId;
   createdAt: Date;
}

const sessionSchema = new mongoose.Schema(
   {
      userId: {
         type: mongoose.Schema.Types.ObjectId,
         required: true,
         ref: 'User'
      },
      createdAt: { type: Date, default: Date.now },
      expireOn: { type: Date, default: Date.now, expires: Constants.USER_SESSION_EXPIRE_IN }
   },
   {}
);

sessionSchema.index({ expireOn: 1 }, { expireAfterSeconds: Constants.USER_SESSION_EXPIRE_IN });

export const SessionRecord = mongoose.model<Session>('Session', sessionSchema);
