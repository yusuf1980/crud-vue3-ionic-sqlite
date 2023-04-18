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
        <MessageListItem v-for="message in data" :key="message.invoiceNo" :message="message" />
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
import { ref, computed } from 'vue';
import {useStore} from 'vuex'

const store = useStore();
store.dispatch('getInvoices')
const data = computed(()=>store.getters.getInvoices);
const messages = ref<Message[]>(getMessages());
const refresh = (ev: CustomEvent) => {
  setTimeout(() => {
    ev.detail.complete();
  }, 3000);
};
</script>
