type Method = 'GET' | 'POST' | 'PUT' | 'DELETE';

function returnCorrectRequest(method: Method, data: unknown): RequestInit {
  if (method === 'GET') {
    return {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
    };
  }

  return {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  };
}

export async function sendApiRequest<T>(
  url: string,
  method: Method,
  data: unknown = {},
): Promise<T> {
  const response = await fetch(url, returnCorrectRequest(method, data));

  if (!response.ok) {
    const message = `An error occurred: ${response.statusText}`;

    throw new Error(message);
  }

  return await response.json() as Promise<T>;
}
