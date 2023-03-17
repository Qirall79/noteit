import axios from "axios";
import { apiUrl } from "./apiUrl";

interface IData {
  username: string;
  email: string;
  password: string;
  password_confirmation: string;
}

const signupUser = async (
  data: IData,
  setRedirect: any,
  getUser: any,
  setResponse: any
) => {
  try {
    // Send login data
    const url = apiUrl + "auth/signup";
    const response = await axios.post(url, data);

    // store token
    const token = "Bearer " + response.data.token;
    localStorage.setItem("token", token);

    // Update User and redirect to home
    await getUser();
    setRedirect(true);

    return;
  } catch (err: any) {
    setResponse(err.response.data);
    return;
  }
};

export default signupUser;
