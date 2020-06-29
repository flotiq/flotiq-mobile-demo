export function parseResponseMessage(response) {
    if (response.error && response.error.message) {
        return response.error.message;
    } if (response.message) {
        return response.message;
    }
    if (typeof response === 'object') {
        try {
            JSON.parse(response);
            return JSON.stringify(response);
        } catch (error) {
            return error.message;
        }
    }
    if (typeof response === 'string' || response instanceof String) {
        return response;
    }
    return 'Undefined Error';
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
