<template>

  <template v-if="error">
    <ErrorCard :retry="fetchEvents">
      Could not load event at the moment. Please try again
    </ErrorCard>
  </template>


  <template v-else>

    <section class="grid grid-cols-1 lg:grid-cols-3 gap-8">
     <template v-if="!loading">
       <template v-if="events.length">
         <EventCard v-for="event in events" :key="event.id" :title="event.title" :when="event.date"
         :description="event.description" @register="handleRegistration(event)" />
       </template>

       <template v-else>
         <div class="col-span-2 text-center text-gray-500">
           No event(s) found!
         </div>
       </template>
       
     </template>


     <template v-else>
       <LoadingEventCard v-for="i in 4" :key="i" />
     </template>
   </section>

  </template>

</template>
    
<script setup>

import useBookings from '@/composables/useBookings';

import EventCard from '@/components/EventCard.vue';

import LoadingEventCard from '@/components/LoadingEventCard.vue';

import ErrorCard from '@/components/ErrorCard.vue'

import { ref, onMounted } from 'vue';
const events = ref([]);

const loading = ref(false);

const {
  handleRegistration,
} = useBookings()



const error = ref(null)

const fetchEvents = async () => {
  loading.value = true;
  error.value = null;

  try {
    const res = await fetch('http://localhost:9001/events');
    events.value = await res.json();
  }  catch(e){
    error.value = e
  } finally {
    loading.value = false;
  }
};

onMounted(()=> {
  fetchEvents()
})
</script>