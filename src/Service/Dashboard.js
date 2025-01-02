import axios from "axios";
import { addTokenToHeader } from "../Helper/Header";

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


export { createDirectory, getDirectory,shareDirectory, deleteDirectory };
