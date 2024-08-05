const { hashSync, compareSync } = require("bcryptjs")

const hashPassword = password => {
    return hashSync(password);
}

const comparePassword = (password, hashedPass) => {
    return compareSync(password, hashedPass);
}

module.exports = {
    hashPassword,
    comparePassword
}