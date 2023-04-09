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
        {{ queryResults }}
        <MessageListItem v-for="message in messages" :key="message.id" :message="message" />
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
import { ref, inject, onMounted } from 'vue';
// import { connect, getInvoices } from '../data/connect'

const db = ref<any>(null)
const messages = ref<Message[]>(getMessages());

const database = inject('SQLITE-DB')
const queryResults = ref<any>(null)
// alert("In home "+(database as any)?.value)

const loadData = async () => {
  try {
    const resp = await (database as any).value?.query(
      "SELECT * FROM InvoiceSell;"
    )
    queryResults.value = resp.value
    alert("error select "+queryResults.value)
    return true
  }
  catch(e) {
    alert('error loading invoice')
  }
}

const data = ref<any>([])

const refresh = (ev: CustomEvent) => {
  setTimeout(() => {
    ev.detail.complete();
  }, 3000);
};
onMounted(async () => {
  // await loadData()
})
</script>
