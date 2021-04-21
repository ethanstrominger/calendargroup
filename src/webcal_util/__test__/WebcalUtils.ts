export function addTimezoneIfAbsent(timeString: string, defaultTimezone: string) {
    if (timeString.includes('TZID')) {
        return timeString;
    }

    const timeStringComponents = timeString.split(":");
    const prefix = timeStringComponents[0];
    let dateString = timeStringComponents[1];
    dateString = dateString.substring(0, dateString.length - 1);
    return prefix + ";TZID=" + defaultTimezone + ":" + dateString;
}

export function updateEventDescription(descriptionWithPrefix: string, filename: string) {
    const descriptionComponents = descriptionWithPrefix.split(":");
    const prefix = descriptionComponents[0];
    const description = descriptionComponents[1].trim();
    return `${prefix}: ${filename}\n\n${description}`;

}
