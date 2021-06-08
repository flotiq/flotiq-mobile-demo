export const trimValues = (data) => {
    const trimmedValuesData = {};
    Object.keys(data).map((fe) => {
        const withWhiteSpaces = /^\s+$/.test(data[fe]);
        if (isString(data[fe]) || withWhiteSpaces) {
            trimmedValuesData[fe] = data[fe].trim();
            return;
        }
        trimmedValuesData[fe] = data[fe];
    });
    return trimmedValuesData;
};

export const convertNumbers = (fieldsDefinitions, values) => {
    const converted = values;
    Object.keys(fieldsDefinitions).map((el) => {
        const defVal = fieldsDefinitions[el];
        if (defVal.inputType && defVal.inputType === 'number') {
            if (values[el]) {
                const convertCommas = values[el].replace(',', '.');
                converted[el] = Number(convertCommas);
            }
        }
    });
    return converted;
};

export const prepareErrMessages = (fieldsDefinitions, values) => {
    const errorsMessages = {};
    Object.keys(fieldsDefinitions).map((el) => {
        const defVal = fieldsDefinitions[el];
        if (defVal.required && defVal.required === true) {
            if (!values[el] || values[el] === '') {
                errorsMessages[el] = `Field ${el} is required.`;
            }
        }
        if (defVal.inputType && defVal.inputType === 'number') {
            const isNumeric = values[el] && isNumber(values[el]);
            if (!isNumeric) {
                errorsMessages[el] = `Field ${el} has to be a number.`;
            }
        }
    });
    return errorsMessages;
};

export const isString = (str) => (typeof str === 'string') && (str instanceof String);

export const isNumber = (num) => (typeof (num) === 'number') && !isNaN(num);

export const isObject = (obj) => (typeof obj === 'object') && (obj !== null);

export const isArray = (arr) => Array.isArray(arr);
