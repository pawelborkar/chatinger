import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { auth } from "./firebase";
import { ChatEngine } from "react-chat-engine";
import { useAuth } from "../contexts/AuthContext";
import axios from "react-chat-engine/node_modules/axios";

const Chats = () => {
    const history = useHistory();
    const { user } = useAuth();
    const [loading, setLoading] = useState(true);

    const getFile = async (url) => {
        const response = await fetch(url);
        const data = await response.blob();

        return new File([data], "userPhoto.jpg", { type: "image/jpeg" });
    };

    useEffect(() => {
        if (user) {
            history.push("/");

            return;
        }

        axios
            .get("https://api.chatengine.io/users/me", {
                headers: {
                    "project-id": process.env.REACT_APP_CHATENGINE_PROJECTID,
                    "user-name": user.email,
                    "user-secret": user.uid,
                }
            })
            .then(() => {
                setLoading(false);
            })
            .catch(() => {
                let formdata = new FormData();
                formdata.append("email", user.email);
                formdata.append("user-name", user.email);
                formdata.append("secret", user.uid);

                getFile(
                    user.photoURL.then((avatar) => {
                        formdata.append("avatar", avatar, avatar.name);

                        axios
                            .post("https://api.chatengine.io/users/", {
                                formdata,
                                headers: {
                                    "private-key":
                                        process.env
                                            .REACT_APP_CHATENGINE_PRIVATE_KEY,
                                },
                            })
                            .then(() => setLoading(false))
                            .catch((error) => console.log(error));
                    })
                );
            });
    }, [user, history]);

    const handleLogout = async () => {
        await auth.signOut();
        history.push("/");
    };

    if (!user || loading) return "Loading....";
    return (
        <div className="chats-page">
            <div className="nav-bar">
                <div className="logo-tab">Chatinger</div>
                <div onClick={handleLogout} className="logout-tab">
                    Logout
                </div>
            </div>
            <ChatEngine
                height="calc(100vh - 66px)"
                projectID={process.env.REACT_APP_CHATENGINE_PROJECTID}
                username={user.email}
                userSecret={user.uid}
            />
        </div>
    );
};

export default Chats;
