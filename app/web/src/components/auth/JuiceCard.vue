<template>
  <v-card class="text-center" variant="text">
    <v-card-title>
      <slot name="title" />
    </v-card-title>
    <v-card-text>
      <slot name="content" />
    </v-card-text>
    <div>
      <slot name="actions" />
    </div>
  </v-card>
</template>
