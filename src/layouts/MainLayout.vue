<template>
  <q-layout view="hHh lpR fFf">
    <q-page-container>
      <div class="float-left q-pa-sm text-weight-medium">
        Storage usage: {{ storageUsage }}%
      </div>
      <div class="float-right">
        <q-toggle
          left-label
          label="Dark Mode"
          :value="darkStatus"
          @input="changeDarkMode"
        />
      </div>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>

export default {
  name: 'MainLayout',
  data() {
    return {
      storageUsage: 0,
    };
  },
  computed: {
    darkStatus() {
      return this.$q.dark.isActive;
    },
  },
  mounted() {
    this.getStorageUsage();
  },
  methods: {
    changeDarkMode(val) {
      this.$q.dark.set(val);
    },
    /**
     * Get current storage data from navigator
     */
    async getStorageUsage() {
      try {
        const result = await navigator.storage.estimate();
        this.storageUsage = (result.usage / result.quota * 100).toFixed(6);
      } catch (err) {
        this.$log.error(err);
      }
    },
  },
};
</script>
