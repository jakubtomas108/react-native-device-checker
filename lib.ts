export const api = {
  get: async (url: string, params?: any) =>
    await fetch(url, { ...params }).then((res) => res.json()),
  post: async (url: string, body?: any, params?: any) =>
    await fetch(url, {
      method: "POST",
      body: JSON.stringify(body || {}),
      headers: {
        "Content-Type": "application/json",
      },
      ...params,
    }).then((res) => res.json()),
};
