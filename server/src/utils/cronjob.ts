import cron from 'node-cron';
import TokenModel from '../models/token';
// import { connectDb } from './db';

const removeExpiredTokens = async () => {
//   await connectDb();
  await TokenModel.deleteMany({ expiresAt: { $lt: new Date() } });
  console.log('Expired tokens have been removed from the blacklist.');
};

cron.schedule('0 0 * * *', removeExpiredTokens);

export default removeExpiredTokens
