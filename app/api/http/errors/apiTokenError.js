class ApiTokenError extends Error {
    constructor(message) {
        super(message);

        /* Maintains proper stack trace for where our error was thrown (only available on V8) - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error */
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, ApiTokenError);
        }

        this.name = 'ApiTokenError';
        this.date = new Date();
    }
}

export default ApiTokenError;
