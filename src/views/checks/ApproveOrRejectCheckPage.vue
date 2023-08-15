<template>
  <div v-if="loading" class="text-center pt-16">
    <v-progress-circular indeterminate color="primary"></v-progress-circular>
  </div>
  <v-card v-else class="pa-0">
    <div class="px-4 flex-column justify-space-between">
      <v-row class="pt-4">
        <v-col cols="12" class="pb-0">
          <v-label class="text-xs text-primary-light-1 text-uppercase font-weight-bold">
            <v-icon
                size="20"
                :icon="mdiAccount"
            >
            </v-icon>
            <p class="pl-3">Customer</p>
          </v-label>
        </v-col>
        <v-col cols="12" class="py-0 pl-11">
          <p class="text-md text-primary">
            {{ check.user.name }}
          </p>
        </v-col>
        <v-col cols="12" class="pb-0">
          <v-label class="text-xs text-primary-light-1 text-uppercase font-weight-bold">
            <v-icon
                size="20"
                :icon="mdiEmail"
            >
            </v-icon>
            <p class="pl-3">Customer email</p>
          </v-label>
        </v-col>
        <v-col cols="12" class="py-0 pl-11">
          <div class="d-flex align-center justify-space-between">
            <p class="text-md text-primary">
              {{ check.user.email }}
            </p>
            <v-btn
                variant="text"
            >
              <v-icon
                  size="20"
                  :icon="mdiChevronRight"
              >
              </v-icon>
            </v-btn>
          </div>
        </v-col>
        <v-col cols="12" class="pb-0">
          <v-label class="text-xs text-primary-light-1 text-uppercase font-weight-bold">
            <v-icon
                size="20"
                :icon="mdiFile"
            >
            </v-icon>
            <p class="pl-3">Account</p>
          </v-label>
        </v-col>
        <v-col cols="12" class="py-0 pl-11">
          <div class="d-flex align-center justify-space-between">
            <p class="text-md text-primary">
              {{ check.user.account.id }}
            </p>
            <v-btn
                variant="text"
            >
              <v-icon
                  size="20"
                  :icon="mdiChevronRight"
              >
              </v-icon>
            </v-btn>
          </div>
        </v-col>
        <v-col cols="12" class="pb-0">
          <v-label class="text-xs text-primary-light-1 text-uppercase font-weight-bold">
            <v-icon
                size="20"
                :icon="mdiCash100"
            >
            </v-icon>
            <p class="pl-3">Reported amount</p>
          </v-label>
        </v-col>
        <v-col cols="12" class="py-0 pl-11">
            <p class="text-md text-primary">
              {{ formatValueToLocaleCurrency(check.amount) }}
            </p>
        </v-col>

      </v-row>
    </div>
    <div class="upload-area pa-4 mt-4">
      <v-img
          height="100%"
          cover
          :src="check.file_url"
      ></v-img>
    </div>
    <v-row class="button-end-page pa-4">
      <v-col>
        <v-btn
            class="text-xxs text-uppercase py-3"
            variant="outlined"
            color="primary"
            width="100%"
            height="100%"
            elevation="0"
            @click="approveOrReject('rejected')"
        >
          <v-icon :icon="mdiAlphaXCircle"></v-icon>
          <p class="font-weight-bold">Reject</p>
        </v-btn>
      </v-col>
      <v-col>
        <v-btn
            class="text-xxs text-uppercase py-3"
            color="primary"
            width="100%"
            height="100%"
            elevation="0"
            @click="approveOrReject('approved')"
        >
          <v-icon :icon="mdiCheckCircle"></v-icon>
          <p class="font-weight-bold">Accept</p>
        </v-btn>
      </v-col>
    </v-row>
  </v-card>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { getCheck, approveOrRejectCheck } from "@/services/checks";
import { mdiAccount, mdiEmail, mdiChevronRight, mdiFile, mdiCash100, mdiCheckCircle, mdiAlphaXCircle } from '@mdi/js'
import { formatValueToLocaleCurrency } from '@/utils/formats'
const props = defineProps<{
  id: string
}>()

const loading = ref(false)
const router = useRouter()

interface Account {
  id: number
}

interface User {
  id: number;
  name: string;
  email: string;
  account: Account
}

interface Check {
  id: number;
  amount: number;
  file_url: string;
  user: User,
  created_at: string
}

const check: Check = ref({
  id: 0,
  amount: 0.0,
  file_url: '',
  created_at: '',
  user: {
    id: 0,
    name: '',
    email: '',
    account: {
      id: 0
    }
  }
})

onMounted(() => {
  loading.value = true
  getCheck(props.id).then((res) => {
    check.value = res.data.data
  }).finally(() => {
    loading.value = false
  })
})

type StatusCheck = 'approved' | 'rejected';

function approveOrReject(status: StatusCheck) {
  approveOrRejectCheck(props.id, status).then(() => {
    router.push({ name: 'checks' })
  })
}

</script>



<style lang="scss">

  .upload-area {
    max-height: 160px;
    max-width: 400px;
  }

  .button-end-page {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
  }

</style>