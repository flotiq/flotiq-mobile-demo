export function parseResponseMessage(response) {
    if (response.error && response.error.message) {
        return response.error.message;
    } if (response.message) {
        return response.message;
    }
    return JSON.stringify(response);
}

export function checkApiTokenIsValid(errorMessage) {
    const userNotFoundRegex = /username could not be found/i;
    if (typeof errorMessage === 'string' || errorMessage instanceof String) {
        if (userNotFoundRegex.test(errorMessage.toLowerCase())) {
            return false;
        }
    }
    return true;
}
