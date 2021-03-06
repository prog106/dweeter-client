import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import AuthService from "./service/auth";
import TweetService from "./service/tweet";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { AuthErrorEventBus } from "./context/AuthContext";
import HttpClient from "./network/http";
import TokenService from "./service/token";
import Socket from "./network/socket";

const baseURL = process.env.REACT_APP_BASE_URL;
const httpClient = new HttpClient(baseURL);
const tokenService = new TokenService();
const authErrorEventBus = new AuthErrorEventBus();
const authService = new AuthService(httpClient, tokenService);
const socketClient = new Socket(baseURL, () => tokenService.get());
const tweetService = new TweetService(httpClient, tokenService, socketClient);

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <AuthProvider
                authService={authService}
                authErrorEventBus={authErrorEventBus}
            >
                <App tweetService={tweetService} />
            </AuthProvider>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById("root")
);
