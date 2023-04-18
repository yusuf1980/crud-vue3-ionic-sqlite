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
import { reactive, defineProps, onUpdated, watch, computed} from 'vue'
import {
  IonInput,
  IonGrid,
  IonRow,
  IonCol,
  IonButton,
} from '@ionic/vue';
import { useStore } from 'vuex';

// interface Props {
//   formUnit: object;
// }

// console.log(props.formUnit)

const store = useStore()
const units = computed(()=>store.getters.getFormUnit)
// console.log({units})

const emit = defineEmits(['unitUpdate', 'addRow'])
const props = defineProps(['items'])

interface Unit {
  orderNo:number;
  quantity:any;
  price:any;
  aName:string;
}
const formUnit:Unit[] = reactive([
  // {orderNo: 1, aName: '', quantity: 1, price:null},
  // {orderNo: 2, aName: '', quantity: 1, price:null},
  // {orderNo: 3, aName: '', quantity: 1, price:null},
])
const addRow = () => {
  emit('addRow')
  // let lastId:any
  // if(props.items.length) {
  //   lastId = props.items.slice(-1)[0]
  //    console.log(lastId.orderNo)
  // }
  // else lastId = 0;
  // props.items.push({orderNo: lastId.orderNo + 1, aName: '', quantity: 1, price:null})
}

const countPrice = (id:number) => {
  let tot:any = 0
  const item:any = formUnit.find((a) => a.orderNo == id)
  if(item != undefined && item.item === '') {
    item.price = null
    return alert('name required')
  }
  formUnit.forEach((a) => {
    if(a.price != null) return tot += parseInt(a.price) * parseInt(a.quantity)
  })
  const updateUnit:Unit[] = []
  formUnit.forEach(unit=> {
    if(unit.price != null && unit.aName != '') {
        updateUnit.push(unit)
    }
  })
  console.log(updateUnit)
  if(isNaN(tot)) tot = 0;
  emit('unitUpdate', {tot} )
}
// watch(() => props.items, (first, second) => {
//       console.log(
//         "Watch props.selected function called with args:",
//         first,
//         second
//       );
//     });

onUpdated(() => {
  // console.log('props item: ', props.items)
  //   formUnit = props.items
  //   console.log('form unit: ', formUnit)
})
</script>