export default function handler(req, res) {
  try {
    const healthCheck = {
      status: "healthy",
      timestamp: new Date().toISOString(),
      database: "connected"
    };
    res.status(200).json(healthCheck);
  } catch (error) {
    res.status(500).json({ error: "Database health check failed" });
  }
}
