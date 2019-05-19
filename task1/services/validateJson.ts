//function to validate request body
export function validateJson(jsonBody : object, requiredFields: object) : object {
    let errors = {};

    for (let field in requiredFields) {
        if (!jsonBody) {
            errors['No body'] = 'Please provide JSON body in your request';
        }
        if (!jsonBody[field]) {
            errors[field] = 'This field is required';
            continue;
        }

        if (typeof jsonBody[field] !== requiredFields[field]) {
            errors[field] = `This field must be of type ${requiredFields[field]}`;
        }
    }

    return errors;
}