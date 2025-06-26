import axios from "axios";
import userAgentParser from "user-agent-parser";

/**
 * Fetch geo IP info once per session.
 * Stores result in req.session.geoInfo.
 * @param {Request} req - Express request object
 * @returns {Promise<Object|null>}
 */
export const getInfo = async (req) => {
  if (req.session?.geoInfo) {
    console.log("📦 Returning cached geo info from session");
    return req.session.geoInfo;
  }

  try {
    const res = await axios.get("https://ipapi.co/json", {
      timeout: 3000, // prevent hanging
    });

    req.session.geoInfo = res.data;
    console.log("🌍 Fetched geo info and saved to session");

    return res.data;
  } catch (err) {
    console.error("❌ Failed to fetch geo info:", err.message);

    // Fallback with only IP
    const fallback = {
      ip:
        req.headers["x-forwarded-for"] ||
        req.connection.remoteAddress ||
        "unknown",
    };
    console.log("⚠️ Using fallback geo info:", fallback);

    return fallback;
  }
};

export function getBrowserType(userAgent) {
  const result = userAgentParser(userAgent);
  return result.browser.name;
}

export function getDeviceName(userAgent) {
  const result = userAgentParser(userAgent);
  return result.os ? result.os.name : "Unknown Device";
}
