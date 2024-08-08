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
        case 'EmailRequired':
            status = 400;
            message = 'Please input your email!';
            break;
        case 'PasswordRequired':
            status = 400;
            message = 'Please input your password!';
            break;
        case 'InvalidCredentials':
            status = 401;
            message = 'Invalid email or password!';
            break;
        case 'InvalidToken':
            status = 401;
            message = 'Invalid Token!';
            break;
        case 'JsonWebTokenError':
            status = 401;
            message = 'Invalid Token!';
            break;
        case 'DataNotFound':
            status = 404;
            message = 'Data Not Found!';
            break;
        case 'Forbidden':
            status = 403;
            message = 'Insufficient privileges to do this action';
            break;
        case 'AlreadyPremium':
            status = 400;
            message = 'You are already a premium';
            break;
        case 'UpgradeFailed':
            status = 400;
            message = 'You failed to upgrade, contact our customer support';
            break;
    }

    res.status(status).json({message});
};

module.exports = errorHandler;
