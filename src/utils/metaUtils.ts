// src/utils/metaUtils.ts
import crypto from 'crypto-js';

// Function to hash data using SHA-256 (as required by Meta)
// It also converts to lowercase and trims whitespace before hashing for consistency.
export const hashData = (data: string | null | undefined): string | null => {
    if (!data) {
        return null; // Return null if input is empty or null/undefined
    }
    // Normalize (lowercase, trim) before hashing
    const normalizedData = data.toLowerCase().trim();
    return crypto.SHA256(normalizedData).toString(crypto.enc.Hex);
};

// Optional: Simple function to get cookie values if needed for _fbc or _fbp
// Note: Reading Meta cookies directly can be tricky due to browser restrictions (HttpOnly)
// export const getCookie = (name: string): string | null => {
//   if (typeof document === 'undefined') return null; // Guard for server-side rendering if used
//   const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
//   if (match) return match[2];
//   return null;
// };