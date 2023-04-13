<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar color="danger">
        <ion-title>NAME STORE</ion-title>
        <ion-buttons slot="end">
          <ion-button routerLink="/add">Add New</ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <ion-refresher slot="fixed" @ionRefresh="refresh($event)">
        <ion-refresher-content></ion-refresher-content>
      </ion-refresher>

      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Inbox</ion-title>
        </ion-toolbar>
      </ion-header>

      <ion-list>
        <MessageListItem v-for="message in queryResults.values" :key="message.invoiceNo" :message="message" />
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonContent,
  IonHeader,
  IonList,
  IonPage,
  IonRefresher,
  IonRefresherContent,
  IonTitle,
  IonToolbar,
  IonButton,
  IonButtons
} from '@ionic/vue';
import MessageListItem from '@/components/MessageListItem.vue';
import { getMessages, Message } from '@/data/messages';
import { ref, onMounted, watch } from 'vue';
import {initDb} from '../query/init'

const queryResults = ref<any>(null)

const messages = ref<Message[]>(getMessages());

const loadData = async () => {
  try {
    const init:any = await initDb();
    // alert("In home "+(database as any)?.value)
    const res = await init.db?.query(
      "SELECT * FROM InvoiceSell ORDER BY invoiceNo DESC;"
    )
    queryResults.value = res
    // alert("select "+ res)
    // await init.sqlite.closeConnection("NoEncryption");
    return true
  }
  catch(e) {
    alert('error select invoice')
  }
}

// const data = ref<any>([])

// watch(() => queryResults.value, (first, second) => {
//       console.log(
//         "Watch props.selected function called with args:",
//         first,
//         second
//       );
// });

const refresh = (ev: CustomEvent) => {
  setTimeout(() => {
    ev.detail.complete();
  }, 3000);
};
onMounted(async () => {
  // await loadInit()
  await loadData()
})
</script>
