// Cloudinary configuration
const CLOUD_NAME = "dgu5l6szo";

/**
 * Generates an optimized Cloudinary URL for an image.
 * @param publicId The Cloudinary public ID or full URL of the image.
 * @param options Transformation options.
 */
export const getCloudinaryUrl = (
  publicId: string,
  options: { width?: number; height?: number; crop?: string } = {}
) => {
  if (!publicId) return "";
  
  // If it's already a full URL, just return it (or try to extract ID if it's from our cloud)
  if (publicId.startsWith("http")) {
    if (publicId.includes(CLOUD_NAME)) {
      // Potentially transform existing Cloudinary URL
      return publicId.replace("/upload/", `/upload/f_auto,q_auto${options.width ? `,w_${options.width}` : ""}${options.height ? `,h_${options.height}` : ""}${options.crop ? `,c_${options.crop}` : ""}/`);
    }
    return publicId;
  }

  const transformations = [
    "f_auto",
    "q_auto",
    options.width ? `w_${options.width}` : "",
    options.height ? `h_${options.height}` : "",
    options.crop ? `c_${options.crop}` : "fill",
  ].filter(Boolean).join(",");

  return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/${transformations}/${publicId}`;
};

/**
 * Uploads an image to Cloudinary using the unsigned upload preset.
 * @param file The file object to upload.
 */
export const uploadImage = async (file: File) => {
  const CLOUD_NAME = "dgu5l6szo";
  // Priority: 1. localStorage, 2. Environment Variable, 3. Default placeholder
  const UPLOAD_PRESET = localStorage.getItem("CLOUDINARY_UPLOAD_PRESET") || import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || "ml_default";
  
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", UPLOAD_PRESET);
  
  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );
    
    const data = await response.json();

    if (!response.ok) {
      if (data.error?.message?.includes("Upload preset not found")) {
        throw new Error(
          `Cloudinary Error: The upload preset "${UPLOAD_PRESET}" was not found. \n\n` +
          `Please ensure you've created an UNSIGNED upload preset in your Cloudinary Settings -> Upload.`
        );
      }
      throw new Error(data.error?.message || "Cloudinary upload failed");
    }
    
    return { url: data.secure_url };
  } catch (error: any) {
    console.error("Cloudinary upload error details:", error);
    throw error;
  }
};
