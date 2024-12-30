import axios from "axios";
import { addTokenToHeader } from "../Helper/Header";
const createDirectory = async (data) => {
    const headers = addTokenToHeader({ headers: {} });
    try {
        const res = await axios.post(`${import.meta.env.VITE_BaseUrl}/dashboard/create`, data, {
            headers
        });
        console.log("ddk", res.data);
        console.log("ddkk", res.status);
        console.log("ddkk", res.error);


        return {
            data: res,
            status: res.status
        };

    } catch (error) {
        console.error("Error in Creating file/folder:", error);
        return {
            error: error.response ? error.response.data : "Internal server error",
            status: error.response ? error.response.status : 500
        };
    }
};

const deleteDirctory = (data) => {
    console.log(data);

}

export { createDirectory, deleteDirctory }