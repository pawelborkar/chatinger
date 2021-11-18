import React from "react";
import {
    GoogleOutlined,
    TwitterOutlined,
    GithubOutlined,
} from "@ant-design/icons";
import firebase from "firebase/app";
import { auth } from "./firebase";

const Login = () => {
    return (
        <div id="login-page">
            <div id="login-card">
                <h1>Welcome to Chatinger</h1>
                <div
                    className="login-button google"
                    onClick={() => auth.signInWithRedirect(
                        new firebase.auth.GoogleAuthProvider()
                    )}
                >
                    {" "}
                    <GoogleOutlined /> Sign in with Google
                </div>
                <br />
                <br />
                <div
                    className="login-button twitter"
                    onClick={() => auth.signInWithRedirect(
                        new firebase.auth.TwitterAuthProvider()
                    )}
                >
                    {" "}
                    <TwitterOutlined /> Sign in with Twitter
                </div>
                <br />
                <br />

                <div
                    className="login-button github"
                    onClick={() => auth.signInWithRedirect(
                        new firebase.auth.GithubAuthProvider()
                    )}
                >
                    {" "}
                    <GithubOutlined /> Sign in with GitHub
                </div>
                <br />
                <br />
            </div>
        </div>
    );
};

export default Login;
