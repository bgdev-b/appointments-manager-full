<script>
import { ref, computed, onMounted } from 'vue';
import { useAppointments } from '../../composables/useAppointments.js';
import { useClients } from '../../composables/useAppointments.js';
import { useServices } from '../../composables/useAppointments.js';
import { useFocusTrap } from '../../composables/useFocusTrap.js';

export default {
    emits: ['created', 'cancel'],
    setup(_, {emit}) {
        const { clients } = useClients();
        const { services } = useServices();
        const { create, loading, error } = useAppointments();

        const clientId = ref('');
        const serviceId = ref('');
        const date = ref('');
        const time = ref('');

        const minDate = computed(() => {
            const today = new Date();
            return today.toISOString().split('T')[0];
        });

        const isValid = computed(() => {
            return clientId.value && serviceId.value && date.value && time.value
        });

        async function submit() {
            if (!isValid.value) {
                error.value = "All fields are required";
                return;
            }

            try {
                await create({
                    clientId: clientId.value,
                    serviceId: serviceId.value,
                    date: date.value,
                    time: time.value
                });
                
                deactivateFocusTrap();
                emit('created');
                
                clientId.value = '';
                serviceId.value = '';
                date.value = '';
                time.value = '';
            } catch (err) {
                console.error(err);
            }
        }

        const { 
            containerRef: formRef,
            activateFocusTrap,
            deactivateFocusTrap
        } = useFocusTrap({
            onEscape: () => {
                deactivateFocusTrap();
                emit('cancel');
            },
            onEnter: (event, activeElement) => {
                if (activeElement.tagName === 'INPUT' || activeElement.tagName === 'SELECT') {
                    submit();
                }
            }
        });

        onMounted(() => {
            activateFocusTrap();
        });

        return {
            formRef,
            clients,
            services,
            clientId,
            serviceId,
            date,
            isValid,
            time,
            loading,
            error,
            submit,
            minDate
        }
    }
}
</script>

<template>
    <form 
        ref="formRef"
        class="appointment-form" 
        @submit.prevent="submit"
        tabindex="-1"
    >
        <h3>Create Appointment</h3>

        <fieldset class="appointment-fieldset">
            <legend>Client & Services</legend>

            <label>
                Client
                <select v-model="clientId">
                    <option value="">Select a client</option>
                    <option
                    v-for="client in clients"
                    :key="client.id"
                    :value="client.id" 
                    >
                        {{ client.name }} - {{ client.id }}
                    </option>
                </select>
            </label>
    
            <label>
                Service
                <select v-model="serviceId">
                    <option value="">Select a service</option>
                    <option
                    v-for="service in services"
                    :key="service.id" 
                    :value="service.id"
                    >
                    {{ service.name }}
                    </option>
                </select>
            </label>
        </fieldset>

        <fieldset class="appointment-fieldset">
            <legend>Date & Time</legend>
            
            <label>
                Date
                <input type="date" v-model="date" :min="minDate" />
            </label>
    
            <label>
                Time
                <input type="time" v-model="time" />
            </label>
        </fieldset>


        <button
        type="submit" 
        class="btn btn-primary" :disabled="!isValid || loading">
            {{ loading ? 'Creating...' : 'Create Appointment' }}
        </button>

        <p v-if="error" class="error">{{ error }}</p>
    </form>
</template>