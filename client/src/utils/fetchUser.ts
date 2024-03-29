import axios from "axios";
import { apiUrl } from "./apiUrl";

interface IUser {
  _id: string;
  username: string;
  email: string;
}

const fetchUser = async (userDispatch: any, setLoaded: any) => {
  try {
    const url = apiUrl + "auth/user";
    const token = localStorage.getItem("token");

    // check if token exists
    if (!token) {
      setLoaded(true);
      return null;
    }

    const response = await axios.get(url, {
      headers: {
        Authorization: token,
      },
    });
    const user: IUser = response.data.user.user;

    userDispatch({
      type: "login",
      user,
    });
    setLoaded(true);
    return;
  } catch (err) {
    console.log(err);
  }
};

export default fetchUser;
