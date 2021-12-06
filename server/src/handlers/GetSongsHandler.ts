import { DB } from '../Database';
import { MessageHandler } from '../MessageHandler';

async function onMessage() {
  try {
    const value = await DB.query('SELECT * FROM songs')
    return { success: value }
  } catch (err) {
    console.log(err)
    return err
  }
}

const schema = {};

export const GetSongsHandler = new MessageHandler(
  'get_songs',
  schema,
  onMessage,
);
