"use server";
import { getServerAuthSession } from "@/utils/authOptions";
import axios from "axios";

interface CustomResponse<T> {
  status: boolean;
  data?: T;
  error?: string;
  message?: string;
}

async function makeRequest<T>(
  method: string,
  url: string,
  data?: T,
  isJSONRequest: boolean = true
): Promise<CustomResponse<T>> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  try {
    const sessionDetails = await getServerAuthSession();

    const token = sessionDetails?.user?.accessToken;
    const headers: Record<string, string> = {
      Authorization: `Bearer ${token}`,
    };

    if (isJSONRequest) {
      headers["Content-Type"] = "application/json";
    } else {
      headers["Content-Type"] = "multipart/form-data";
    }

    const options = {
      method,
      url: `${baseUrl}/${url}`,
      headers,
      data: data,
    };
    const response = await axios(options);
    return {
      status: response.data.status,
      data: response.data.data,
      message: response.data.message,
      error: response.data.error,
    };
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      if (error.status === 500) {
        return { status: false, error: "Internal server error." };
      }
      return { status: false, error: error.response?.data?.error };
    } else {
      return { status: false, error: "An unknown error occurred" };
    }
  }
}

export async function callApiGet<T>(url: string): Promise<CustomResponse<T>> {
  return makeRequest("GET", url);
}

export async function callApiPost<T>(
  url: string,
  data: T,
  isJSONRequest: boolean = true
): Promise<CustomResponse<T>> {
  return makeRequest("POST", url, data, isJSONRequest);
}

export async function callApiPut(
  url: string,
  data: unknown,
  isJSONRequest: boolean = true
) {
  return makeRequest("PUT", url, data, isJSONRequest);
}

export async function callApiDelete<T>(
  url: string
): Promise<CustomResponse<T>> {
  return makeRequest("DELETE", url);
}
