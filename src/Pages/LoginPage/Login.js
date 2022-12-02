import React, { useState, useEffect, useContext } from 'react';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { makeStyles, withStyles } from '@mui/material/styles';
import validateLoginForm from './../../utility/validations/login';
import { useHistory, Link } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import { styled } from '@mui/styles';
import FormControlLabel from '@mui/material/FormControlLabel';
import axios from 'axios';
import ToastMessage from '../../Components/ToastMessage';
import { loginUserDetails } from '../../store/actions/login';
import { useDispatch } from 'react-redux';

const SignUpTextField = styled(TextField)({
    width: '100%',
    margin: '20px 0px',
    '& .MuiOutlinedInput-root': {
        borderColor: '#F0F3F8',
        borderWidth: '2px',
        margin: '20px 0px',
        '&.Mui-focused fieldset': {
            borderColor: '#F9BB4B',
            borderWidth: '2px',
        },
    },
    '& .MuiInputLabel-root': {
        marginTop: 20,
    },
    '& .MuiFormLabel-root.Mui-focused': {
        color: '#F9BB4B',
    },
});

const SignUpButton = styled(Button)({
    primaryBtn: {
        width: '100%',
        color: '#000',
        padding: '14px',
        borderRadius: 10,
        fontSize: 16,
        fontWeight: 500,
        textTransform: 'none',
        background: '#F9BB4B',
        '&:hover': {
            background: '#F9BB4B',
        },
    },
});

const LoginPage = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const [showPassword, setShowPassword] = useState(false);
    const [loginDetails, setLoginDetails] = useState({
        username: '',
        password: '',
    });
    const [errorsValid, setErrors] = useState({});
    const [toggleMobile, setToggleMobile] = useState(false);
    const [toggleCheck, setToggleCheck] = React.useState({ rememberMe: true });
    const [toastType, setToastType] = useState();
    const [toggleToast, setToggleToast] = useState(false);
    const [toastMessage, setToastMessage] = useState(false);

    useEffect(() => {
        dispatch(loginUserDetails({ userId: 1 }));
    }, []);

    const handleChangeRemember = (event) => {
        setToggleCheck({
            ...toggleCheck,
            [event.target.name]: event.target.checked,
        });
    };

    const handleChange = (event) => {
        setLoginDetails((loginDetails) => ({
            ...loginDetails,
            [event.target.name]: event.target.value,
        }));
        const { name, value } = event.target;
        //setInputs((prev) => ({ ...prev, [name]: value }));
    };

    const submitLogin = (event) => {
        event.preventDefault();

        if (Object.keys(validateLoginForm(loginDetails)).length === 0) {
            let obj = {
                username: loginDetails.username,
                password: loginDetails.password,
            };
            axios
                .post('https://fakestoreapi.com/auth/login', {
                    body: JSON.stringify(obj),
                })
                .then((res) => {
                    if (res.status === 200) {
                        setToastMessage('Login Success');
                        setToastType('success');
                        setToggleToast(true);

                        setTimeout(() => {
                            history.push('/');
                        }, 3000);
                    }
                });
        } else {
            setErrors(validateLoginForm(loginDetails));
        }
    };

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleClickClear = () => {
        setLoginDetails((loginDetails) => ({
            ...loginDetails,
            username: '',
        }));
    };

    // useEffect(() => {
    //     if (token !== null && token) {
    //         history.push('/overview/dashboard');
    //     } else if (token === null) {
    //         history.push('/');
    //     }
    // }, [token]);

    return (
        <div className="loginContentCls">
            {toggleToast && (
                <ToastMessage
                    type={toastType}
                    message={toastMessage}
                    backToInitialState={() => setToggleToast(false)}
                />
            )}
            <Grid
                container
                spacing={0}
                alignItems="center"
                className="height100Vh"
            >
                <Grid item xs={12} sm={12} md={2} lg={2}></Grid>
                <Grid item xs={12} sm={12} md={8} lg={8}>
                    <div className="rightFormContent">
                        <p className="text-24 fw-600">Sign In</p>

                        <SignUpTextField
                            error={errorsValid.username ? true : false}
                            name="username"
                            id="outlined-error"
                            label="Enter Username"
                            variant="outlined"
                            placeholder="doe@gmail.com"
                            onChange={handleChange}
                            value={loginDetails.username}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickClear}
                                            edge="end"
                                        >
                                            {loginDetails.username ? (
                                                <img
                                                    src="/assets/icons/text-field-close.svg"
                                                    alt="Close"
                                                />
                                            ) : null}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <div className="errorText text-12 float-left">
                            {errorsValid.username && errorsValid.username}
                        </div>
                        <SignUpTextField
                            error={errorsValid.password ? true : false}
                            label="Enter Password"
                            id="outlined-adornment-password"
                            type={showPassword ? 'text' : 'password'}
                            name="password"
                            variant="outlined"
                            value={loginDetails.password}
                            onChange={handleChange}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            edge="end"
                                        >
                                            {showPassword ? (
                                                <img
                                                    src="/assets/icons/eye.svg"
                                                    alt="Show"
                                                />
                                            ) : (
                                                <img
                                                    src="/assets/icons/eye-slash.svg"
                                                    alt="Show"
                                                />
                                            )}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <div className="errorText text-12 float-left">
                            {errorsValid.password && errorsValid.password}
                        </div>
                        <Grid container spacing={0}>
                            <Grid item xs={12} sm={12} md={6} lg={6}></Grid>
                            <Grid item xs={12} sm={12} md={6} lg={6}></Grid>
                        </Grid>
                        <div className="margin-t-30">
                            <Button
                                disabled={
                                    loginDetails.password &&
                                    loginDetails.username
                                        ? false
                                        : true
                                }
                                variant="contained"
                                className="primaryButton"
                                width="100%"
                                onClick={submitLogin}
                                color={
                                    loginDetails.username &&
                                    loginDetails.password
                                        ? 'success'
                                        : 'error'
                                }
                            >
                                Continue
                            </Button>
                            <div className="text-center margin-tb-20">
                                <Link
                                    to="/sign-up"
                                    className="cursor-pointer margin-t-10 text-primary"
                                >
                                    Click here to Sign Up !
                                </Link>
                            </div>
                        </div>
                        {/* {errors.length > 0
                            ? errors.map((error) => (
                                  <p className="text-red text-center">
                                      {error}
                                  </p>
                              ))
                            : null} */}
                    </div>
                </Grid>
                <Grid item xs={12} sm={12} md={2} lg={2}></Grid>
            </Grid>
        </div>
    );
};

export default LoginPage;
