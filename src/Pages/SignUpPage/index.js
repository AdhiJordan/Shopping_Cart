import React, { useState, useEffect, useContext } from 'react';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import validateSignupForm from './../../utility/validations/login';
import { useHistory, Link } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import { withStyles } from '@mui/styles';
import { styled } from '@mui/styles';
import FormControlLabel from '@mui/material/FormControlLabel';
import axios from 'axios';
import ToastMessage from '../../Components/ToastMessage';

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

const styles = {
    root: {
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
};

const SignUpPage = (props) => {
    const { classes } = props;
    const history = useHistory();
    const [showPassword, setShowPassword] = useState(false);
    const [signUpDetails, setSignUpDetails] = useState({
        email: '',
        password: '',
        username: '',
        address: '',
        phone: '',
    });
    const [errorsValid, setErrors] = useState({});
    const [toggleMobile, setToggleMobile] = useState(false);
    const [toggleCheck, setToggleCheck] = React.useState({ rememberMe: true });
    const [toastType, setToastType] = useState();
    const [toggleToast, setToggleToast] = useState(false);
    const [toastMessage, setToastMessage] = useState(false);

    const handleChangeRemember = (event) => {
        setToggleCheck({
            ...toggleCheck,
            [event.target.name]: event.target.checked,
        });
    };

    const handleChange = (event) => {
        setSignUpDetails((signUpDetails) => ({
            ...signUpDetails,
            [event.target.name]: event.target.value,
        }));
        const { name, value } = event.target;
        //setInputs((prev) => ({ ...prev, [name]: value }));
    };

    const submitSignUp = (event) => {
        event.preventDefault();

        if (Object.keys(validateSignupForm(signUpDetails)).length === 0) {
            let obj = {
                email: signUpDetails.email,
                username: signUpDetails.username,
                password: signUpDetails.password,
                address: {
                    street: signUpDetails.address,
                },
                phone: signUpDetails.phone,
            };
            axios
                .post('https://fakestoreapi.com/users', {
                    body: JSON.stringify(obj),
                })
                .then((res) => {
                    if (res.status === 200) {
                        setToastMessage('User Successfully Added');
                        setToastType('success');
                        setToggleToast(true);
                        setTimeout(() => {
                            history.push('/');
                        }, 3000);
                    }
                });
        } else {
            setErrors(validateSignupForm(signUpDetails));
        }
    };

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleClickClear = () => {
        setSignUpDetails((signUpDetails) => ({
            ...signUpDetails,
            email: '',
        }));
    };

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
                        <h2 className="text-24 fw-600">Sign Up</h2>

                        <SignUpTextField
                            error={errorsValid.username ? true : false}
                            name="username"
                            id="outlined-error"
                            label="Enter Username"
                            variant="outlined"
                            placeholder="doe@gmail.com"
                            onChange={handleChange}
                            value={signUpDetails.username}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickClear}
                                            edge="end"
                                        >
                                            {signUpDetails.username ? (
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
                            error={errorsValid.email ? true : false}
                            name="email"
                            id="outlined-error"
                            label="Enter Email Address"
                            variant="outlined"
                            placeholder="doe@gmail.com"
                            onChange={handleChange}
                            value={signUpDetails.email}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickClear}
                                            edge="end"
                                        >
                                            {signUpDetails.email ? (
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
                            {errorsValid.email && errorsValid.email}
                        </div>
                        <SignUpTextField
                            error={errorsValid.password ? true : false}
                            label="Enter Password"
                            id="outlined-adornment-password"
                            type={showPassword ? 'text' : 'password'}
                            name="password"
                            variant="outlined"
                            value={signUpDetails.password}
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
                        <SignUpTextField
                            error={errorsValid.address ? true : false}
                            name="address"
                            id="outlined-error"
                            label="Enter Address"
                            variant="outlined"
                            placeholder="doe@gmail.com"
                            onChange={handleChange}
                            value={signUpDetails.address}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickClear}
                                            edge="end"
                                        >
                                            {signUpDetails.address ? (
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
                            {errorsValid.address && errorsValid.address}
                        </div>

                        <SignUpTextField
                            error={errorsValid.phone ? true : false}
                            name="phone"
                            id="outlined-error"
                            label="Enter Phone Number"
                            variant="outlined"
                            placeholder="doe@gmail.com"
                            onChange={handleChange}
                            value={signUpDetails.phone}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickClear}
                                            edge="end"
                                        >
                                            {signUpDetails.phone ? (
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
                            {errorsValid.phone && errorsValid.phone}
                        </div>

                        <Grid container spacing={0}>
                            <Grid item xs={12} sm={12} md={6} lg={6}></Grid>
                            <Grid item xs={12} sm={12} md={6} lg={6}></Grid>
                        </Grid>
                        <div className="margin-t-30">
                            <Button
                                disabled={
                                    signUpDetails.email &&
                                    signUpDetails.password &&
                                    signUpDetails.username &&
                                    signUpDetails.address &&
                                    signUpDetails.phone
                                        ? false
                                        : true
                                }
                                variant="contained"
                                className="primaryButton"
                                width="100%"
                                onClick={submitSignUp}
                                color={
                                    signUpDetails.email &&
                                    signUpDetails.password
                                        ? 'success'
                                        : 'error'
                                }
                            >
                                Continue
                            </Button>
                            <div className="text-center margin-tb-20">
                                <Link
                                    to="/"
                                    className="cursor-pointer margin-t-10 text-primary"
                                >
                                    Click here to Login !
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

export default withStyles(styles)(SignUpPage);
