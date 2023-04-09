import { CapacitorSQLite, SQLiteConnection } from '@capacitor-community/sqlite';
import "@capacitor-community/sqlite";


export async function connect() {
    try {
        // let database:any = null;
        const sqlite = new SQLiteConnection(CapacitorSQLite);
        const db = await sqlite.createConnection(
            "ionic-vue-db", 
            false, 
            "no-encryption", 
            1);
        await db?.open();
        await initDbTable(db);
        await addInvoiceSell(db)
        alert('database is open! '+ db);
        return db
      }
      catch(e) {
        console.log("Error Initializing the Database");
      }
}

const initDbTable = async (db:any) => {
    try {
      const CREATE_TABLE = 
      // "DROP TABLE InvoiceSell;"
      "CREATE TABLE IF NOT EXISTS InvoiceSell ( [buildingNo] [decimal](28, 0) NOT NULL, [invoiceNo] [bigint] NOT NULL, aName varchar(250), userNumber varchar(20) NULL, dateG date NOT NULL);"
      // "ALTER TABLE InvoiceSell ADD dateG date NOT NULL"
      await db?.run(CREATE_TABLE)
      return true
    }
    catch(e) {
      alert('error create table')
      console.log("Error Initializing the Database Table")
    }
  }

  const addInvoiceSell = async (db:any) => {
    try {
      await db?.run( 
        'INSERT INTO InvoiceSell (buildingNo, invoiceNo, aName, userNumber, dateG) VALUES (?, ?, ?, ?, ?);', [3.00, 2, 'Name 1', '6282255291566', '2023-04-07']
      );
      alert("table insert invoice")
      return true
    }
    catch(e) {
      alert('error add invoice: ' + e);
      console.log("Error Initializing the Database Table")
    }
  }

  export const getInvoices = async (db:any) => {
    try {
        // const ret: any
        const SELECT_TABLE = 'SELECT * FROM InvoiceSell'
        const ret:any = await db.query(SELECT_TABLE);
        alert(typeof ret)
        // return dba
    }
    catch(e) {
        alert('error get invoice: ' + e)
    }
  }
  