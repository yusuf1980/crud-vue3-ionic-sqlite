<template>
  <ion-page>
    
    <header-form >Add New</header-form>
    
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
import { useRouter } from 'vue-router';
import { onBeforeMount, onMounted } from 'vue'
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
import { computed } from 'vue'
import {useStore} from 'vuex'

const store = useStore();
const router = useRouter()

const form = computed(()=>store.getters.getForm)
const units = computed(()=>store.getters.getFormUnit)

interface Unit {
  orderNo:number;
  quantity:any;
  price:any;
  aName:string;
}

const addRow = async () => {
  let lastId:any
  if(units.value.length) {
    lastId = await units.value.slice(-1)[0]
  }
  else {
    const last = await store.dispatch('getLastId')
    lastId = last.values[0]
  }
  const newUnit = {orderNo: lastId.orderNo + 1, aName: '', quantity: 1, price:null};
  store.commit('addUnit', newUnit)
}

interface Update {
  tot: number;
}

const updateTotal = (val:Update) => {
  let tot:any = 0
  units.value.forEach((a:any) => {
    if(a.price != null) return tot += parseInt(a.price) * parseInt(a.quantity)
  })
  form.value.total = tot
}

const submit = async () => {
  const updateUnit:Unit[] = []
  if(units.value.length > 0) {
    units.value.forEach((unit:Unit)=> {
      if(unit.price != null && unit.aName != '') {
          updateUnit.push(unit)
      }
    })
  }
  else return

  const created = await store.dispatch('created', {form: form, units: updateUnit})
  
  if(created) {
    await store.dispatch('getInvoices')
    router.push('/home')
  }
}
onBeforeMount(()=>{
  store.commit('clearForm')
  store.commit('clearData')
})
onMounted(async()=>{
  const lastUnitId = await store.dispatch('getLastId')
  units.value[0].orderNo = lastUnitId.values[0].orderNo + 1
})
</script>

