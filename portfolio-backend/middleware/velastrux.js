// middleware/velastrux.js
export default function velastrux(req, res, next) {
  const token = req.headers['x-velastrux-token'];

  // Only validate requests that include the Velastrux token header
  if (token === undefined) {
    return next(); // Not a Velastrux request — pass through
  }

  const expectedToken = process.env.VELASTRUX_TOKEN;

  if (!expectedToken) {
    console.error('[Velastrux] ❌ VELASTRUX_TOKEN not set in .env');
    return res.status(500).json({ error: 'Velastrux token not configured on server' });
  }

  if (token !== expectedToken) {
    return res.status(401).json({ error: 'Invalid Velastrux token' });
  }

  req.isVelastrux = true;
  next();
}