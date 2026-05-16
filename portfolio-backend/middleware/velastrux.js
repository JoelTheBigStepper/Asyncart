// ============================
// 🔐 VELASTRUX AUTHENTICATION MIDDLEWARE
// ============================
// Validates requests from Velastrux origins with proper token verification

const VELASTRUX_ORIGINS = [
  'http://localhost:5173',
  'https://velastrux.app',
  // Add your deployed Velastrux frontend URL here
];

/**
 * Velastrux Authentication Middleware
 * Validates:
 * 1. Request origin is from trusted Velastrux sources
 * 2. X-Velastrux-Token header matches environment variable
 */
const velastruxMiddleware = (req, res, next) => {
  const origin = req.headers.origin || '';
  const token = req.headers['x-velastrux-token'];

  // Check if this is a Velastrux request
  const isVelastruxRequest = VELASTRUX_ORIGINS.some(o => origin.startsWith(o)) ||
    origin.includes('velastrux');

  // If it's a Velastrux request, validate the token
  if (isVelastruxRequest) {
    // Check if token is configured
    if (!process.env.VELASTRUX_TOKEN) {
      console.error('🔐 [Velastrux] ❌ VELASTRUX_TOKEN not set in .env');
      return res.status(500).json({
        error: 'Server configuration error: Velastrux token not configured',
        code: 'CONFIG_ERROR',
      });
    }

    // Validate token
    if (!token) {
      console.warn(`🔐 [Velastrux] ⚠️ Missing token from origin: ${origin}`);
      return res.status(401).json({
        error: 'Missing X-Velastrux-Token header',
        code: 'MISSING_TOKEN',
      });
    }

    if (token !== process.env.VELASTRUX_TOKEN) {
      console.warn(`🔐 [Velastrux] ⚠️ Invalid token from origin: ${origin}`);
      return res.status(401).json({
        error: 'Invalid Velastrux token',
        code: 'INVALID_TOKEN',
      });
    }

    console.log(`✅ [Velastrux] Authenticated request from: ${origin}`);
  }

  // Allow request to proceed
  next();
};

export default velastruxMiddleware;