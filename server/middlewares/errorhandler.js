const errorHandler = (err, req, res, next) => {
    let status = 500;
    let message = 'Internal Server Error';

    switch(err.name) {
        case 'SequelizeValidationError':
            status = 400;
            message = err.errors.map(error => error.message);
            break;
        case 'SequelizeUniqueConstraintError':
            status = 400;
            message = err.errors[0].message;
            break;

    }

    res.status(status).json({message});
};

module.exports = errorHandler;
