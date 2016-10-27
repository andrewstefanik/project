const connectionString:string = 'mongodb://webuser:Ducks2014@ds057476.mlab.com:57476/restapp';

import * as mongodb from 'mongodb';


export default class Database {
 public static db:mongodb.Db;

 public static connect() {
   return mongodb.MongoClient.connect(connectionString).then((db) => {
     this.db = db;
   }).catch((err) => {
     console.error(err);
   })
 }
}
