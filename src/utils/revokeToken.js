import { tokenBlacklist } from "../middleware/auth.js";

const revokeToken = (token) => {
  tokenBlacklist.add(token);
};

export default revokeToken;
