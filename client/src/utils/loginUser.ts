import axios from "axios";
import { apiUrl } from "./apiUrl";

interface IData {
  username: string;
  password: string;
}

const loginUser = async (data: IData, setRedirect: any, getUser: any) => {
  try {
    // Send login data
    const url = apiUrl + "auth/login";
    const response = await axios.post(url, data);

    // store token
    const token = "Bearer " + response.data.token;
    localStorage.setItem("token", token);

    // Update User and redirect to home
    await getUser();
    setRedirect(true);

    return;
  } catch (err: any) {
    return err.response.data;
  }
};

export default loginUser;
