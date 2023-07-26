export function getErrorMessage(errorCode, email) {
    switch (errorCode) {
        case "NotAuthorizedException":
            return "Please complete the signup process."

        case "LimitExceededException":
            return "Attempt limit exceeded, please try after some time."

        case "UserNotFoundException":
            return `${email} is not associated with any user.`

        default:
            break;
    }
}
