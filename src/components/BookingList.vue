<template>
    <template v-if="error">
        <ErrorCard :retry="getBookings">
            Failed to fetch Bookings
        </ErrorCard>
    </template>

    <template v-else >
        
        <section class="grid grid-cols-1 gap-3">
          <template v-if="!loading">
            <BookingItem
              v-for="booking in bookings"
              :key="booking.id"
              :title="booking.eventTitle"
              :status="booking.status"
              @cancelled="cancelBookings(booking.id)"
            />
          </template>
    
          <template v-else>
            <LoadingBookingCard />
          </template>
        </section>
    </template>


</template>

<script setup>

import { onMounted } from 'vue';

import LoadingBookingCard from '@/components/LoadingBookingCard.vue';

import BookingItem from '@/components/BookingItem.vue';

import ErrorCard from '@/components/ErrorCard.vue'

import useBookings from '@/composables/useBookings';

const {
  bookings,
  loading,
  getBookings,
  cancelBookings,
  error
} = useBookings()

onMounted(()=> {
    getBookings()
})



</script>