/**
 * Utility helper to simulate asynchronous network latency for mock API calls
 */
export const delay = (ms = 150) => new Promise(resolve => setTimeout(resolve, ms));
