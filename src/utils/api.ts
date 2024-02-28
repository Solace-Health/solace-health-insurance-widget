import { SolaceApiError } from "./error";

export const post = async <Response>({
  path,
  body = {},
  headers,
}: {
  path: string;
  body?: unknown;
  headers?: HeadersInit;
}) => {
  const response = await fetch(`${process.env.SERVER_URL}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    body: JSON.stringify(body),
  });

  const data = await response.json();

  if (!response?.ok) throw new SolaceApiError(data);

  return data as Response;
};
