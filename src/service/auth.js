export default class AuthService {
    constructor(http, storage) {
        this.http = http;
        this.storage = storage;
    }
    async login(username, password) {
        const data = await this.http.fetch(`/auth/login`, {
            method: "POST",
            body: JSON.stringify({
                username: username,
                password: password,
            }),
        });
        this.storage.save(data.token);
        return data;
    }

    async me() {
        return this.http.fetch(`/auth/me`, {
            method: "GET",
            headers: this.getHeaders(),
        });
    }

    async logout() {
        this.storage.clear();
    }

    async signup(username, password, name, email, url) {
        const data = await this.http.fetch(`/auth/signup`, {
            method: "POST",
            body: JSON.stringify({
                username: username,
                password: password,
                name: name,
                email: email,
                url: url,
            }),
        });
        this.storage.save(data.token);
        return data;
    }

    getHeaders() {
        const token = this.storage.get();
        return {
            Authorization: `Bearer ${token}`,
        };
    }
}
