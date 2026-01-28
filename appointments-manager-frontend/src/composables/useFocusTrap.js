import { ref, onBeforeUnmount } from 'vue';

export function useFocusTrap(options = {}) {
    const containerRef = ref(null);
    const firstFocusableRef = ref(null);
    let lastFocusedElement = null;
    let isActive = false;

    const FOCUSABLE_ELEMENTS_SELECTOR =
        'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

    function handleKeydown(event) {
        if (!isActive || !containerRef.value) return;

        if (event.key === 'Escape') {
            if (options.onEscape) {
                event.preventDefault();
                options.onEscape(event);
            }
            return;
        }

        if (event.key === 'Enter') {
            if (options.onEnter) {
                const { activeElement } = document;

                if (activeElement.tagName !== 'TEXTAREA' && activeElement.tagName !== 'BUTTON') {
                    event.preventDefault();
                    options.onEnter(event, activeElement);
                }
            }
            return;
        }

        if (event.key !== 'Tab') return;

        const focusableElements = containerRef.value.querySelectorAll(
            FOCUSABLE_ELEMENTS_SELECTOR
        );

        if (focusableElements.length === 0) return;

        const first = focusableElements[0];
        const last = focusableElements[focusableElements.length - 1];
        const active = document.activeElement;

        if (!containerRef.value.contains(active)) {
            event.preventDefault();
            first.focus();
            return;
        }


        if (event.shiftKey) {
            if (active === first) {
                event.preventDefault();
                last.focus();
            }
        } else if (active === last) {
            event.preventDefault();
            first.focus();
        }
    }

    function activateFocusTrap() {
        if (isActive) return;

        isActive = true;
        lastFocusedElement = document.activeElement;

        setTimeout(() => {
            if (!containerRef.value) return;

            const firstFocusable = firstFocusableRef.value ||
                containerRef.value.querySelector(FOCUSABLE_ELEMENTS_SELECTOR);

            if (firstFocusable) {
                firstFocusable.focus();
            } else {
                containerRef.value.focus();
            }

            document.addEventListener('keydown', handleKeydown, true);
        }, 0);
    }

    function deactivateFocusTrap() {
        if (!isActive) return;

        isActive = false;
        document.removeEventListener('keydown', handleKeydown, true);

        if (lastFocusedElement && document.body.contains(lastFocusedElement)) {
            lastFocusedElement.focus();
        }
    }
    onBeforeUnmount(() => {
        deactivateFocusTrap();
    });

    return {
        containerRef,
        firstFocusableRef,
        activateFocusTrap,
        deactivateFocusTrap,
    };
}
