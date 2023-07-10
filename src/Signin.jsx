import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
// import backgroundImage from '../../assets/creditsaison-background.png'
import { useNavigate } from 'react-router-dom';
// import { Toast } from '../Notifications';
// import { useAuth } from '../../contexts/Account';
import { useFormik, getIn } from 'formik';
import * as Yup from 'yup';
import ForgetPassword from './ForgetPassword';
import { LoadingButton } from '@mui/lab';
import {useAuth} from './contexts/Account'

export default function Signin(props) {

  const [isFirstLogin, setIsFirstLogin] = React.useState(false)
  const [isForgetPassword, setIsForgetPassword] = React.useState(false)
  const [email, setEmail] = React.useState("")
  const [loading, setLoading] = React.useState(false)
  const { signIn, completeNewPassword } = useAuth()
  const [signinButtonDisabled, setSigninButtonDisabled] = React.useState(false)
  const [ChangePasswordButtonDisabled, setChangePasswordButtonDisabled] = React.useState(false)

  const navigate = useNavigate();

  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/

  const signInValidation = Yup.object().shape({
    email: Yup.string()
      .matches(emailRegex, "Invalid Email")
      .required("Email is Required"),
    password: Yup.string().required("Password is required"),
  })

  const changePasswordValidation = Yup.object().shape({
    newPassword: Yup.string()
      .required("New password is Required"),
    confirmPassword: Yup.string().oneOf([Yup.ref('newPassword'), null], "Password didn't match").required("Confirm New Password is Required."),
  })

  const signinFormik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: signInValidation
  });

  const changePasswordFormik = useFormik({
    initialValues: {
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: changePasswordValidation
  });

React.useEffect(()=>{
    signInValidation.validate(signinFormik.values)
    .then(()=>{
      setSigninButtonDisabled(false)
    })
    .catch(()=>{
      setSigninButtonDisabled(true)
    })
}, [signinFormik.values])

React.useEffect(()=>{
  changePasswordValidation.validate(changePasswordFormik.values)
  .then(()=>{
    setChangePasswordButtonDisabled(false)
  })
  .catch(()=>{
    setChangePasswordButtonDisabled(true)
  })
}, [changePasswordFormik.values])

function handleRouting(userSession){
    var userGroup = userSession.accessToken.payload['cognito:groups'][0]
    console.log(userGroup, "ug");
    if (userGroup === 'DSA'){
        window.location.href = 'https://dev.d2s0wy92e7ub5w.amplifyapp.com/dashboard';
    }
    else{
        window.location.href = 'https://main.dbkudhh9nnb6s.amplifyapp.com/';
    }
}


  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true)
    signInValidation.validate(signinFormik.values)
      .then((validatedData) => {
        setEmail(validatedData.email)
        signIn(validatedData.email, validatedData.password)
          .then(user => {
            if (user.challengeName === 'NEW_PASSWORD_REQUIRED') {
              setIsFirstLogin(true)
              setLoading(false)
            }
            else {
            //   Toast("", "Login Successfully", "success");
              handleRouting(user.signInUserSession)
              setLoading(false)
            }
          })
          .catch(error => {
            var message = error.message
            if (message.includes('username')) {
              message = error.message.replace('username', 'email');
            }
            // Toast("", message, "danger")
            setLoading(false)
          });
      })
      .catch((error) => {
        // Toast("", error.message, "danger")
        setLoading(false)
      })

  }


  const changePassword = (event) => {
    setLoading(true)
    event.preventDefault();
    changePasswordValidation.validate(changePasswordFormik.values)
      .then((validatedData) => {
        completeNewPassword(validatedData.confirmPassword, email)
          .then(res => {
            // Toast("", "Login Successfully", "success");
            navigate("/dashboard")
            setLoading(false)
          })
          .catch(error => {
            // Toast("", error.message, "danger");
            setLoading(false)
          })
      })
      .catch((error) => {
        // Toast("", error.message, "danger");
        setLoading(false)
      })
  }

  return (
    <Grid container component="main" sx={{ height: '90vh' }}>
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
        //   backgroundImage: `url(${backgroundImage})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      />
      <Grid item xs={12} sm={8} md={5} sx={{ backgroundColor: 'white' }}>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          </Avatar>

          {isFirstLogin ? (
            <Box sx={{ mt: 1 }}>
              <Typography sx={{ textAlign: "center" }}>
              First time login! Please change Password.
              </Typography>
              <Grid container spacing={2} pt={2}>
                <Grid container md={12} item>
                  <TextField
                    required
                    fullWidth
                    type="password"
                    size='small'
                    id="newPassword"
                    label="New Password"
                    name="newPassword"
                    autoComplete='off'
                    variant='standard'
                    value={changePasswordFormik.values.newPassword}
                    onBlur={changePasswordFormik.handleBlur}
                    onChange={changePasswordFormik.handleChange}
                    error={Boolean(
                      getIn(changePasswordFormik.touched, 'newPassword') &&
                      getIn(changePasswordFormik.errors, 'newPassword')
                    )}
                    helperText={
                      getIn(changePasswordFormik.touched, 'newPassword') &&
                      getIn(changePasswordFormik.errors, 'newPassword')
                    }
                  />
                </Grid>
                <Grid container md={12} item>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    size='small'
                    name="confirmPassword"
                    label="Confirm New Password"
                    type="password"
                    id="confirmPassword"
                    autoComplete='off'
                    variant='standard'
                    value={changePasswordFormik.values.confirmPassword}
                    onBlur={changePasswordFormik.handleBlur}
                    onChange={changePasswordFormik.handleChange}
                    error={Boolean(
                      getIn(changePasswordFormik.touched, 'confirmPassword') &&
                      getIn(changePasswordFormik.errors, 'confirmPassword')
                    )}
                    helperText={
                      getIn(changePasswordFormik.touched, 'confirmPassword') &&
                      getIn(changePasswordFormik.errors, 'confirmPassword')
                    }
                  />
                </Grid>
              </Grid>
              <Grid container>
                <Grid container md={12} item>
                  <LoadingButton
                    fullWidth
                    disabled={ChangePasswordButtonDisabled}
                    loading={loading}
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    onClick={changePassword}
                  >
                    Change Password
                  </LoadingButton>
                </Grid>
              </Grid>
            </Box>
          ) : isForgetPassword ? (
            <ForgetPassword setIsForgetPassword={setIsForgetPassword} />
          ) :
            <Box sx={{ mt: 1 }}>

              <Typography sx={{ textAlign: "center" }}>
                Sign in
              </Typography>
                <TextField
                margin='normal'
                required
                fullWidth
                size='small'
                id="email"
                label="User Email"
                name="email"
                variant='standard'
                value={signinFormik.values.email}
                onBlur={signinFormik.handleBlur}
                onChange={(e) => {
                  setEmail(e.target.value);
                  signinFormik.handleChange(e);
                }}
                error={Boolean(
                  getIn(signinFormik.touched, 'email') &&
                  getIn(signinFormik.errors, 'email')
                )}
                helperText={
                  getIn(signinFormik.touched, 'email') &&
                  getIn(signinFormik.errors, 'email')
                }
              />

              <TextField
                margin='normal'
                required
                fullWidth
                size='small'
                name="password"
                label="Password"
                type="password"
                id="password"
                variant='standard'
                value={signinFormik.values.password}
                onBlur={signinFormik.handleBlur}
                onChange={signinFormik.handleChange}
                error={Boolean(
                  getIn(signinFormik.touched, 'password') &&
                  getIn(signinFormik.errors, 'password')
                )}
                helperText={
                  getIn(signinFormik.touched, 'password') &&
                  getIn(signinFormik.errors, 'password')
                }
              />
              <p style={{ color: '#4493e2', cursor: 'pointer', textAlign: 'right', marginTop: 2 }} onClick={() => setIsForgetPassword(true)}>
                Forgot password?
              </p>
              <LoadingButton
                fullWidth
                disabled={signinButtonDisabled}
                loading={loading}
                variant="contained"
                sx={{ mt: 1, mb: 2 }}
                onClick={handleSubmit}
              >
                SignIn
              </LoadingButton>
            </Box>}
        </Box>
      </Grid>
    </Grid>
  );
}