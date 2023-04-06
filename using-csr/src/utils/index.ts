const DEFAULT_ERROR_MESSAGE =
  'Yikes, we ran into some trouble. Try again, please';

export async function getData<T>(url: string): Promise<T> {
  const response = await fetch(url);

  if (!response.ok) {
    throw Error(DEFAULT_ERROR_MESSAGE);
  }

  return response.json() as Promise<T>;
}