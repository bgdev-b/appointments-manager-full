import { ref } from 'vue';
import { getClients, createClient, updateClient, deleteClient } from '../services/api.js';

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

    async function create(clientData) {
        try {
            loading.value = true;
            error.value = null;
            await createClient(clientData);
            await loadClients();
        } catch (err) {
            error.value = 'Failed to create client.';
            throw err;
        } finally {
            loading.value = false;
        }
    }

    async function update(id, clientData) {
        try {
            loading.value = true;
            error.value = null;
            await updateClient(id, clientData);
            await loadClients();
        } catch (err) {
            error.value = 'Failed to update client.';
            throw err;
        } finally {
            loading.value = false;
        }
    }

    async function remove(id) {
        try {
            loading.value = true;
            error.value = null;
            await deleteClient(id);
            await loadClients();
        } catch (err) {
            error.value = 'Failed to delete client.';
            throw err;
        } finally {
            loading.value = false;
        }
    }

    return {
        clients,
        loading,
        error,
        loadClients,
        create,
        update,
        remove
    };
}
