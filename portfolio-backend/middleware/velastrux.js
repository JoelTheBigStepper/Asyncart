const VELASTRUX_ORIGINS = [
  'http://localhost:5173',
  'https://velastrux.app',
  // Add your deployed Velastrux frontend URL here
];

module.exports = function velastruxMiddleware(req, res, next) {
  const origin = req.headers.origin || '';
  const token = req.headers['x-velastrux-token'];

  const isVelastruxRequest = VELASTRUX_ORIGINS.some(o => origin.startsWith(o)) ||
    origin.includes('velastrux');

  if (isVelastruxRequest) {
    // Validate token
    if (!process.env.VELASTRUX_TOKEN) {
      console.error('[Velastrux] VELASTRUX_TOKEN not set in .env');
      return res.status(500).json({ error: 'Velastrux token not configured' });
    }

    if (!token || token !== process.env.VELASTRUX_TOKEN) {
      return res.status(401).json({ error: 'Invalid Velastrux token' });
    }
  }

  next();
};