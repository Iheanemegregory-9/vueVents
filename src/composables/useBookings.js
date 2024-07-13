import { ref } from "vue";

const bookings = ref([]);
const loading = ref(false);
const error = ref(null)

const getBookings = async () => {
    loading.value = true;
    error.value = true
    try {
      const res = await fetch('http://localhost:9001/bookings');
      bookings.value = await res.json();
    } catch(e){
      error.value = e
    } finally {
      loading.value = false;
    }
  };


  const findBookingById = (id) => bookings.value.findIndex((b) => b.id === id);


  const handleRegistration = async (event) => {
    if (bookings.value.some((booking) => booking.eventId === event.id && booking.userId === 1)) {
      alert('You are already registered for this event');
      return;
    }
  
    const newBooking = {
      id: Date.now().toString(),
      userId: 1,
      eventId: event.id,
      eventTitle: event.title,
      status: 'pending'
    };
  
    bookings.value.push(newBooking);
  
    try {
      const res = await fetch('http://localhost:9001/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...newBooking,
          status: 'confirmed'
        })
      });
  
      if (res.ok) {
        const index = findBookingById(newBooking.id);
  
        bookings.value[index] = await res.json();
      } else {
        throw new Error('Failed to confirm booking');
      }
    } catch (e) {
      console.error(`Failed to register for event: `, e);
      bookings.value = bookings.value.filter((b) => b.id != newBooking.id);
    }
  };
  
  const cancelBookings = async (bookingId) => {
    const index = findBookingById(bookingId);
    const originalBooking = bookings.value[index];
  
    bookings.value.splice(index, 1);
  
    try {
      const res = await fetch(`http://localhost:9001/bookings/${bookingId}`, {
        method: 'DELETE'
      });
  
      if (!res.ok) {
        throw new Error('Booking could not be cancelled.');
      }
    } catch (error) {
      console.error('Failed to cancel booking:', error);
  
      bookings.value.splice(index, 0, originalBooking);
    }
  };

export default function useBookings() {
    return {
        loading,
        bookings,
        getBookings,
        handleRegistration,
        cancelBookings,
        error
    }
}