<template>
  <ion-app>
    <ion-router-outlet />
  </ion-app>
</template>

<script lang="ts">
import { IonApp, IonRouterOutlet } from '@ionic/vue';
import { defineComponent, onBeforeMount, ref, provide, onMounted, inject } from 'vue';
import { CapacitorSQLite, SQLiteConnection } from '@capacitor-community/sqlite';
import "@capacitor-community/sqlite";
// import sqlite3 from 'sqlite3'

export default defineComponent({
  name: "HomePage",
  components: {
    IonApp,
    IonRouterOutlet,
  },
  setup() {
    const database = ref<any>(null)
    provide("SQLITE-DB", database)

    console.log('test')
    
    
    // alert("In home "+(dbs as any)?.value)

    const addInvoiceSell = async () => {
      try {
        await database.value?.run( 
          'INSERT INTO InvoiceSell (buildingNo, invoiceNo, aName, userNumber, dateG) VALUES (?, ?, ?, ?, ?);', [3, 6, 'Achmad', '6282255291566', '2023-04-07']
        );
        alert("table insert invoice")
        return true
      }
      catch(e) {
        alert('error' + e);
        console.log("Error Initializing the Database Table")
      }
    }

    const initDbTable = async () => {
      try {
        const CREATE_TABLE = 
        // "DROP TABLE InvoiceSell;"
        "CREATE TABLE IF NOT EXISTS InvoiceSell ( [buildingNo] [decimal](28, 0) NOT NULL, [invoiceNo] [bigint] NOT NULL, aName varchar(250), userNumber varchar(20) NULL, dateG date NOT NULL);"
        // "ALTER TABLE InvoiceSell ADD dateG date NOT NULL"
        await database.value?.run(CREATE_TABLE)
        return true
      }
      catch(e) {
        alert('error create table')
        console.log("Error Initializing the Database Table")
      }
    }

    const loadData = async () => {
      try {
        const dbs = inject('SQLITE-DB')
        const queryResults = ref<any>(null)
        const resp = await (dbs as any).value?.query(
          "SELECT * FROM InvoiceSell;"
        )
        queryResults.value = resp.value
        alert(queryResults.value)
        return true
      }
      catch(e) {
        alert('error loading invoice')
      }
    }

    onBeforeMount( async () => {
      try {
        const sqlite = new SQLiteConnection(CapacitorSQLite);
        const db = await sqlite.createConnection(
          "ionic-vue-db", 
          false, 
          "no-encryption", 
          1);
        await db?.open();
         alert('database is open!');
        database.value = db;
        await initDbTable();
        await addInvoiceSell()       
      }
      catch(e) {
        console.log("Error Initializing the Database");
      }
    })

    onMounted( async () => {
      await loadData()
    })

    return 
  }
})
</script>
 