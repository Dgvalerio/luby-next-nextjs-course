import { MongoClient } from 'mongodb';

// eslint-disable-next-line import/prefer-default-export
export const connectToDatabase = async (): Promise<MongoClient> =>
  MongoClient.connect(
    'mongodb+srv://dgvalerio:eRY1RrtpOPm8xxfQ@cluster0.sshuh.mongodb.net/auth-demo?retryWrites=true&w=majority'
  );
