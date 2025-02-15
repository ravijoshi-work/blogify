"use server";

import { callApiGet, callApiPost, callApiPut } from "./call";

export async function getUser() {
  return await callApiGet(`/user`);
}

export async function getUserById(id: string) {
  return await callApiGet(`/user/${id}`);
}

export async function updateUser(id: string, payload: unknown) {
  return await callApiPut(`/user/${id}`, payload);
}

export async function createUser(payload: unknown) {
  return await callApiPost(`/signup`, payload);
}
