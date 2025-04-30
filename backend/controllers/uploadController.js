import imagekit from "../config/imagekit.js";

export const getUploadParams = (req, res) => {
  const result = imagekit.getAuthenticationParameters();
  res.send(result);
};