<template>
  <q-page class="flex flex-center">
    <div class="row">
      <div class="col-12 text-center">
        <div class="text-h1">
          {{ counter }}
        </div>
      </div>
      <div class="col-12 flex flex-center q-mt-md">
        <q-btn
          class="q-mx-md"
          round
          color="green"
          size="lg"
          icon="add"
          @click="increase"
        />
        <q-btn
          class="q-mx-md"
          round
          color="red"
          size="lg"
          icon="remove"
          :disable="disableDecrease"
          @click="decrease"
        />
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'PageIndex',
  data() {
    return {
      counter: 0,
    };
  },
  computed: {
    disableDecrease() {
      return this.counter <= 0;
    },
  },
  methods: {
    increase() {
      this.counter += 1;
    },

    decrease() {
      this.counter -= 1;
    },
  },
};
</script>
