import axios from "axios";

/**
 * Uploads a single image file to Cloudinary.
 * @param {File} imgFile - The image file object from input.
 * @returns {Promise<string|null>} - The secure URL of the uploaded image.
 */
export const uploadImageToCloudinary = async (imgFile) => {
  // Check if file exists
  if (!imgFile) return null;

  const formData = new FormData();
  formData.append("file", imgFile);

  // Use NEXT_PUBLIC prefix for Next.js client-side environment variables
  formData.append(
    "upload_preset",
    process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET,
  );

  try {
    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_NAME}/image/upload`,
      formData,
    );

    // Return the high-quality secure HTTPS URL
    return response.data.secure_url;
  } catch (error) {
    console.error(
      "Cloudinary Upload Error:",
      error?.response?.data || error.message,
    );
    throw new Error("Failed to upload image to Cloudinary");
  }
};
