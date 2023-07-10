import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { LoadingButton } from '@mui/lab';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { useFormik, getIn } from 'formik';
import * as Yup from 'yup';
import { useAuth } from './contexts/Account'
import { Grid } from '@mui/material';


export default function ForgetPassword(props) {

    const [isVerificationCodeSent, setIsVerificationCodeSent] = useState(false)
    const { forgetPassword, forgetPasswordSubmit } = useAuth()
    const [sendCodeButtonDisabled, setSendCodeButtonDisabled] = useState(false)
    const [changePasswordButton, setChangePasswordButtonDisabled] = useState(false)
    const [loading, setLoading] = useState(false)
    const [loadingCodesend, setLoadingCodeSend] = useState(false)

    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/

    const forgetPasswordValidation = Yup.object().shape({
        verificationCode: Yup.string()
            .required("verification code required"),
        newPassword: Yup.string().required("New Password Required"),
    })

    const emailValidation = Yup.object().shape({
        email: Yup.string()
            .matches(emailRegex, "Invalid Email")
            .required("Email Required"),
    })

    const emailVerificationFormik = useFormik({
        initialValues: {
            email: "",
        },
        validationSchema: emailValidation
    });

    const forgetPasswordFormik = useFormik({
        initialValues: {
            verificationCode: "",
            newPassword: "",
        },
        validationSchema: forgetPasswordValidation
    });

    useEffect(()=>{
        emailValidation.validate(emailVerificationFormik.values)
        .then(()=>{
            setSendCodeButtonDisabled(false)
        })
        .catch(()=>{
            setSendCodeButtonDisabled(true)
        })
    }, [emailVerificationFormik.values])


    useEffect(()=>{
        forgetPasswordValidation.validate(forgetPasswordFormik.values)
        .then(()=>{
            setChangePasswordButtonDisabled(false)
        })
        .catch(()=>{
            setChangePasswordButtonDisabled(true)
        })
    }, [forgetPasswordFormik.values])


    const handleForgetPassword = (event) => {
        setLoadingCodeSend(true)
        emailValidation.validate(emailVerificationFormik.values)
            .then((validatedData) => {
                forgetPassword(validatedData.email).then((res) => {
                    setIsVerificationCodeSent(true)
                    // Toast("", "verification code sent successFully", 'success')
                    setLoadingCodeSend(false)
                })
                    .catch((error) => {
                        // var message = getErrorMessage(error.code, validatedData.email)
                        // Toast("", message, 'danger')
                        setLoadingCodeSend(false)
                    })
            })
            .catch((error) => {
                // Toast("", error.message, 'danger')
                setLoadingCodeSend(false)
            })
    }

    const handleForgetPasswordSubmit = (event) => {
        setLoading(true)
        forgetPasswordValidation.validate(forgetPasswordFormik.values)
            .then((validatedData) => {
                forgetPasswordSubmit(emailVerificationFormik.values.email, validatedData.verificationCode, validatedData.newPassword)
                    .then((data) => {
                        // Toast("", "Password Changed Successfully", "success")
                        props.setIsForgetPassword(false)
                        setLoading(false)
                    })
                    .catch((error) => {
                        // Toast("", error.message, 'danger')
                        setLoading(false)
                    })
            })
            .catch((error) => {
                // Toast("", error.message, 'danger')
                setLoading(false)
            })
    }

    return (
        <div>
            {
                isVerificationCodeSent ? (
                    <Box sx={{ mt: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <Typography sx={{ textAlign: "center" }}>
                            Please share the verification code sent to your mail
                        </Typography>
                        <Grid container sx={{ justifyContent: 'center', paddingTop: '2%' }}>
                            <Grid item xs={12} md={12}>
                                <TextField
                                    margin='normal'
                                    required
                                    fullWidth
                                    type='password'
                                    size='small'
                                    id="verificationCode"
                                    label="Verification code"
                                    name="verificationCode"
                                    variant='standard'
                                    value={forgetPasswordFormik.values.verificationCode}
                                    onBlur={forgetPasswordFormik.handleBlur}
                                    onChange={forgetPasswordFormik.handleChange}
                                    error={Boolean(
                                        getIn(forgetPasswordFormik.touched, 'verificationCode') &&
                                        getIn(forgetPasswordFormik.errors, 'verificationCode')
                                    )}
                                    helperText={
                                        getIn(forgetPasswordFormik.touched, 'verificationCode') &&
                                        getIn(forgetPasswordFormik.errors, 'verificationCode')
                                    }
                                />
                            </Grid>
                        </Grid>

                        {/*  */}
                        <Grid container sx={{ justifyContent: 'center' }}>
                            <Grid item xs={12} md={12}>
                                <TextField
                                    margin='normal'
                                    required
                                    fullWidth
                                    size='small'
                                    name="newPassword"
                                    label="New Password"
                                    type="password"
                                    id="newPassword"
                                    variant='standard'
                                    value={forgetPasswordFormik.values.newPassword}
                                    onBlur={forgetPasswordFormik.handleBlur}
                                    onChange={forgetPasswordFormik.handleChange}
                                    error={Boolean(
                                        getIn(forgetPasswordFormik.touched, 'newPassword') &&
                                        getIn(forgetPasswordFormik.errors, 'newPassword')
                                    )}
                                    helperText={
                                        getIn(forgetPasswordFormik.touched, 'newPassword') &&
                                        getIn(forgetPasswordFormik.errors, 'newPassword')
                                    }
                                />
                            </Grid>
                        </Grid>
                       {loadingCodesend ?<p style={{ color: 'green', cursor: 'pointer', textAlign: 'right', marginTop: 2 }}>
                            sending verification code
                        </p> : <p style={{ color: '#4493e2', cursor: 'pointer', textAlign: 'right', marginTop: 2 }} onClick={handleForgetPassword}>
                            Resend Verification code
                        </p>}
                        <Grid container sx={{ justifyContent: 'center' }}>
                            <Grid item xs={12} md={12}>
                                <LoadingButton
                                    disabled={changePasswordButton}
                                    loading={loading}
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 1, mb: 2 }}
                                    onClick={handleForgetPasswordSubmit}
                                >
                                    Change Password
                                </LoadingButton>
                            </Grid>
                        </Grid>


                    </Box>) : (
                    <Box sx={{ mt: 1, minWidth: 300 }}>

                        <Typography sx={{ textAlign: "center" }}>
                            Password Recovery.
                        </Typography>

                        <TextField
                            margin='normal'
                            required
                            fullWidth
                            size='small'
                            id="email"
                            label="Email"
                            name="email"
                            variant='standard'
                            value={emailVerificationFormik.values.email}
                            onBlur={emailVerificationFormik.handleBlur}
                            onChange={emailVerificationFormik.handleChange}
                            error={Boolean(
                                getIn(emailVerificationFormik.touched, 'email') &&
                                getIn(emailVerificationFormik.errors, 'email')
                            )}
                            helperText={
                                getIn(emailVerificationFormik.touched, 'email') &&
                                getIn(emailVerificationFormik.errors, 'email')
                            }
                        />
                        <p style={{ color: '#4493e2', cursor: 'pointer', textAlign: 'right', marginTop: 2 }} onClick={()=> props.setIsForgetPassword(false)}>
                            Back to Sign In.
                        </p>

                        <LoadingButton
                            type="submit"
                            disabled={sendCodeButtonDisabled}
                            fullWidth
                            loading={loadingCodesend}
                            variant="contained"
                            sx={{ mt: 1, mb: 2}}
                            onClick={handleForgetPassword}
                        >
                            Send Verification code
                        </LoadingButton>
                    </Box>
                )
            }

        </div>
    )
}
