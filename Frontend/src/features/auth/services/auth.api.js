import axios from "axios";

// make for the reduce the repitation of code
const api = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
});

/**
 * @description this is the full code  and below the shortcut code using the const api which i create earlier
 */
// export async function register({ username, email, password }) {
//   try {
//     const response = await axios.post(
//       "http://localhost:3000/api/auth/register",
//       {
//         username,
//         email,
//         password,
//       },
//       {
//         withCredentials: true,
//       },
//     );
//     return response.data;
//   } catch (err) {
//     console.log(err);
//   }
// }

export async function register({ username, email, password }) {
  try {
    const response = await api.post("/api/auth/register", {
      username,
      email,
      password,
    });
    return response.data;
  } catch (err) {
    console.log(err.response.data);
  }
}

export async function login({ email, password }) {
  try {
    const response = await api.post("/api/auth/login", {
      email,
      password,
    });
    return response.data;
  } catch (err) {
    console.log(err.response.data);
  }
}

export async function logout() {
  try {
    const response = await api.get("/api/auth/logout");
    return response.data;
  } catch (err) {
    console.log(err.response.data);
  }
}

export async function getMe() {
  try {
    const response = await api.get("/api/auth/get-me");

    return response.data;
  } catch (err) {
    console.log(err);
  }
}
