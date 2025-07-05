// Checks if a string is a valid HTTP/HTTPS URL
export const isValidUrl = (url: string): boolean => {
  try {
    const parsed = new URL(url);
    return parsed.protocol.startsWith("http");
  } catch {
    return false;
  }
};
