export const sendToken = (user, statusCode, res, message) => {
  const COOKIE_EXPIRE = 24;
  const token = user.getJWTToken();
  const options = {
    expires: new Date(
      // Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
      Date.now() + COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true, // Set httpOnly to true
  };

  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    user,
    message,
    token,
  });
};
