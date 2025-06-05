export const allowedUsers = new Set([
  "12345678", // User ID
  "87654321", // Another User ID
  "john_doe", // Username
  "jane_doe", // Another Username
]);

export function isAuthorized(userKey: string): boolean {
  return allowedUsers.has(userKey);
}

