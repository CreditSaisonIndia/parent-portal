import { React, createContext, useContext } from "react";
import axios from 'axios';
import { useAuth } from "./Account";

const AxiosContext = createContext()

export const CustomAxios = (props) => {

    const {authData, signOut} = useAuth();
    const axiosInstance = axios.create();
    
    axiosInstance.interceptors.request.use((config) => {
        if (authData.isAuthenticated && authData.expiryTime > Date.now()) {
            config.headers['Authorization'] = authData.idToken;
            config.headers['requestingSub'] = authData.requestingSub;
            return config;
        }
        else{
            signOut()
        }
      
    });
    
    return (
        <AxiosContext.Provider value={{ axiosInstance }}>
            {props.children}
        </AxiosContext.Provider>
    )
}

export const useAxios = () => useContext(AxiosContext)