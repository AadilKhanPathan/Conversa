import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";

const { backendUrl } = "http://localhost:2000";
axios.defaults.baseURL = backendUrl;

export const AuthContext = createContext();

export const AuthProvider = ({Children}) => {

    const [token, setToken] = useState();
    const [authUser, setAuthUser] = useState(null);
    const [onlineUSers, setOnlineUsers] = useState([]);
    const [socket, setSocket] = useState(null);
    
    // check if the user is authenticated and if so, set the user data and connect the socket
    const checkAuth = async () => {
        try {
            const { data } = await axios.get("/api/auth/check");
            if(data.success) {
                setAuthUser(data.user)
                connectSocket(data.user);
            }
        } catch (error) {
            console.log(error)
        }
    }

    //  

    // connect socket function to handle socket connection and online users updates
    const connectSocket = (userdata) => {
        if (!userdata || socket?.connected) return;

        const newSocket = io(backendUrl, {
            query: {
                userId: userdata._id,
            }
        });
        newSocket.connect();
        setSocket(newSocket);

        newSocket.on("getOnlineUsers", (userIds) => {
            setOnlineUsers(userIds);
        })

    }

    useEffect(() => {
        if (token) {
            axios.defaults.headers.common["token"] = token;
        }
        checkAuth;
    })

    const value ={
        axios,
        authUser,
        onlineUSers,
        socket,
    }
    

    return (<AuthContext.Provider value={value}>{Children}</AuthContext.Provider>);
}

export const useAuth = () => useContext(AuthContext);