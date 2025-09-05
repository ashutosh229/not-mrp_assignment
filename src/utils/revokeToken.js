import { tokenBlacklist } from "../middleware/auth";

const revokeToken = (token) => {
  tokenBlacklist.add(token);
};

export default revokeToken;
