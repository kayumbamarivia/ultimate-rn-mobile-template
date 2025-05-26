export const validateEmail = (email: string) => {
    const re = /\S+@\S+\.\S+/;
    return {
        valid: re.test(email),
        message: re.test(email) ? "" : "Please enter a valid email address"
    };
};

export const validatePassword = (password: string) => {
    return {
        valid: password.length >= 6, // Match backend
        message: password.length >= 6 ? "" : "Password must be at least 6 characters"
    };
};

export const validateName = (name: string) => {
    return {
        valid: name.length >= 3, // Match backend
        message: name.length >= 3 ? "" : "Name must be at least 3 characters"
    };
};

