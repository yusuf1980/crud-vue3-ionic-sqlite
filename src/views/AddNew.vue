<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar color="danger">
        <ion-buttons slot="start">
          <ion-back-button :text="getBackButtonText()" default-href="/"></ion-back-button>
        </ion-buttons>
        <h3 class="ion-text-right" style="margin-right: 10px;">Add New</h3>
      </ion-toolbar>
    </ion-header>
</ion-page>
</template>

<script setup lang="ts">
// import { useRoute } from 'vue-router';
import {
  IonBackButton,
  IonButtons,
//   IonContent,
  IonHeader,
//   IonIcon,
//   IonItem,
//   IonLabel,
//   IonNote,
  IonPage,
  IonToolbar,
} from '@ionic/vue';
// import { personCircle } from 'ionicons/icons';
// import { getMessage } from '../data/messages';

const getBackButtonText = () => {
  const win = window as any;
  const mode = win && win.Ionic && win.Ionic.mode;
  return mode === 'ios' ? 'Inbox' : '';
};

// const route = useRoute();
// const message = getMessage(parseInt(route.params.id as string, 10));
</script>