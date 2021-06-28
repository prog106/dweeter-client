export default class TokenService {
    save(token) {
        return localStorage.setItem("token", token);
    }
    get() {
        return localStorage.getItem("token");
    }
    clear() {
        return localStorage.clear("token");
    }
}
