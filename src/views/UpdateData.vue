<template>
  <ion-page>
    
    <header-form >Update</header-form>
    
    <ion-content :fullscreen="true">
      <ion-item>
        <ion-label class="ion-text-wrap">
          <h2>
            $ {{form.total}}
            <span class="date" v-if="message!=undefined">
              <ion-note>{{ message.date }}</ion-note>
            </span>
          </h2>
        </ion-label>
      </ion-item>

      <div>
      <ion-grid>
        <ion-row>
          <ion-col>
              <ion-input v-model="form.name" label="Arabic Name" label-placement="floating" fill="outline" placeholder="Enter Name"></ion-input>
          </ion-col>
          <ion-col>
            <ion-input v-model="form.phone" label="Phone Number" label-placement="floating" fill="outline" placeholder="+"></ion-input>
          </ion-col>
        </ion-row>
      </ion-grid>
      </div>

      <unit-form
      :formUnit="formUnit"
      @unitUpdate="updateTotal"
      /> 

      <div class="ion-float-right">
      <ion-grid>
        <ion-row>
          <ion-col>
            <h1>Total: ${{ form.total }}</h1>
          </ion-col>
        </ion-row>
      </ion-grid>
      </div>
    </ion-content>
    <ion-button @click="submit" expand="block">Done</ion-button>
  </ion-page>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import { reactive } from 'vue'
import { getMessage, Message } from '../data/messages';
import {
  IonItem,
  IonLabel,
  IonNote,
  IonPage,
  IonContent,
  IonInput,
  IonGrid,
  IonRow,
  IonCol,
  IonButton,
} from '@ionic/vue';
import UnitForm from '@/components/UnitForm.vue';
import HeaderForm from '@/components/HeaderForm.vue';

interface Obj {
  rows:number;
}
const state:Obj =  reactive({
  rows: 3,
})
const form: Message = reactive({
  name: '',
  phone: '',
  date: '2023/04/02',
  total: 0,
})
interface Unit {
  id:number;
  qty:any;
  price:any;
  item:string;
}
let formUnit:Unit[] = reactive([])

const route = useRoute();
const message = getMessage(parseInt(route.params.id as string, 10))
if(message != undefined) {
  form.name = message.name
  form.phone = message.phone
  form.date = message.date
  form.total = message.total
}
interface Update {
  tot: number;
  updateUnit: any
}

const updateTotal = (val:Update) => {
  form.total = val.tot
  formUnit = val.updateUnit
  console.log(formUnit)
}

const submit = () => {
  if(formUnit.length > 0) {
    if(form.name === '') form.name = "Unknow"
    // form.date = new Date().getDate().toString()
    console.log(form)
  }
}
</script>

