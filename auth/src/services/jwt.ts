import jwt from "jsonwebtoken";

interface UserJWT {
  id: string;
  email: string;
}

export const generateJwt = (payload: UserJWT) => {
  return jwt.sign(payload, process.env.JWT_KEY!);
};

export const verifyJwt = (token: string) => {
  try {
    const payload = jwt.verify(token, process.env.JWT_KEY!);
    return payload;
  } catch (err) {
    return;
  }
};
