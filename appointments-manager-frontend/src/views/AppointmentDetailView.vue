<script setup>
    import { ref, onMounted, watch } from 'vue';
    import { useRoute, useRouter } from 'vue-router';
    import { getAppointmentsById, getServiceById,  } from '../services/api.js';
    import { formatDate, formatTime } from '../utils/formatters.js';

    const route = useRoute();
    const router = useRouter();

    const appointment = ref(null);
    const serviceName = ref('');
    const loading = ref(true);
    const error = ref(null);

    async function loadAppointment() {
        try {
            loading.value = true;
            error.value = null;
            const id = route.params.id;

            const data = await getAppointmentsById(id);
            appointment.value = data;

            const service = await getServiceById(data.serviceId);
            serviceName.value = service.name;
        } catch (err) {
            error.value = err.message;
        } finally {
            loading.value = false;
        }
    }

    onMounted(() => {
        loadAppointment();
    });

    watch(() => route.params.id, () => {
        loadAppointment();
    });

    function goBack() {
        router.push('/appointments');
    }
</script>

<template>
    <div class="appointment-detail">

        <button class="btn btn-secondary" @click="goBack">
            ← Back to Appointments
        </button>

        <p v-if="loading">Loading appointment...</p>
        <p v-if="error" class="error">{{ error }}</p>

        <article v-if="appointment" class="detail-card">
            <header class="detail-header">
                <h2>{{ serviceName }}</h2>
                <span 
                    class="status" 
                    :class="appointment.status"
                >
                    {{ appointment.status }}
                </span>
            </header>

            <div class="detail-content">
                <div class="detail-section">
                    <p>
                        <strong>Date:</strong>
                        {{ formatDate(appointment.date) }}
                    </p>

                    <p>
                        <strong>Time:</strong>
                        {{ formatTime(appointment.time) }}
                    </p>

                    <p>
                        <strong>Status:</strong>
                        {{ appointment.status }}
                    </p>
                </div>

                <div v-if="appointment.description" class="detail-section">
                    <h3>Description</h3>
                    <p class="description-text">{{ appointment.description }}</p>
                </div>
            </div>
        </article>
    </div>
</template>

<style scoped>
.appointment-detail {
    padding: var(--spacing-lg);
}

.detail-card {
    background: white;
    border-radius: var(--radius-lg);
    padding: var(--spacing-xl);
    margin-top: var(--spacing-lg);
    box-shadow: var(--shadow-md);
}

.detail-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: var(--spacing-xl);
    padding-bottom: var(--spacing-lg);
    border-bottom: 2px solid var(--color-gray-200);
}

.detail-header h2 {
    margin: 0;
    color: var(--color-gray-900);
    font-size: 1.875rem;
}

.detail-content {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-xl);
}

.detail-section {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-md);
}

.detail-section h3 {
    margin: 0;
    font-size: 1.125rem;
    font-weight: 600;
    color: var(--color-gray-800);
}

.detail-section p {
    margin: 0;
    color: var(--color-gray-700);
    line-height: 1.6;
}

.detail-section strong {
    color: var(--color-gray-900);
    margin-right: var(--spacing-sm);
}

.description-text {
    background: var(--color-gray-50);
    padding: var(--spacing-md);
    border-radius: var(--radius-md);
    border-left: 4px solid var(--color-primary);
}

.error {
    color: var(--color-danger);
    background: var(--color-gray-50);
    padding: var(--spacing-md);
    border-radius: var(--radius-md);
    margin-top: var(--spacing-lg);
}

@media (max-width: 768px) {
    .detail-header {
        flex-direction: column;
        gap: var(--spacing-md);
    }

    .detail-header h2 {
        font-size: 1.5rem;
    }
}
</style>