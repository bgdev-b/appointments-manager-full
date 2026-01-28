    <script setup>
    import { ref } from 'vue';
    import AppointmentList from '../components/appointments/AppointmentList.vue';
    import AppointmentForm from '../components/appointments/AppointmentForm.vue';
    
    const showForm = ref(false);
    const listRef = ref(null);

    function toggleForm() {
        showForm.value = !showForm.value;
    }

    function handleCreated() {
        showForm.value = false;
        listRef.value?.loadAppointments()
    }
    </script>

    <template>
    <div class="appointments-view">
        <header class="view-header">
        <h1>Appointment Manager</h1>
        <button 
            class="btn btn-primary"
            @click="toggleForm"
        >
            {{ showForm ? "Close Form" : "Create Appointment" }}
        </button>
        </header>

        <AppointmentForm
        v-if="showForm"
        @created="handleCreated"
        @cancel="toggleForm"
        />

        <main class="view-main">
        <h2>Appointments</h2>
        <AppointmentList ref="listRef" />
        </main>
    </div>
    </template>
