<template>
  <v-card
    color="default-light-2"
  >
    <v-card-item class="pa-0">
      <div v-if="loading" class="text-center pt-16">
        <v-progress-circular indeterminate color="primary"></v-progress-circular>
      </div>
      <v-list v-else class="px-4 py-2">
          <base-list-item-transaction v-for="(transaction,index) in checks" :key="index" v-bind="transaction" />
      </v-list>
    </v-card-item>

  </v-card>
</template>
<script setup lang="ts">
  import BaseListItemTransaction from "@/components/molecules/BaseListItemTransaction.vue";
  import { type Transaction } from "@/types/Transaction";
  import {ref, onMounted } from "vue";
  import { getChecks } from "@/services/checks";

  const loading = ref(false);
  const checks : Transaction[] = ref([])

  function formatChecks(checks: []) {
    return checks.map((check: any) => {
      return {
        description: check.user.name,
        amount: check.amount,
        date: check.created_at,
        type: 'credit',
        route: `/checks/${check.id}`
      }
    })
  }
  onMounted(() => {
    loading.value = true;
    getChecks().then((res) => {
      const checksFormatted = formatChecks(res.data.data)
      checks.value.push(...checksFormatted)
    }).finally(() => {
      loading.value = false
    })
  })
</script>