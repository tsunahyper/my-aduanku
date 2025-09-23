import rateLimit from 'express-rate-limit';

// Auth endpoints: register/login
export const authLimiter = rateLimit({
  windowMs: 60_000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: 'Too many attempts, try again later.' },
  keyGenerator: (req) => req.ip
});

// File upload endpoints (avatars, attachments)
export const uploadLimiter = rateLimit({
  windowMs: 60_000,
  max: 15,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: 'Upload rate limit exceeded.' },
  keyGenerator: (req) => req.ip
});

// Comments (create/update/like)
export const commentLimiter = rateLimit({
  windowMs: 60_000,
  max: 30,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: 'Commenting too fast, slow down.' },
  keyGenerator: (req) => req.ip
});

// Analytics/general read endpoints
export const generalLimiter = rateLimit({
  windowMs: 60_000,
  max: 120,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: 'Rate limit exceeded.' },
  keyGenerator: (req) => req.ip
});
