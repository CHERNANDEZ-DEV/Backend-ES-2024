// utils/errorHandler.js

class ValidationError extends Error {}
class NotFoundError extends Error {}
class PermissionError extends Error {}

const handleError = (res, error) => {
    if (error instanceof ValidationError) {
        return res.status(400).json({ errorCode: 'VALIDATION_ERROR', message: error.message });
    }
    if (error instanceof NotFoundError) {
        return res.status(404).json({ errorCode: 'NOT_FOUND', message: error.message });
    }
    if (error instanceof PermissionError) {
        return res.status(403).json({ errorCode: 'FORBIDDEN', message: error.message });
    }
    // Error general de servidor
    return res.status(500).json({ errorCode: 'INTERNAL_SERVER_ERROR', message: error.message });
};

module.exports = {
    handleError,
    ValidationError,
    NotFoundError,
    PermissionError
};
