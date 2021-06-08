export function parseObject(object) {
    let stringErrorMessage = '';
    // eslint-disable-next-line array-callback-return
    Object.entries(object).map((arr) => {
        const title = arr[0] ? `${arr[0]}: ` : 'missing: ';
        const body = arr[1] ? `${arr[1]}. \n` : '\n';
        stringErrorMessage += title + body;
    });
    return stringErrorMessage;
}

export function parseResponseMessage(response) {
    if (response.error && response.error.message) {
        return response.error.message;
    } if (response.message) {
        return response.message;
    }

    if (typeof response === 'object') {
        try {
            const errors = parseObject(response);
            if (errors) {
                return errors;
            }
            JSON.parse(response);
            return JSON.stringify(response);
        } catch (error) {
            return 'Undefined Error';
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
