<template>
<div>
    <ion-header :translucent="true">
      <ion-toolbar color="danger">
        <ion-buttons slot="start">
          <ion-back-button default-href="/"></ion-back-button>
        </ion-buttons>
        <h3 class="ion-text-right" style="margin-right: 10px;"><slot></slot></h3>
      </ion-toolbar>
    </ion-header>
</div>
</template>

<script setup lang="ts">
  import {
    IonBackButton,
    IonButtons,
    IonHeader,
    IonToolbar,
  } from '@ionic/vue';
</script>