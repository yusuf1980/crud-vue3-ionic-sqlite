<template>
  <ion-page>
    
    <header-form >Update</header-form>
    
    <ion-content :fullscreen="true">
      <ion-item>
        <ion-label class="ion-text-wrap">
          <h2>
            $ {{form.total}}
            <span class="date">
              <ion-note>{{ form.date }}</ion-note>
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
      @unitUpdate="updateTotal"
      @addRow="addRow"
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
import { useRoute, useRouter } from 'vue-router';
import { reactive } from 'vue'
// import { getMessage, Message } from '../data/messages';
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
import {initDb} from '../query/init'
import { ref, watch, computed } from 'vue'
import {useStore} from 'vuex'
// import router from '@/router';

const store = useStore();

const formUnit:Unit[] = reactive([])

const route = useRoute();
const router = useRouter()
const id = route.params.id;

store.dispatch('getInvoice', id)

const form = computed(()=>store.getters.getForm)
const units = computed(()=>store.getters.getFormUnit)

interface Obj {
  rows:number;
}
const state:Obj =  reactive({
  rows: 3,
})

// const form: Message = reactive({
//   name: '',
//   phone: '',
//   date: '2023/04/02',
//   total: 0,
// })
interface Unit {
  orderNo:number;
  quantity:any;
  price:any;
  aName:string;
}

const queryResult = ref<any>(null)
const items = reactive<any>([
  // {orderNo: 1, aName: '', quantity: 1, price:null},
  // {orderNo: 2, aName: '', quantity: 1, price:null},
  // {orderNo: 3, aName: '', quantity: 1, price:null},
])

// watch(() => items, (first, second) => {
//       console.log(
//         "Watch props.selected function called with args:",
//         first,
//         second
//       );
//     });

const addRow = async () => {
  let lastId:any
  if(units.value.length) {
    lastId = await units.value.slice(-1)[0]
  }
  else {
    const last = await store.dispatch('getLastId')
    lastId = last.values[0]
    console.log({lastId})
  }
  const newUnit = {orderNo: lastId.orderNo + 1, aName: '', quantity: 1, price:null};
  store.commit('addUnit', newUnit)
}

// const message = getMessage(parseInt(route.params.id as string, 10))

interface Update {
  tot: number;
  // updateUnit: 
}

const updateTotal = (val:Update) => {
  let tot:any = 0
  units.value.forEach((a:any) => {
    if(a.price != null) return tot += parseInt(a.price) * parseInt(a.quantity)
  })
  form.value.total = tot
}

const submit = async () => {
  console.log('submit')
  const updateUnit:Unit[] = []
  if(units.value.length > 0) {
    units.value.forEach((unit:Unit)=> {
      if(unit.price != null && unit.aName != '') {
          updateUnit.push(unit)
      }
    })
  }
  else return

  const update = await store.dispatch('updateInvoice', {form: form, units: updateUnit, id:id})
  
  if(update) {
    // store.commit('clearData')
    await store.dispatch('getInvoices')
    router.push('/home')
  }
}
</script>

