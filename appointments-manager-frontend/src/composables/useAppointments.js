import { ref, computed, onMounted } from 'vue';
import {
    getAppointments,
    getClients,
    getServices,
    createAppointment,
    cancelAppointment,
    attendAppointment,
    rescheduleAppointment
} from '../services/api.js';

export function useAppointments(statusFilter = ref('')) {
    const appointments = ref([]);
    const loading = ref(false);
    const error = ref(null);

    async function loadAppointments() {
        try {
            loading.value = true;
            error.value = null;

            const data = await getAppointments(statusFilter.value);
            appointments.value = data;
        } catch (err) {
            error.value = 'Failed to load appointments.';
            console.error(err);
        } finally {
            loading.value = false;
        }
    }

    async function create(appointmentData) {
        try {
            loading.value = true;
            error.value = null;

            await createAppointment(appointmentData);
            await loadAppointments();
        } catch (err) {
            error.value = 'Failed to create appointment.';
            throw err;
        } finally {
            loading.value = false;
        }
    }

    async function cancel(appointmentId) {
        try {
            loading.value = true;
            error.value = null;

            await cancelAppointment(appointmentId);
            await loadAppointments();
        } catch (err) {
            error.value = 'Failed to cancel appointment.';
            throw err;
        } finally {
            loading.value = false;
        }
    }

    async function attend(appointmentId) {
        try {
            loading.value = true;
            error.value = null;

            await attendAppointment(appointmentId);
            await loadAppointments();
        } catch (err) {
            error.value = 'Failed to mark appointment as attended.';
            throw err;
        } finally {
            loading.value = false;
        }
    }

    async function reschedule(appointmentId, newDateTime) {
        try {
            loading.value = true;
            error.value = null;

            await rescheduleAppointment(appointmentId, newDateTime);
            await loadAppointments();
        } catch (err) {
            error.value = 'Failed to reschedule appointment.';
            throw err;
        } finally {
            loading.value = false;
        }
    }

    return {
        appointments,
        loading,
        error,
        loadAppointments,
        create,
        cancel,
        attend,
        reschedule
    };
}

export function useServices() {
    const services = ref([]);
    const loading = ref(false);
    const error = ref(null);

    async function loadServices() {
        try {
            loading.value = true;
            error.value = null;

            const data = await getServices();
            services.value = data;
        } catch (err) {
            error.value = 'Failed to load services.';
            console.error(err);
        } finally {
            loading.value = false;
        }
    }

    const servicesMap = computed(() => {
        const map = {};
        for (const service of services.value) {
            map[service.id] = service.name;
        }
        return map;
    });

    onMounted(loadServices);

    return {
        services,
        servicesMap,
        loading,
        error,
        loadServices
    };
}

export function useClients() {
    const clients = ref([]);
    const loading = ref(false);
    const error = ref(null);

    async function loadClients() {
        try {
            loading.value = true;
            error.value = null;

            const data = await getClients();
            clients.value = data;
        } catch (err) {
            error.value = 'Failed to load clients.';
            console.error(err);
        } finally {
            loading.value = false;
        }
    }

    onMounted(loadClients);

    return {
        clients,
        loading,
        error,
        loadClients
    };
}
