// Centralized config for the frontend. Vite exposes env vars starting with VITE_.
const meta: any = import.meta
export const API_URL: string = (meta.env && meta.env.VITE_API_URL) || 'http://localhost:4000'