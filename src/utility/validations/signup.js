export default function validateSignupForm(values) {
    let errors = {};
    let emailCheck = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._]+\.[a-zA-Z]{2,4}$/;
    let errorMessageRequired = 'Required field';
    if (!values.email) {
        errors.email = errorMessageRequired;
    } else if (!emailCheck.test(values.email)) {
        errors.email = 'Invalid Email Id';
    }
    if (!values.password) {
        errors.password = errorMessageRequired;
    }
    if (!values.address) {
        errors.address = errorMessageRequired;
    }
    if (!values.username) {
        errors.username = errorMessageRequired;
    }
    if (!values.phone) {
        errors.phone = errorMessageRequired;
    }

    return errors;
}
