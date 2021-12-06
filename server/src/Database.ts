import mysql from 'mysql'

export class DB {
  
  private static readonly DB_HOST: string = 'database-1.clll8zact3h2.us-east-2.rds.amazonaws.com';
  private static readonly DB_USER: string = 'admin';
  private static readonly DB_PASS: string = 'Z4yLYb3fny34';
  private static readonly DB_NAME: string = 'aMajor';
  private static connection: mysql.Connection;
  
  
  private static hasInitialized: boolean;
  private static memo: Map<string, string> = new Map();

  private constructor() {
    
  }

  public static initializeDB() {
    DB.connection = mysql.createConnection({
      host     : DB.DB_HOST,
      user     : DB.DB_USER,
      password : DB.DB_PASS,
      database : DB.DB_NAME
    })
    DB.connection.connect( err => {
      if (err) {
        console.error('error connecting: ' + err.stack);
        return;
      }
     
      console.log('connected as id ' + DB.connection.threadId);
    })
  }

  public static query(sql:string) {
    if (!DB.connection) {
      DB.initializeDB()
    }
    return new Promise ((resolve, reject) => {
      DB.connection.query(sql, (err, result) => {
        if (err) return reject (err)
        resolve(JSON.parse(JSON.stringify(result)))
      })
    }) 
  }

}