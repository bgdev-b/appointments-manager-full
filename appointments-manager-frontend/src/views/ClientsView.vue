<script setup>
import { ref, onMounted } from 'vue';
import { useClients } from '../composables/useClients.js';
import { formatPhone } from '../utils/formatters.js';

const { clients, loading, error, loadClients, create, update, remove } = useClients();

const showForm = ref(false);
const editingClient = ref(null);
const formData = ref({
    name: '',
    email: '',
    phone: ''
});

onMounted(() => {
    loadClients();
});

function openForm(client = null) {
    if (client) {
        editingClient.value = client;
        formData.value = { ...client };
    } else {
        editingClient.value = null;
        formData.value = { name: '', email: '', phone: '' };
    }
    showForm.value = true;
}

function closeForm() {
    showForm.value = false;
    editingClient.value = null;
    formData.value = { name: '', email: '', phone: '' };
}

async function handleSubmit() {
    try {
        if (editingClient.value) {
            await update(editingClient.value.id, formData.value);
        } else {
            await create(formData.value);
        }
        closeForm();
    } catch (err) {
        console.error(err);
    }
}

async function handleDelete(id) {
    if (confirm('Are you sure you want to delete this client?')) {
        try {
            await remove(id);
        } catch (err) {
            console.error(err);
        }
    }
}
</script>

<template>
    <div class="clients-view">
        <header class="view-header">
            <h1>Clients</h1>
            <button class="btn btn-primary" @click="openForm()">
                Add Client
            </button>
        </header>

        <div v-if="showForm" class="form-overlay" @click.self="closeForm">
            <form class="modal-form" @submit.prevent="handleSubmit">
                <h3>{{ editingClient ? 'Edit Client' : 'New Client' }}</h3>
                
                <label>
                    Name
                    <input 
                        v-model="formData.name" 
                        type="text" 
                        required
                        placeholder="Client name"
                    />
                </label>

                <label>
                    Email
                    <input 
                        v-model="formData.email" 
                        type="email" 
                        required
                        placeholder="email@example.com"
                    />
                </label>

                <label>
                    Phone
                    <input 
                        v-model="formData.phone" 
                        type="tel" 
                        required
                        placeholder="Phone number"
                    />
                </label>

                <div class="form-actions">
                    <button type="submit" class="btn btn-primary">
                        {{ editingClient ? 'Update' : 'Create' }}
                    </button>
                    <button type="button" class="btn btn-secondary" @click="closeForm">
                        Cancel
                    </button>
                </div>
            </form>
        </div>

        <main class="view-main">
            <p v-if="loading">Loading clients...</p>
            <p v-if="error" class="error">{{ error }}</p>

            <div v-if="!loading && clients.length === 0" class="empty-state">
                <p>No clients yet. Add your first client!</p>
            </div>

            <div v-else class="clients-grid">
                <article 
                    v-for="client in clients" 
                    :key="client.id" 
                    class="client-card"
                >
                    <div class="client-info">
                        <h3>{{ client.name }}</h3>
                        <p><strong>Email:</strong> {{ client.email }}</p>
                        <p><strong>Phone:</strong> {{ formatPhone(client.phone) }}</p>
                    </div>
                    <div class="client-actions">
                        <button 
                            class="btn btn-small btn-secondary" 
                            @click="openForm(client)"
                        >
                            Edit
                        </button>
                        <button 
                            class="btn btn-small btn-cancel" 
                            @click="handleDelete(client.id)"
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
.clients-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: var(--spacing-lg);
}

.client-card {
    background: white;
    border: 1px solid var(--color-gray-200);
    border-radius: var(--radius-lg);
    padding: var(--spacing-lg);
    transition: all var(--transition-base);
}

.client-card:hover {
    box-shadow: var(--shadow-md);
    border-color: var(--color-gray-300);
}

.client-info h3 {
    margin: 0 0 var(--spacing-md);
    color: var(--color-gray-900);
}

.client-info p {
    margin: var(--spacing-xs) 0;
    color: var(--color-gray-600);
    font-size: 0.875rem;
}

.client-actions {
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