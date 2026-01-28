<script>
import { useAppointments } from '../../composables/useAppointments.js';
import { useFocusTrap } from '../../composables/useFocusTrap.js';
import { ref, nextTick } from 'vue';
import { APPOINTMENT_STATUS } from '../../constants';
import { formatDate, formatTime } from '../../utils/formatters';

export default {
    props: {
        appointment: Object,
        serviceName: String
    },
    emits: ['cancel', 'attend', 'reschedule'],

    setup(props, { emit }) {
        const appointmentsComposable = useAppointments();

        const showModal = ref(false);
        const date = ref('');
        const time = ref('');
        const error = ref('');
        
        function closeModal() {
            showModal.value = false;
            deactivateFocusTrap();
        }

        async function reschedule() {
            try {
                error.value = null;

                await appointmentsComposable.reschedule(props.appointment.id, {
                    date: date.value,
                    time: time.value
                });

                showModal.value = false;
                emit('reschedule');
            } catch (err) {
                error.value = err.message;
            }
        }

        const { 
            containerRef: modalRef, 
            firstFocusableRef: dateInputRef,
            activateFocusTrap,
            deactivateFocusTrap 
        } = useFocusTrap({
            onEscape: closeModal,
            onEnter: (event, activeElement) => {
                if (activeElement.tagName === 'INPUT') {
                    reschedule();
                }
            }
        });
        
        function openModal() {
            error.value = null;
            date.value = props.appointment.date;
            time.value = props.appointment.time;
            showModal.value = true;

            nextTick(() => {
                activateFocusTrap();
            });
        }

        async function cancel() {
            try {
                await appointmentsComposable.cancel(props.appointment.id);
                emit('cancel');
            } catch (err) {
                console.error(err);
            }
        }

        async function attend() {
            try {
                await appointmentsComposable.attend(props.appointment.id);
                emit('attend');
            } catch (err) {
                console.error(err);
            }
        }

        return { 
            cancel, 
            attend, 
            formatDate,
            formatTime,
            reschedule, 
            showModal, 
            date, 
            time, 
            error, 
            openModal, 
            closeModal,
            APPOINTMENT_STATUS,
            dateInputRef,
            modalRef,
        };  
    }
}
</script>

<template>
    <article
        class="appointment-card"
        :aria-labelledby="`appointment-${appointment.id}`"
    >
        <router-link
            :to="`/appointments/${appointment.id}`"
            class="appointment-link"
        >
            <header class="appointment-header">
                <h3
                    class="service-name"
                    :id="`appointment-${appointment.id}`"
                >
                    {{ serviceName }}
                </h3>
    
                <span
                    class="status"
                    :class="appointment.status"
                    role="status"
                    aria-live="polite"
                >
                    {{ appointment.status }}
                </span>
            </header>
    
            <section class="appointment-datetime">
                <p>
                    <time :datetime="appointment.date">
                        {{ formatDate(appointment.date) }}
                    </time>
                </p>
    
                <p>
                    <time>
                        {{ formatTime(appointment.time) }}
                    </time>
                </p>
            </section>
        </router-link>

        <footer class="appointment-actions">
            <button
                v-if="appointment.status === APPOINTMENT_STATUS.PENDING"
                class="btn btn-attend"
                @click="attend"
                aria-label="Mark appointment as attended"
            >
                Attend
            </button>

            <button
                v-if="appointment.status === APPOINTMENT_STATUS.PENDING"
                class="btn btn-reschedule"
                @click="openModal"
                aria-label="Reschedule appointment"
            >
                Reschedule
            </button>

            <button
                v-if="appointment.status === APPOINTMENT_STATUS.PENDING"
                class="btn btn-cancel"
                @click="cancel"
                aria-label="Cancel appointment"
            >
                Cancel
            </button>
        </footer>
    </article>

    <Teleport to="body">
        <Transition name="modal">
            <div 
                v-if="showModal" 
                class="modal"
                @click.self="closeModal"
            >
                <div 
                    ref="modalRef"
                    class="modal-content"
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="reschedule-title"
                    tabindex="-1"
                >
                    <h3 id="reschedule-title">Reschedule Appointment</h3>

                    <p class="service-label">{{ serviceName }}</p>

                    <div class="current-info">
                        <p><strong>Current date:</strong> {{ formatDate(appointment.date) }}</p>
                        <p><strong>Current time:</strong> {{ appointment.time }}</p>
                    </div>

                    <div class="datetime-group">
                        <label>
                            New date
                            <input
                                ref="dateInputRef" 
                                type="date" 
                                v-model="date"
                            />
                        </label>

                        <label>
                            New time
                            <input type="time" v-model="time"/>
                        </label>
                    </div>

                    <p v-if="error" class="error">{{ error }}</p>

                    <div class="modal-action">
                        <button class="btn btn-primary" @click="reschedule">
                            Save changes
                        </button>
                        <button class="btn btn-secondary" @click="closeModal">
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </Transition>
    </Teleport>
</template>
