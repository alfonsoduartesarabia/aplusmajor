import { DB } from '../Database';
import { MessageHandler } from '../MessageHandler';
import { Socket } from 'socket.io';

async function onMessage(msg: any, socket: Socket) {
  try {
    
    let Query = `INSERT INTO songs (song_title, notes) \
    VALUES (5, 'A+ Major Band', '${msg.notes}');`
    const value = await DB.query(Query)
    console.log("SaveSongHandler First Query Result", value)
    const songs = await DB.query('SELECT * FROM songs')
    console.log("SaveSongHandler returning songs value", songs)
    return { success: songs }
  } catch (err) {
    console.log(err)
    return err
  }
}

const schema = {}

export const SaveSongHandler = new MessageHandler(
  'save_song',
  schema,
  onMessage,
);
