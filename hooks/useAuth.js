const jwt = require("jsonwebtoken");

const useAuth = (token) => {

  if (!token) return { error: { error: "unauthenticated", status: 401 } };

  const claims = jwt.verify(token, process.env.SECRET_KEY);

  if (!claims) return { error: { error: "unauthenticated", status: 401 } };

  return { claims };
};

module.exports = useAuth;
