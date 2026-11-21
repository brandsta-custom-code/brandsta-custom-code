<!-- app/app.vue -->
<script setup lang="ts">
import { onMounted } from 'vue'
import { useHead } from 'nuxt/app'

useHead({
  script: [
    {
      key: 'scroll-reset-top',
      innerHTML:
        "if ('scrollRestoration' in history) { history.scrollRestoration = 'manual'; } window.scrollTo(0, 0);",
      tagPosition: 'head',
    },
  ],
})

onMounted(() => {
  if ('scrollRestoration' in window.history) {
    window.history.scrollRestoration = 'manual'
  }
  window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
})
</script>

<template>
  <NuxtPage />
</template>