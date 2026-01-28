import { createRouter, createWebHistory } from "vue-router";
import AppointmentsView from "../views/AppointmentsView.vue";
import AppointmentDetailView from "../views/AppointmentDetailView.vue";

const routes = [
    {
        path: "/",
        redirect: '/appointments'
    },
    {
        path: '/appointments',
        name: 'appointments',
        component: AppointmentsView,
        meta: { transition: 'fade' }
    },
    {
        path: '/appointments/:id',
        name: 'appointment-detail',
        component: AppointmentDetailView,
        props: true,
        meta: { transition: 'fade' }
    },
    {
        path: '/clients',
        component: () => import('../views/ClientsView.vue')
    },
    {
        path: '/services',
        component: () => import('../views/ServicesView.vue')
    }

]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router;