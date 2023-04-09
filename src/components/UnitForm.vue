<template>
<div>
<div style="height: 250px; overflow: auto;">
        <ion-grid>
          <ion-row v-for="(unit, i) in formUnit" :key="i">
            <ion-col>
              <ion-input v-model="unit.item" :label="'Item ' + unit.id" fill="solid" label-placement="floating"  placeholder="Item"></ion-input>
            </ion-col>
            <ion-col>
              <ion-input v-model="unit.qty" @focusout="countPrice(unit.id)" label="Qty" type="number" fill="solid"  label-placement="floating" placeholder="Quantity"></ion-input>
            </ion-col>
            <ion-col>
              <ion-input v-model="unit.price" @focusout="countPrice(unit.id)" label="$" type="number" fill="solid" label-placement="floating"  placeholder="Price"></ion-input>
            </ion-col>
        </ion-row>
      </ion-grid>
      </div>
      <div class="ion-padding">
        <ion-button color="primary" @click="addRow" >Add Row</ion-button>
      </div>
</div>
      
</template>

<script setup lang="ts">
import { reactive, defineProps } from 'vue'
import {
  IonInput,
  IonGrid,
  IonRow,
  IonCol,
  IonButton,
} from '@ionic/vue';

// interface Props {
//   formUnit: object;
// }

// console.log(props.formUnit)

const emit = defineEmits(['unitUpdate'])

interface Unit {
  id:number;
  qty:any;
  price:any;
  item:string;
}
const formUnit:Unit[] = reactive([
  {id: 1, item: '', qty: 1, price:null},
  {id: 2, item: '', qty: 1, price:null},
  {id: 3, item: '', qty: 1, price:null},
])
const addRow = () => {
  let lastId:any
  if(formUnit.length) {
    lastId = formUnit.slice(-1)[0]
     console.log(lastId.id)
  }
  else lastId = 0;
  formUnit.push({id: lastId.id + 1, item: '', qty: 1, price:null})
}

const countPrice = (id:number) => {
  let tot:any = 0
  const item:any = formUnit.find((a) => a.id == id)
  if(item != undefined && item.item === '') {
    item.price = null
    return alert('name required')
  }
  formUnit.forEach((a) => {
    if(a.price != null) return tot += parseInt(a.price) * parseInt(a.qty)
  })
  const updateUnit:Unit[] = []
  formUnit.forEach(unit=> {
    if(unit.price != null && unit.item != '') {
        updateUnit.push(unit)
    }
  })
  console.log(updateUnit)
  if(isNaN(tot)) tot = 0;
  emit('unitUpdate', {tot, updateUnit} )
}
</script>