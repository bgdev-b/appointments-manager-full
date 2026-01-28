<template>
    <header class="app-header">
        <h1 class="app-title">Appointment Manager</h1>

        <nav aria-label="Main navigation">
            <router-link
            to="/appointments"
            class="nav-link"
            active-class="active"
            >
            Appointments
            </router-link>

            <router-link
            to="/clients"
            class="nav-link"
            active-class="active"
            >
            Clients
            </router-link>

            <router-link
            to="/services"
            class="nav-link"
            active-class="active"
            >
            Services
            </router-link>

        </nav>
    </header>
</template>