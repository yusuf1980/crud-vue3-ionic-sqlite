<template>
  <ion-app>
    <ion-router-outlet />
  </ion-app>
</template>

<script lang="ts">
import { IonApp, IonRouterOutlet } from '@ionic/vue';
import { defineComponent, onBeforeMount, ref } from 'vue';
import { CapacitorSQLite, SQLiteConnection } from '@capacitor-community/sqlite';
import "@capacitor-community/sqlite";

export default defineComponent({
  name: "HomePage",
  components: {
    IonApp,
    IonRouterOutlet,
  },
  setup() {
    const database = ref<any>(null)

    const addInvoiceSell = async () => {
      try {
        await database.value?.run( 
          'INSERT INTO InvoiceSell (buildingNo, invoiceNo) VALUES (?, ?);', [3, 5]
        );
        alert("table insert invoice")
        return true
      }
      catch(e) {
        alert('error');
        console.log("Error Initializing the Database Table")
      }
    }

    const initDbTable = async () => {
      try {
        const CREATE_TABLE = 
        // "DROP TABLE InvoiceSell;"
        "CREATE TABLE IF NOT EXISTS InvoiceSell ( [buildingNo] [decimal](28, 0) NOT NULL, [invoiceNo] [bigint] NOT NULL );"
        await database.value?.run(CREATE_TABLE)
        return true
      }
      catch(e) {
        alert('error create table')
        console.log("Error Initializing the Database Table")
      }
    }

    onBeforeMount(async () => {
      try {
        const sqlite = new SQLiteConnection(CapacitorSQLite);
        const db = await sqlite.createConnection("ionic-vue-db", false, "no-encryption", 1);
        await db?.open();
        database.value = db;
        initDbTable();
        addInvoiceSell()
        
        // alert('database is open');
      }
      catch(e) {
        console.log("Error Initializing the Database");
      }
    })

    return
  }
})
</script>
