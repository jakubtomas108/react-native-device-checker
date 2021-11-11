export interface User {
  id: string;
  login: string;
  name: string;
  token: string;
  type: string;
}

export interface Device {
  borrowed?: { date: number; user: Partial<User> };
  code: string;
  id: string;
  image?: string;
  model: string;
  os: string;
  osVersion: string;
  vendor: string;
}
