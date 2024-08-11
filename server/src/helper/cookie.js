const setAccessTokenCookie = (res, accessToken) => {
  res.cookie("accessToken", accessToken, {
    maxAge: 5 * 60 * 1000,
    httpOnly: true,
    secure: true,
    sameSite: "none",
  });
};
const setRefreshTokenCookie = (res, refreshToken) => {
  res.cookie("refreshToken", refreshToken, {
    maxAge: 7 * 24 * 60 * 1000,
    httpOnly: true,
    secure: true,
    sameSite: "none",
  });
};

export { setAccessTokenCookie, setRefreshTokenCookie };
