import axios from "axios";
import domain from "../domain";

const Uploader = {
  Image: async (uri, typeName, isCompressed = false) => {
    if (!uri) {
      throw new Error("Uri parameter is required");
    } else if (!typeName) {
      throw new Error("TypeName parameter is required");
    }

    let formData = new FormData();
    formData.append("typeName", typeName);
    formData.append("isCompressed", isCompressed);
    formData.append("image", {
      uri: uri,
      name: "image.png",
      type: "image/png",
    });

    try {
      const response = await axios.post(
        `${domain}/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Accept: "application/json",
          },
        }
      );

      if (response.data.success) {
        return response.data.path;
      }
    } catch (error) {
      throw new Error(error);
    }
  },
};

export default Uploader;
