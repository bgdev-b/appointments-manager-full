
<script>
    import { ref, watch, onMounted } from 'vue';
    import { useServices, useAppointments } from '../../composables/useAppointments.js';
    import AppointmentItem from './AppointmentItem.vue';
    import { APPOINTMENT_STATUS } from '../../constants';

    export default {
        components: {
            AppointmentItem,
        },
        setup() {
            const statusFilter = ref('');
            
            const { appointments, loading, error, loadAppointments } = useAppointments(statusFilter);
            const { servicesMap } = useServices();

            onMounted(loadAppointments);

            watch(statusFilter, loadAppointments);

            return {
                appointments,
                statusFilter,
                servicesMap,
                loading,
                error,
                loadAppointments,
                APPOINTMENT_STATUS,
            };
        },
    };
</script>

<template>
    <div>

        <select v-model="statusFilter" @change="loadAppointments">
            <option value="">All</option>
            <option :value="APPOINTMENT_STATUS.PENDING">Pending</option>
            <option :value="APPOINTMENT_STATUS.ATTENDED">Attended</option>
            <option :value="APPOINTMENT_STATUS.CANCELED">Canceled</option>
        </select>

        <TransitionGroup 
        name="list"
        tag="div"
        class="appointments-list"
        >
            <AppointmentItem
                v-for="appointment in appointments"
                :key="appointment.id"
                :appointment="appointment"
                :serviceName="servicesMap?.[appointment.serviceId] || 'Unknown service'"
                @cancel="loadAppointments"
                @attend="loadAppointments"
                @reschedule="loadAppointments"
            />
        </TransitionGroup>

        <p v-if="error" style="color: red;">{{ error }}</p>
    </div>
</template>