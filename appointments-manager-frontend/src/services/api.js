const API_URL = 'http://localhost:3000';

export async function getAppointments(status) {
    const url = status
        ? `${API_URL}/appointments?status=${status}`
        : `${API_URL}/appointments`;

    const response = await fetch(url);
    if (!response.ok) {
        throw new Error('Failed to fetch appointments');
    }
    return response.json();
}

export async function getAppointmentsById(id) {
    const response = await fetch(`${API_URL}/appointments/${id}`);
    if (!response.ok) throw new Error('Appointment not found');
    return response.json();
}

export async function cancelAppointment(appointmentId) {
    const response =
        await fetch(`${API_URL}/appointments/${appointmentId}/cancel`, {
            method: 'PATCH',
        });
    if (!response.ok) {
        throw new Error('Failed to cancel appointment');
    }
}

export async function attendAppointment(appointmentId) {
    const response =
        await fetch(`${API_URL}/appointments/${appointmentId}/attend`, {
            method: `PATCH`,
        });
    if (!response.ok) {
        throw new Error('Failed to attend appointment');
    }
}

export async function rescheduleAppointment(appointmentId, { date, time }) {
    const response =
        await fetch(`${API_URL}/appointments/${appointmentId}/reschedule`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ date, time }),
        });
    if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error || 'Failed to reschedule appointment');
    }
}

export async function getClients() {
    const response = await fetch(`${API_URL}/clients`);
    if (!response.ok) {
        throw new Error('Failed to fetch clients');
    }
    return response.json();
}

export async function getClientById(id) {
    const response = await fetch(`${API_URL}/clients/${id}`);
    if (!response.ok) {
        throw new Error('Failed to fetch client');
    }
    return response.json();
}

export async function createClient(data) {
    const response = await fetch(`${API_URL}/clients`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });
    if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error || 'Failed to create client');
    }
    return response.json();
}

export async function updateClient(id, data) {
    const response = await fetch(`${API_URL}/clients/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });
    if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error || 'Failed to update client');
    }
    return response.json();
}

export async function deleteClient(id) {
    const response = await fetch(`${API_URL}/clients/${id}`, {
        method: 'DELETE',
    });
    if (!response.ok) {
        throw new Error('Failed to delete client');
    }
}

export async function getServices() {
    const response = await fetch(`${API_URL}/services`);
    if (!response.ok) {
        throw new Error('Failed to fetch services');
    }
    return response.json();
}

export async function getServiceById(id) {
    const response = await fetch(`${API_URL}/services/${id}`)
    if (!response.ok) {
        throw new Error('Failed to fetch service')
    }
    return response.json();
}

export async function createService(data) {
    const response = await fetch(`${API_URL}/services`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });
    if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error || 'Failed to create service');
    }
    return response.json();
}

export async function updateService(id, data) {
    const response = await fetch(`${API_URL}/services/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });
    if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error || 'Failed to update service');
    }
    return response.json();
}

export async function deleteService(id) {
    const response = await fetch(`${API_URL}/services/${id}`, {
        method: 'DELETE',
    });
    if (!response.ok) {
        throw new Error('Failed to delete service');
    }
}

export async function createAppointment(data) {
    const response = await fetch(`${API_URL}/appointments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    })
    if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error || 'Failed to create appointment');
    }

    return response.json();
}

