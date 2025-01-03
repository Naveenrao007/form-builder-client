import axios from "axios";
import { addTokenToHeader } from "../Helper/Header";
import { toast } from "react-toastify";
const getDirectory = async () => {
  const headers = addTokenToHeader({ headers: {} });
  try {
    const res = await axios.get(
      `${import.meta.env.VITE_BaseUrl}/dashboard/alldirs`,
      {
        headers,
      }
    );


    return {
      data: res.data.data,
      status: res.status,
    };
  } catch (error) {
    console.error("Error in getting  data.", error);

    return {
      error: error.response
        ? error.response.data.message
        : "Internal server error",
      status: error.response ? error.response.status : 500,
    };
  }
};
const createDirectory = async (data) => {
  const headers = addTokenToHeader({ headers: {} });
  try {
    const res = await axios.post(
      `${import.meta.env.VITE_BaseUrl}/dashboard/create`,
      data,
      {
        headers,
      }
    );
    return {
      data: res,
      status: res.status,
    };
  } catch (error) {
    console.error("Error in Creating file/folder:", error);
    return {
      error: error.response
        ? error.response.data.message
        : "Internal server error",
      status: error.response ? error.response.status : 500,
    };
  }
};
const shareDirectory = async (data) => {
  const headers = addTokenToHeader({ headers: {} });
  try {
    const res = await axios.post(
      `${import.meta.env.VITE_BaseUrl}/dashboard/sharedirectory`,
      data,
      {
        headers,
      }
    );


    return {
      data: res,
      status: res.status,
    };
  } catch (error) {
    console.error("Error in sharing Directory", error);
    return {
      error: error.response
        ? error.response.data.message
        : "Internal server error",
      status: error.response ? error.response.status : 500,
    };
  }
};

const deleteDirectory = async (data) => {
  const headers = addTokenToHeader({ headers: {} });
  try {
    const res = await axios.delete(
      `${import.meta.env.VITE_BaseUrl}/dashboard/deletedir`,
      {
        headers,
        data,
      }
    );


    return {
      data: res,
      status: res.status,
    };
  } catch (error) {
    console.error("Error in Deleting file/folder:", error);

    return {
      error: error.response
        ? error.response.data.message
        : "Internal server error",
      status: error.response ? error.response.status : 500,
    };
  }
};
const generateLink = async (data) => {
  const headers = addTokenToHeader({ headers: {} });
  console.log(data);
  
  try {

    const res = await axios.post(
      `${import.meta.env.VITE_BaseUrl}/dashboard/generatesharelink`,
      {permission:data},
      { headers }
    );
    console.log("resssss",res);
    
    if (res.status === 200) {
      const shareLink = res.data.shareLink;
     
      navigator.clipboard.writeText(shareLink);
      toast.success(`Link copied to clipboard`);
    } else {
      toast.error(res.data.message || "Failed to generate link");
    }
  } catch (err) {
    console.error("Error generating share link:", err);
    toast.error("Something went wrong");
  }
}


export { createDirectory, getDirectory, shareDirectory, generateLink, deleteDirectory };
