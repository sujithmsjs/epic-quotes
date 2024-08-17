

export const formatTime = (totalSeconds) => {

    totalSeconds = (totalSeconds < 0) ? -totalSeconds : totalSeconds;

    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return ` ${String(hours).padStart(2, "0")}:${String(minutes).padStart(
        2,
        "0"
    )}:${String(seconds).padStart(2, "0")}`;
};


export const convertFromStringToDate = (utcDateString) => {
    // Create a Date object from the UTC date string
    const utcDate = new Date(utcDateString);

    // IST is UTC+5:30
    const istOffset = 5.5 * 60 * 60 * 1000;

    // Calculate IST date by adding the offset
    const istDate = new Date(utcDate.getTime() + istOffset);

    // Format the result if needed
    return istDate.toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }); // Adjust the format as needed
};


export const toJsonString = (obj) => {
    const seen = new WeakSet();
    return JSON.stringify(obj, (key, value) => {
        if (typeof value === "object" && value !== null) {
            if (seen.has(value)) {
                return; // Skip circular reference
            }
            seen.add(value);
        }
        return value;
    });
}