<template>
  <q-page class="flex flex-center">
    <div class="row">
      <div class="col-12 text-h4 q-mb-xl text-center">
        The Counter
      </div>
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
          @click="decrease"
        />
      </div>
      <div class="col-12 flex flex-center q-mt-xl">
        <q-btn
          icon="refresh"
          color="primary"
          label="Reset"
          size="lg"
          @click="resetCounter"
        />
      </div>
    </div>
  </q-page>
</template>

<script>
import {
  addRaw,
  getAll,
} from 'src/services/indexedDB';

export default {
  name: 'PageIndex',
  data() {
    return {
      counter: 0,
    };
  },
  async mounted() {
    await this.getLocalSavedValue();
  },
  methods: {
    /**
     * Add record to increase counter in 1
     * and update current counter
     */
    async increase() {
      try {
        await addRaw('increase', 1);
        this.counter += 1;
      } catch (err) {
        this.$log.error(err);
        this.$q.notify('Erro ao incrementar');
      }
    },
    /**
     * Add record to decrease counter in 1
     * and update current counter
     */
    async decrease() {
      try {
        await addRaw('decrease', -1);
        this.counter -= 1;
      } catch (err) {
        this.$log.error(err);
        this.$q.notify('Erro ao decrementar');
      }
    },
    /**
     * Sum the value of all records
     *
     * @param {object[]} records An array of records
     * @return {number} The result
     */
    sumRecords(records) {
      return records.reduce((acc, record) => acc + record.value, 0);
    },
    /**
     * Get last counter value from DB
     */
    async getLocalSavedValue() {
      try {
        const records = await getAll();
        this.counter = this.sumRecords(records);
      } catch (err) {
        this.$log.error(err);
        this.$q.notify('Erro ao obter valores salvos');
      }
    },
    /**
     * Define the value needed to reset the counter
     * and keep correct history
     *
     * If the value is negative return a positive number
     * and vice-versa
     *
     * @param {number} value An integer
     * @returns {number} The value to be used on reset
     */
    defineResetValue(value) {
      if (value === 0) return 0;

      return value * -1;
    },
    /**
     * Add record to reset history and set counter to zero
     */
    async resetCounter() {
      try {
        await addRaw('reset', this.defineResetValue(this.counter));
        this.counter = 0;
      } catch (err) {
        this.$log.error(err);
        this.$q.notify('Erro ao obter valores salvos');
      }
    },
  },
};
</script>
