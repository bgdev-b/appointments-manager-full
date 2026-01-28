# Appointments Management System - Frontend

Frontend SPA for managing appointments in a service-based business.

Built with **Vue 3** and focused on clean architecture, usability, accessibility (a11y), and real-world backend integration.

This frontend consumes a REST API to manage **clients**, **services**, and **appointments**.

## Tech Stack

- Vue 3 (Composition API + Options API)
- Vite
- JavaScript (ES Modules)
- HTML5 semantic elements
- CSS Variables (Design System)
- REST API consumption via Fetch
- Composables Pattern for state management

---

## Project Structure

```
src/
├── assets/
│   └── styles/         # Modular CSS architecture
│       ├── base.css           # Design system (variables, reset)
│       ├── buttons.css        # Button utilities
│       ├── forms.css          # Form components styling
│       ├── appointments.css   # Appointment cards & lists
│       └── modals.css         # Modal components
├── components/
│   └── appointments/   # Appointment feature components
│       ├── AppointmentForm.vue    # Create appointment form
│       ├── AppointmentItem.vue    # Appointment card with actions
│       └── AppointmentList.vue    # List with filters
├── composables/        # Reusable composition functions
│   ├── useAppointments.js  # Data management (CRUD operations)
│   └── useFocusTrap.js     # Accessibility focus management
├── services/
│   └── api.js          # API communication layer
├── utils/
│   └── formatters.js   # Date/time formatting utilities
├── views/
│   └── AppointmentsView.vue  # Main view (router-ready)
├── constants.js        # App-wide constants
└── main.js            # App entry point
```

## Architecture Highlights

### CSS Architecture
- **Separation of concerns**: CSS separated by feature/responsibility
- **Design tokens**: CSS variables for consistent theming
- **Responsive design**: Mobile-first approach with breakpoints
- **Accessibility**: Focus states, reduced-motion support
- **Maintainability**: Modular files instead of scoped styles for better scalability

### Composables Pattern
- `useAppointments()`: Centralized appointment data management
- `useServices()`: Service catalog access
- `useClients()`: Client list management
- `useFocusTrap()`: Reusable accessibility component for modals and forms

### Event Architecture
- Semantic event emits: `cancel`, `attend`, `reschedule` instead of generic `refresh`
- Clear component communication patterns
- Proper event bubbling and handling

---

## Backend Integration

This frontend works together with a dedicated backend API:

**Backend repository:**
https://github.com/bra0100/appointments-manager-backend

The backend provides:
- REST API endpoints
- Business rules validation
- Appointment conflict prevention
- Database persistence (SQLite)

## Accessibility (a11y)

Accessibility was considered from the beginning.

### Implemented practices:

- Semantic HTML (article, header, section, footer)
- aria-labelledby for accessible naming of appointment cards
- Live status updates with role="status" and aria-live="polite"
- Fully keyboard-accessible actions
- Accessible modal:
  - role="dialog"
  - focus trapping
  - Escape key to close
  - focus restoration on close

Accessibility decisions follow *WAI-ARIA Authoring Practices* and *MDN guidelines*.

---

## Animations

- Vue <Transition> for modal enter/leave
- Vue <TransitionGroup> for appointment list animations
- CSS-based transitions for performance and clarity

---

## Design Decisions

- Composition API for scalable logic organization
- Domain-based CSS instead of generic utility files
- Appointments treated as independent entities
- Frontend orchestrates UI and UX; business logic lives in the backend

## Future Improvements

- Vue Router for multi-view navigation
- Improved form validation feedback
- Global state management if the app scales
- UI component tests

### Future Refactor

**Composable for API Management (`useAppointments`)**

Extract appointment loading logic into a reusable composable:

```javascript
// src/composables/useAppointments.js

```

This will reduce code duplication and improve testability.

## How to run

### Development Server

```bash
npm install
npm run dev
```

Server runs at: `http://localhost:5173`

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

### Requirements
- Node.js
- npm
- Backend API running on port 3000

---

## Notes

Built as part of a full-stack architecture exercise focused on clean separation of concerns and real-world practices.
