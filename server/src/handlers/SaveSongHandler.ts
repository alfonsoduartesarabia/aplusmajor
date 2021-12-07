import { DB } from '../Database';
import { MessageHandler } from '../MessageHandler';
import { Socket } from 'socket.io';

async function onMessage(msg: any, socket: Socket) {
  try {
    console.log("New Message on save_songs")
    console.log(msg)
    return { success: msg }
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
