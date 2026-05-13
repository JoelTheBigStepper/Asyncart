import express from "express";
import crypto from "crypto";
import Project from "../models/Projects.js"; // your existing Project model

const router = express.Router();

// ─── Signature verification middleware ───────────────────────────────────────
function verifyVelastruxSignature(req, res, next) {
  const signature = req.headers['x-velastrux-signature'];
  const event = req.headers['x-velastrux-event'];

  if (!signature || !event) {
    return res.status(401).json({ error: 'Missing Velastrux headers' });
  }

  // VELASTRUX_WEBHOOK_SECRET = the secret shown when you created the webhook
  const secret = process.env.VELASTRUX_WEBHOOK_SECRET;
  if (!secret) {
    console.error('VELASTRUX_WEBHOOK_SECRET is not set');
    return res.status(500).json({ error: 'Webhook secret not configured' });
  }

  // Compute expected signature from raw body
  const expected = 'sha256=' + crypto
    .createHmac('sha256', secret)
    .update(req.body) // req.body must be raw Buffer here
    .digest('hex');

  // Constant-time comparison prevents timing attacks
  const sigBuffer = Buffer.from(signature);
  const expBuffer = Buffer.from(expected);

  if (
    sigBuffer.length !== expBuffer.length ||
    !crypto.timingSafeEqual(sigBuffer, expBuffer)
  ) {
    return res.status(401).json({ error: 'Invalid signature' });
  }

  // Parse body after verification
  try {
    req.velastruxPayload = JSON.parse(req.body.toString());
  } catch {
    return res.status(400).json({ error: 'Invalid JSON body' });
  }

  next();
}

// ─── Webhook receiver ─────────────────────────────────────────────────────────
// IMPORTANT: use express.raw() for this route so the raw body is available
// for signature verification. Must be registered BEFORE express.json() parses it.
router.post(
  '/velastrux',
  express.raw({ type: 'application/json' }),
  verifyVelastruxSignature,
  async (req, res) => {
    const { event, data } = req.velastruxPayload;

    try {
      switch (event) {
        case 'record.updated': {
          // data.record._externalId is the original MongoDB _id from asyncart
          const { _externalId, _recordId, _velastruxId, ...fields } = data.record;
          if (!_externalId) break;
          await Project.findByIdAndUpdate(_externalId, fields, { new: true });
          console.log(`[Velastrux] Updated project ${_externalId}`);
          break;
        }

        case 'record.deleted': {
          // data._externalId is the original _id of the deleted record
          if (!data._externalId) break;
          await Project.findByIdAndDelete(data._externalId);
          console.log(`[Velastrux] Deleted project ${data._externalId}`);
          break;
        }

        case 'record.created': {
          // Locally created records in Velastrux — save to asyncart DB
          // Strip Velastrux-internal fields before saving
          const { _externalId, _recordId, _velastruxId, ...fields } = data.record;
          const existing = await Project.findById(_externalId);
          if (!existing) {
            await Project.create(fields);
            console.log(`[Velastrux] Created new project`);
          }
          break;
        }

        case 'connection.synced': {
          // Just a notification — no DB changes needed
          console.log(`[Velastrux] Sync completed: ${data.recordCount} records`);
          break;
        }

        case 'webhook.test': {
          // Test delivery — just acknowledge
          console.log('[Velastrux] Test delivery received');
          break;
        }

        default:
          console.log(`[Velastrux] Unknown event: ${event}`);
      }

      // Always respond 200 quickly — Velastrux marks delivery as successful
      res.status(200).json({ received: true });

    } catch (err) {
      console.error('[Velastrux] Webhook processing error:', err.message);
      // Still return 200 to prevent Velastrux from retrying
      // Log the error internally for debugging
      res.status(200).json({ received: true, warning: 'Processing error logged' });
    }
  }
);

export default router;