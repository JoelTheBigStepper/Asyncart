// ============================================================
// FILE: routes/webhook.js (add this to your asyncart backend)
// ============================================================
import express from "express";
import crypto from "crypto";
import { Router } from "express";
import Project from "../models/Projects.js"; // your existing Project model

const router = Router();
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

// ─── Wait for mongoose to be connected ───────────────────────────────────────
async function waitForDB(maxWaitMs = 30000) {
  const mongoose = require('mongoose');
  const start = Date.now();
  while (mongoose.connection.readyState !== 1) {
    if (Date.now() - start > maxWaitMs) {
      throw new Error('Database not ready after 30 seconds');
    }
    await new Promise(r => setTimeout(r, 500));
  }
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

    // Respond immediately so Velastrux marks delivery as received
    // Then process async — prevents timeout on Render cold starts
    res.status(200).json({ received: true });

    try {
      // Wait for MongoDB to be fully connected before any DB operations
      await waitForDB();

      switch (event) {
        case 'record.updated': {
          // data.record._externalId is the original MongoDB _id from asyncart
          const { _externalId, _recordId, _velastruxId, ...fields } = data.record;
          if (!_externalId || _externalId.startsWith('local_')) break;
          try {
            await Project.findByIdAndUpdate(_externalId, fields, { new: true });
            console.log(`[Velastrux] Updated project ${_externalId}`);
          } catch (castErr) {
            console.error(`[Velastrux] Invalid ID for update: ${_externalId}`);
          }
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

          // _externalId for locally created records is a timestamp string like "local_1234"
          // not a valid MongoDB ObjectId — use findById safely
          let existing = null;
          if (_externalId && !_externalId.startsWith('local_')) {
            try {
              existing = await Project.findById(_externalId);
            } catch {
              // Invalid ObjectId — treat as new record
            }
          }

          if (!existing) {
            await Project.create(fields);
            console.log(`[Velastrux] Created new project from Velastrux`);
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

    } catch (err) {
      // Error is logged server-side — response already sent
      console.error('[Velastrux] Webhook processing error:', err.message);
    }
  }
);

export default router;