// Generate a unique email
export function generateUniqueEmail() {
  const timestamp = Date.now();
  return `${timestamp}@example.com`;
}

// Generate a unique password
export function generateUniquePassword(prefix: string = 'Pass') {
  const timestamp = Date.now();
  return `${prefix}${timestamp}!`;
}

// Generate a unique phone number (random 10-digit)
export function generateUniquePhone() {
  const randomFourDigits = Math.floor(Math.random() * 9000) + 1000; // 1000-9999
  return `123456${randomFourDigits}`;
}