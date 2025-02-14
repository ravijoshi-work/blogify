"use server";

import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

export async function deletePhoto(public_id: string) {
  try {
    return await cloudinary.uploader.destroy(public_id);
  } catch (error) {
    return { errMessage: (error as Error).message };
  }
}

interface DeleteResponse {
  public_id?: string;
  result?: unknown;
  errMessage?: string;
}

interface PublicIdToDelete {
  id: string;
}

export async function deleteManyPhotos(
  publicIdsToDelete: PublicIdToDelete[]
): Promise<DeleteResponse[]> {
  try {
    const deleteResponses: DeleteResponse[] = await Promise.all(
      publicIdsToDelete.map(async (item): Promise<DeleteResponse> => {
        const public_id = item.id;

        try {
          const result = await cloudinary.uploader.destroy(public_id);
          return { public_id, result };
        } catch (error) {
          return { errMessage: (error as Error).message };
        }
      })
    );

    return deleteResponses;
  } catch (error) {
    return [{ errMessage: (error as Error).message }];
  }
}
