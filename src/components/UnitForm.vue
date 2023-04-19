<template>
<div>
<div style="height: 250px; overflow: auto;">
        <ion-grid>
          <ion-row v-for="(unit, i) in units" :key="i">
            <ion-col>
              <ion-input v-model="unit.aName" :label="'Item ' + (i+1)" fill="solid" label-placement="floating"  placeholder="Item"></ion-input>
            </ion-col>
            <ion-col>
              <ion-input v-model="unit.quantity" @focusout="countPrice(unit.orderNo)" label="Qty" type="number" fill="solid"  label-placement="floating" placeholder="Quantity"></ion-input>
            </ion-col>
            <ion-col>
              <ion-input v-model="unit.price" @focusout="countPrice(unit.orderNo)" label="$" type="number" fill="solid" label-placement="floating"  placeholder="Price"></ion-input>
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
import { computed, defineEmits } from 'vue'
import {
  IonInput,
  IonGrid,
  IonRow,
  IonCol,
  IonButton,
} from '@ionic/vue';
import { useStore } from 'vuex';
const store = useStore()
const units = computed(()=>store.getters.getFormUnit)

const emit = defineEmits(['unitUpdate', 'addRow'])

interface Unit {
  orderNo:number;
  quantity:any;
  price:any;
  aName:string;
}
const addRow = () => emit('addRow')

const countPrice = (id:number) => {
  let tot:any = 0
  const item:any = units.value.find((a:Unit) => a.orderNo == id)
  if(item != undefined && item.item === '') {
    item.price = null
    return alert('name required')
  }
  units.value.forEach((a:Unit) => {
    if(a.price != null) return tot += parseInt(a.price) * parseInt(a.quantity)
  })
  const updateUnit:Unit[] = []
  units.value.forEach((unit:Unit)=> {
    if(unit.price != null && unit.aName != '') {
        updateUnit.push(unit)
    }
  })
  if(isNaN(tot)) tot = 0;
  emit('unitUpdate', {tot} )
}
</script>