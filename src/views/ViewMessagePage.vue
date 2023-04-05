<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar color="danger">
        <ion-buttons slot="start">
          <ion-back-button default-href="/"></ion-back-button>
        </ion-buttons>
        <h3 class="ion-text-right" style="margin-right: 10px;">Update</h3>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <ion-item>
        <!-- <ion-icon aria-hidden="true" :icon="personCircle" color="primary"></ion-icon> -->
        <ion-label class="ion-text-wrap">
          <h2>
            $140.00
            <span class="date">
              <ion-note>02/04/2023</ion-note>
            </span>
          </h2>
          <!-- <h3>To: <ion-note>Me</ion-note></h3> -->
        </ion-label>
      </ion-item>

      <div class="">
      <ion-grid>
        <ion-row>
          <ion-col>
              <ion-input label="Arabic Name" label-placement="floating" fill="outline" placeholder="Enter Name"></ion-input>
          </ion-col>
          <ion-col>
            <ion-input label="Phone Number" label-placement="floating" fill="outline" placeholder="+"></ion-input>
          </ion-col>
        </ion-row>
      </ion-grid>
      </div>

      <div style="height: 280px; overflow: auto;">
        <ion-grid>
          <ion-row v-for="(item, key) in 3" :key="key">
            <ion-col>
              <ion-input label="Item" fill="solid" label-placement="floating"  placeholder="Item"></ion-input>
            </ion-col>
            <ion-col>
              <ion-input label="Qty" type="number" fill="solid"  label-placement="floating" placeholder="Quantity"></ion-input>
            </ion-col>
            <ion-col>
              <ion-input label="$" type="number" fill="solid" label-placement="floating"  placeholder="Price"></ion-input>
            </ion-col>
        </ion-row>
      </ion-grid>
      </div>
      
      <div class="ion-padding">
        <ion-button color="primary">Add Row</ion-button>
      </div>

      <div class="ion-float-right">
      <ion-grid>
        <ion-row>
          <ion-col>
            <h1>Total: $0.00</h1>
          </ion-col>
        </ion-row>
      </ion-grid>
      </div>
    </ion-content>
    <ion-button expand="block">Done</ion-button>
  </ion-page>
</template>

<script setup lang="ts">
// import { useRoute } from 'vue-router';
// import { ref } from 'vue'
import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonNote,
  IonPage,
  IonToolbar,
  IonInput,
  IonGrid,
  IonRow,
  IonCol,
  IonButton,
} from '@ionic/vue';
// import { personCircle } from 'ionicons/icons';
// import { getMessage } from '../data/messages';

// const getBackButtonText = () => {
//   const win = window as any;
//   const mode = win && win.Ionic && win.Ionic.mode;
//   return mode === 'ios' ? 'Inbox' : '';
// };

// export default {
//   components: {
//     IonBackButton,
//     IonButtons,
//     IonContent,
//     IonHeader,
//     IonItem,
//     IonLabel,
//     IonNote,
//     IonPage,
//     IonToolbar,
//     IonInput,
//     IonGrid,
//     IonRow,
//     IonCol,
//     IonButton,
//   },
//   setup() {
//     const count = ref(0)

//     // expose to template and other options API hooks
//     return {
//       count
//     }
//   },

  // mounted() {
  //   console.log(this.count) // 0
  // }
// }

// const route = useRoute();
// const message = getMessage(parseInt(route.params.id as string, 10));

// let itemCount = 3;
</script>

<style scoped>
ion-item {
  --inner-padding-end: 0;
  --background: transparent;
}

ion-label {
  margin-top: 12px;
  margin-bottom: 12px;
}

ion-item h2 {
  font-weight: 600;
}

ion-item .date {
  float: right;
  align-items: center;
  display: flex;
}

ion-item ion-icon {
  font-size: 42px;
  margin-right: 8px;
}

ion-item ion-note {
  font-size: 15px;
  margin-right: 12px;
  font-weight: normal;
}

h1 {
  margin: 0;
  font-weight: bold;
  font-size: 22px;
}

p {
  line-height: 22px;
}
</style>
