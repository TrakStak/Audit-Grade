const rateLimit = new Map();

export function rateLimitMiddleware(req, limit = 10, window = 60000) {
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  const now = Date.now();
  
  if (!rateLimit.has(ip)) {
    rateLimit.set(ip, { count: 1, resetTime: now + window });
    return true;
  }
  
  const userLimit = rateLimit.get(ip);
  
  if (now > userLimit.resetTime) {
    userLimit.count = 1;
    userLimit.resetTime = now + window;
    return true;
  }
  
  if (userLimit.count >= limit) {
    return false;
  }
  
  userLimit.count++;
  return true;
}

export const soc2Middleware = {
  // Encryption at rest
  encryptPII: (data) => {
    // Encrypt name, DOB, Medicare numbers
    return crypto.encrypt(data)
  },
  
  // Access controls
  enforceIPWhitelist: (req) => {
    const allowedIPs = process.env.ALLOWED_IPS?.split(',') || []
    const clientIP = req.headers['x-forwarded-for']
    return allowedIPs.includes(clientIP)
  },
  
  // Session timeout (30 min for SOC2)
  enforceSessionTimeout: (session) => {
    const timeout = 30 * 60 * 1000 // 30 minutes
    return Date.now() - session.lastActivity < timeout
  },
  
  // Data retention (7 years for aged care)
  scheduleDataRetention: async () => {
    const retentionPeriod = 7 * 365 * 24 * 60 * 60 * 1000 // 7 years
    await supabase.rpc('delete_old_records', { 
      older_than: new Date(Date.now() - retentionPeriod) 
    })
  }
}
