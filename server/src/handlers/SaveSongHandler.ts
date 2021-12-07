import { DB } from '../Database';
import { MessageHandler } from '../MessageHandler';
import { Socket } from 'socket.io';
import Joi from 'joi';

async function onMessage(msg: any, socket: Socket) {
  try {
    
    let Query = `INSERT INTO songs (artist, song_title, notes) \
    VALUES ('A+ Major Band', 'Drum Machine', '${msg.notes}');`
    const value = await DB.query(Query)
    console.log("SaveSongHandler First Query Result", value)
    const songs = await DB.query('SELECT * FROM songs')
    console.log("SaveSongHandler returning songs value", songs)
    return { success: songs }
  } catch (err) {
    console.log("Err", err)
    return err
  }
}

const schema = {
  "notes": Joi.array()
}

export const SaveSongHandler = new MessageHandler(
  'save_song',
  schema,
  onMessage,
);
