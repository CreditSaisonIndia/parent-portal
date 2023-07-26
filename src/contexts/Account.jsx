import { React, createContext, useState, useContext } from "react";
import { Auth } from "aws-amplify";
import { useNavigate } from "react-router-dom";
import { Toast } from "../Notifications";

const AccountContext = createContext()

export const Account = (props) => {
    const [authData, setAuthData] = useState({
        email: localStorage.getItem("email"),
        idToken: localStorage.getItem("idToken"),
        expiryTime: localStorage.getItem("expiryTime"),
        isAuthenticated: localStorage.getItem("isAuthenticated"),
        requestingSub: localStorage.getItem("requestingSub"),
        group: localStorage.getItem("group"),
    })
    const [user, setUser] = useState(null)

    const navigate = useNavigate()

    function handleSignin(user, email) {
        var idToken = user.getSignInUserSession().idToken
        var expiryTime = idToken.getExpiration() * 1000
        var requestingSub = user?.username
        var group = user.signInUserSession.idToken.payload['cognito:groups'][0]
        localStorage.setItem("email", email)
        localStorage.setItem("idToken", idToken.jwtToken)
        localStorage.setItem("expiryTime", expiryTime)
        localStorage.setItem("isAuthenticated", true)
        localStorage.setItem("requestingSub", requestingSub)
        localStorage.setItem("group", group)
        setAuthData({ 
            ...authData, 
            email: email, 
            idToken: idToken.jwtToken, 
            expiryTime: expiryTime, 
            isAuthenticated: true, 
            requestingSub: requestingSub
        })
    }

    function handleSignOut() {
        setAuthData({ ...authData, email: null, idToken: null, expiryTime: null, isAuthenticated: false })
        localStorage.clear()
    }

    const signIn = async (email, password) => {
        return await new Promise((resolve, reject) => {
            Auth.signIn(email, password)
                .then(user => {
                    if (user.challengeName != "NEW_PASSWORD_REQUIRED") {
                        handleSignin(user, email)
                    }
                    setUser(user)
                    resolve(user)
                })
                .catch(error => {
                    reject(error)
                })
        })
    }

    const signOut = () => {
        Auth.signOut()
            .then(() => {
                handleSignOut()
                setUser(null)
                Toast('', 'logging out', 'success')
                navigate('/signin')
            })
            .catch(error => {
                console.log(error)
            })
    }

    const completeNewPassword = async (password, email) => {
        return await new Promise((resolve, reject) => {
            Auth.completeNewPassword(user, password)
                .then(userData => {
                    setUser(userData)
                    handleSignin(userData, email)
                    resolve(userData)
                })
                .catch(error => {
                    reject(error)
                })
        })
    }

    const forgetPassword = async (email) => {
        return await new Promise((resolve, reject) => {
            Auth.forgotPassword(email)
                .then(user => {
                    resolve(user)
                })
                .catch(error => {
                    reject(error)
                })
        })
    }

    const forgetPasswordSubmit = async (email, code, newPassword) => {
        return await new Promise((resolve, reject) => {
            Auth.forgotPasswordSubmit(email, code, newPassword )
                .then(data => {
                    resolve(data)
                })
                .catch(error => {
                    reject(error)
                })
        })
    }

    return (
        <AccountContext.Provider value={{ signIn, signOut, completeNewPassword, forgetPassword, forgetPasswordSubmit, authData }}>
            {props.children}
        </AccountContext.Provider>
    )
}

export const useAuth = () => useContext(AccountContext)