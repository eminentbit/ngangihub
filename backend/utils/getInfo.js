import axios from "axios";
import userAgentParser from "user-agent-parser";

export const getInfo = async () => {
  const res = await axios.get("https://ipapi.co/json");

  return res.data;
};

export function getBrowserType(userAgent) {
  const result = userAgentParser(userAgent);
  return result.browser.name;
}

export function getDeviceName(userAgent) {
  const result = userAgentParser(userAgent);
  return result.os ? result.os.name : "Unknown Device";
}
