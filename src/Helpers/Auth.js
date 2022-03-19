import { decodeJwt as decode } from "jose";
import axios from "axios";

class Auth {
  async checkLogin() {
    const access = this.getToken("access");
    const refresh = this.getToken("refresh");
    if (this.isTokenExpired(access)) {
      if (this.isTokenExpired(refresh)) {
        return null;
      } else {
        const newAccess = await this.getNewAccessToken(refresh);
        return newAccess;
      }
    } else {
      return access;
    }
  }
  checkHasConfirmed() {
    return decode(localStorage.getItem("access")).has_confirmed;
  }
  async getNewAccessToken(refresh) {
    const formData = new FormData();
    formData.append("refresh", refresh);
    try {
      const { data } = await axios.post(
        "https://api.aicup.iut.ac.ir/accounts/login/refresh/",
        formData
      );

      this.setAccessToken(data.access);
      return data.access;
    } catch (e) {
      console.log(e);
    }
  }

  isTokenExpired(token) {
    if (token === "" || !token) return true;
    try {
      const decoded = decode(token);
      return decoded.exp ? decoded.exp < Date.now() / 1000 : false;
    } catch (err) {
      return false;
    }
  }

  getToken(key) {
    // Retrieves the user token from localStorage
    return localStorage.getItem(key);
  }

  isLoggedIn() {
    const access = this.getToken("access");
    const refresh = this.getToken("refresh");
    if (access && refresh) {
      return true;
    }
    return false;
  }

  login(access, refresh) {
    // Saves user token to localStorage
    // localStorage.setItem(key, token);
    localStorage.setItem("access", access);
    localStorage.setItem("refresh", refresh);
  }

  setRefreshToken(ref) {
    localStorage.setItem("refresh", ref);
  }
  setAccessToken(acc) {
    localStorage.setItem("access", acc);
  }
  logout() {
    this.setAccessToken("");
    this.setRefreshToken("");
    window.location.reload();
  }
}

const auth = new Auth();

export default auth;
