// middleware/velastrux.js
// Validates X-Velastrux-Token on all /api requests from Velastrux dashboard

export default function velastrux(req, res, next) {
  const token = req.headers['x-velastrux-token'];
  const origin = req.headers.origin || '';

  // Only validate requests coming from a Velastrux origin
  const isVelastruxRequest = token !== undefined;

  if (!isVelastruxRequest) {
    // Not a Velastrux request — pass through to your normal auth
    return next();
  }

  // It's a Velastrux request — validate the token
  const expectedToken = process.env.VELASTRUX_TOKEN;

  if (!expectedToken) {
    console.error('[Velastrux] ❌ VELASTRUX_TOKEN not set in .env');
    return res.status(500).json({ error: 'Velastrux token not configured on server' });
  }

  if (token !== expectedToken) {
    return res.status(401).json({ error: 'Invalid Velastrux token' });
  }

  // Valid token — mark request as Velastrux so routes know
  req.isVelastrux = true;
  next();
}