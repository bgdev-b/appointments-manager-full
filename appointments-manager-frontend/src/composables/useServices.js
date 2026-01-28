import { ref } from 'vue';
import { getServices, createService, updateService, deleteService } from '../services/api.js';

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

    async function create(serviceData) {
        try {
            loading.value = true;
            error.value = null;
            await createService(serviceData);
            await loadServices();
        } catch (err) {
            error.value = 'Failed to create service.';
            throw err;
        } finally {
            loading.value = false;
        }
    }

    async function update(id, serviceData) {
        try {
            loading.value = true;
            error.value = null;
            await updateService(id, serviceData);
            await loadServices();
        } catch (err) {
            error.value = 'Failed to update service.';
            throw err;
        } finally {
            loading.value = false;
        }
    }

    async function remove(id) {
        try {
            loading.value = true;
            error.value = null;
            await deleteService(id);
            await loadServices();
        } catch (err) {
            error.value = 'Failed to delete service.';
            throw err;
        } finally {
            loading.value = false;
        }
    }

    return {
        services,
        loading,
        error,
        loadServices,
        create,
        update,
        remove
    };
}
