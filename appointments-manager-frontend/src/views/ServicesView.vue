<script setup>
import { ref, onMounted } from 'vue';
import { useServices } from '../composables/useServices.js';

const { services, loading, error, loadServices, create, update, remove } = useServices();

const showForm = ref(false);
const editingService = ref(null);
const formData = ref({
    name: '',
    price: ''
});

onMounted(() => {
    loadServices();
});

function openForm(service = null) {
    if (service) {
        editingService.value = service;
        formData.value = { name: service.name, price: service.price };
    } else {
        editingService.value = null;
        formData.value = { name: '', price: '' };
    }
    showForm.value = true;
}

function closeForm() {
    showForm.value = false;
    editingService.value = null;
    formData.value = { name: '', price: '' };
}

async function handleSubmit() {
    try {
        const data = {
            name: formData.value.name,
            price: parseFloat(formData.value.price)
        };

        if (editingService.value) {
            await update(editingService.value.id, data);
        } else {
            await create(data);
        }
        closeForm();
    } catch (err) {
        console.error(err);
    }
}

async function handleDelete(id) {
    if (confirm('Are you sure you want to delete this service?')) {
        try {
            await remove(id);
        } catch (err) {
            console.error(err);
        }
    }
}
</script>

<template>
    <div class="services-view">
        <header class="view-header">
            <h1>Services</h1>
            <button class="btn btn-primary" @click="openForm()">
                Add Service
            </button>
        </header>

        <div v-if="showForm" class="form-overlay" @click.self="closeForm">
            <form class="modal-form" @submit.prevent="handleSubmit">
                <h3>{{ editingService ? 'Edit Service' : 'New Service' }}</h3>
                
                <label>
                    Service Name
                    <input 
                        v-model="formData.name" 
                        type="text" 
                        required
                        placeholder="Service name"
                    />
                </label>

                <label>
                    Price ($)
                    <input 
                        v-model="formData.price" 
                        type="number" 
                        step="0.01"
                        required
                        min="0"
                        placeholder="50.00"
                    />
                </label>

                <div class="form-actions">
                    <button type="submit" class="btn btn-primary">
                        {{ editingService ? 'Update' : 'Create' }}
                    </button>
                    <button type="button" class="btn btn-secondary" @click="closeForm">
                        Cancel
                    </button>
                </div>
            </form>
        </div>

        <main class="view-main">
            <p v-if="loading">Loading services...</p>
            <p v-if="error" class="error">{{ error }}</p>

            <div v-if="!loading && services.length === 0" class="empty-state">
                <p>No services yet. Add your first service!</p>
            </div>

            <div v-else class="services-grid">
                <article 
                    v-for="service in services" 
                    :key="service.id" 
                    class="service-card"
                >
                    <div class="service-info">
                        <h3>{{ service.name }}</h3>
                        <div class="service-details">
                            <span v-if="service.duration" class="detail-badge">
                                <strong>Duration:</strong> {{ service.duration }} min
                            </span>
                            <span class="detail-badge price">
                                <strong>Price:</strong> ${{ service.price }}
                            </span>
                        </div>
                    </div>
                    <div class="service-actions">
                        <button 
                            class="btn btn-small btn-secondary" 
                            @click="openForm(service)"
                        >
                            Edit
                        </button>
                        <button 
                            class="btn btn-small btn-cancel" 
                            @click="handleDelete(service.id)"
                        >
                            Delete
                        </button>
                    </div>
                </article>
            </div>
        </main>
    </div>
</template>

<style scoped>
.services-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: var(--spacing-lg);
}

.service-card {
    background: white;
    border: 1px solid var(--color-gray-200);
    border-radius: var(--radius-lg);
    padding: var(--spacing-lg);
    transition: all var(--transition-base);
}

.service-card:hover {
    box-shadow: var(--shadow-md);
    border-color: var(--color-gray-300);
}

.service-info h3 {
    margin: 0 0 var(--spacing-md);
    color: var(--color-gray-900);
}

.service-details {
    display: flex;
    flex-wrap: wrap;
    gap: var(--spacing-sm);
    margin: var(--spacing-md) 0;
}

.detail-badge {
    display: inline-flex;
    align-items: center;
    padding: 0.25rem 0.75rem;
    background: var(--color-gray-100);
    border-radius: var(--radius-md);
    font-size: 0.875rem;
    color: var(--color-gray-700);
}

.detail-badge.price {
    background: linear-gradient(135deg, rgba(79, 70, 229, 0.1), rgba(129, 140, 248, 0.1));
    color: var(--color-primary);
    font-weight: 600;
}

.service-actions {
    display: flex;
    gap: var(--spacing-sm);
    margin-top: var(--spacing-md);
    padding-top: var(--spacing-md);
    border-top: 1px solid var(--color-gray-200);
}

.btn-small {
    padding: 0.375rem 0.75rem;
    font-size: 0.875rem;
}

.form-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
}

.modal-form {
    background: white;
    padding: var(--spacing-xl);
    border-radius: var(--radius-lg);
    max-width: 500px;
    width: 90%;
    max-height: 90vh;
    overflow-y: auto;
}

.modal-form h3 {
    margin: 0 0 var(--spacing-lg);
    color: var(--color-gray-900);
}

.modal-form label {
    display: block;
    margin-bottom: var(--spacing-md);
    font-weight: 500;
    color: var(--color-gray-700);
}

.modal-form input {
    width: 100%;
    padding: var(--spacing-sm) var(--spacing-md);
    border: 1px solid var(--color-gray-300);
    border-radius: var(--radius-md);
    font-size: 1rem;
    margin-top: var(--spacing-xs);
}

.modal-form input:focus {
    outline: none;
    border-color: var(--color-primary);
    box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
}

.form-actions {
    display: flex;
    gap: var(--spacing-sm);
    margin-top: var(--spacing-lg);
}

.empty-state {
    text-align: center;
    padding: var(--spacing-2xl);
    color: var(--color-gray-500);
}
</style>