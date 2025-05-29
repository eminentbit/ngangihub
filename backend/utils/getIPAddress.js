export const getIPAddress = (req) => {
  let ip;

  // Get IP from X-Forwarded-For header
  if (req.headers["x-forwarded-for"]) {
    ip = req.headers["x-forwarded-for"].split(",")[0];
  }
  // Get IP from X-Real-IP header
  else if (req.headers["x-real-ip"]) {
    ip = req.headers["x-real-ip"];
    console.log(ip);
  }
  // Get IP from request connection
  else if (req.connection && req.connection.remoteAddress) {
    ip = req.connection.remoteAddress;
  }
  // Get IP from request socket
  else if (req.socket && req.socket.remoteAddress) {
    ip = req.socket.remoteAddress;
  }
  // Fallback
  else {
    ip = "0.0.0.0";
  }

  // Remove IPv6 prefix if present
  return ip.replace(/^::ffff:/, "");
};
