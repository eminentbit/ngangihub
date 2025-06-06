import { v4 as uuidv4 } from "uuid";

// get the token from cookies or generate if not present for submitting njangi draft
/**
 * Retrieves the draft user token from cookies or generates a new one if it doesn't exist.
 * The token is stored in a cookie named 'draftUserToken' with a 1-year expiration.
 *
 * @param {Object} req - The request object containing cookies.
 * @param {Object} res - The response object used to set the cookie if needed.
 * @returns {string} - The draft user token.
 */
export const getOrSetDraftUserToken = (req, res) => {
  let token = req.cookies.draftUserToken;
  if (!token) {
    token = uuidv4();
    res.cookie("draftUserToken", token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 365,
    }); // 1 year
  }
  return token;
};
