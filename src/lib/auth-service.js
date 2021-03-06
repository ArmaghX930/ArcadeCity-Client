import axios from "axios";

class AuthService {
  constructor() {
    this.auth = axios.create({
      // baseURL: "http://localhost:5000",
      baseURL: process.env.REACT_APP_API_URL,
      withCredentials: true
    });
  }

  /* AUTH ROUTE - AUTHENTIFICATION */

  signup( player, email, password ) {
    const pr = this.auth
      .post("/auth/signup", { player, email, password })
      .then((response) => response.data);
      // .then(({ data }) => data); // Shorter way of `.then((response) => response.data);`

    return pr;
  }

  login( email, password ) {
    const pr = this.auth
      .post("/auth/login", { email, password })
      .then((response) => response.data);
      
    return pr;
  }

  logout() {
    const pr = this.auth
      .get("/auth/logout")
      .then((response) => response.data);

    return pr;
  }

}


const authService = new AuthService();

export default authService;

// Service is a set of methods abstracted and placed into a class, out of which we create one instance.
// In the above case, all axios request calls are abstracted into methods.
