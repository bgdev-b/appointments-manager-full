export function formatDate(date) {
    return new Date(date).toLocaleDateString(undefined, {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
    });
}

export function formatTime(time) {
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours);
    const period = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${period}`;
}

export function formatPhone(phone) {
    // Remove all non-numeric characters
    const cleaned = String(phone).replace(/\D/g, '');

    // Format as +1-809-123-4567
    if (cleaned.length === 10) {
        return `+1-${cleaned.slice(0, 3)}-${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
    } else if (cleaned.length === 11 && cleaned[0] === '1') {
        return `+1-${cleaned.slice(1, 4)}-${cleaned.slice(4, 7)}-${cleaned.slice(7)}`;
    }

    // Return as is if format is unexpected
    return phone;
}
