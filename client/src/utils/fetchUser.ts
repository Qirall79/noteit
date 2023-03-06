import axios from "axios";

interface IUser {
  _id: string;
  username: string;
  email: string;
}

const fetchUser = async (setUser: any, setLoaded: any) => {
  try {
    const url = "http://localhost:5000/auth/user";
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
    setUser(user);
    setLoaded(true);
    return;
  } catch (err) {
    console.log(err);
  }
};

export default fetchUser;
