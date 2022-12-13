const jwt = require("jsonwebtoken");

const { SECRET_KEY_ACCESS = "", SECRET_KEY_REFRESH = "" } = process.env;

const createToken = (_id) => {

    const payload = {
        id: _id
    }
    const accessToken = jwt.sign(payload, SECRET_KEY_ACCESS, {
      expiresIn: "2m",
    });
    const refreshToken = jwt.sign(payload, SECRET_KEY_REFRESH, {
      expiresIn: "1w",
    });
    return { accessToken, refreshToken }
}
module.exports= createToken

