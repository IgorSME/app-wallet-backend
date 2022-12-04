const jwt = require("jsonwebtoken");
const { requestError, createTokens } = require("../../helpers");
const {User}=require ("../../models")

const { SECRET_KEY_REFRESH = "" } = process.env;

const refresh = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;
    const { id } = jwt.verify(refreshToken, SECRET_KEY_REFRESH);
    const user = await User.findById(id)
 
    if (!user || user.refreshToken !== refreshToken) {
      throw requestError(401, "Token expired");
    }

    const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
      createTokens(id);

    await User.findByIdAndUpdate(id, {
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    });

    res.json({
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    });
    
  } catch (error) {
    next(requestError(401, error.message));
  }
};
module.exports = refresh;
