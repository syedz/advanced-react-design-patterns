export async function withAsync<T>(fn: () => Promise<T>) {
  try {
    const response = await fn();
    return { response, error: null };
  } catch (error) {
    return { response: null, error };
  }
}