import { Router } from "express";
import { authorize_admin, authorize_superadmin } from "../middlewares/auth.middleware.js";
import { generalLimiter } from "../middlewares/rateLimit.middleware.js";
import { getAnalyticsDashboard, generateAnalytics, getIssuesStatistics } from "../controllers/analytics.controller.js";

const AnalyticsRouter = Router();

AnalyticsRouter.get('/statistics', authorize_superadmin, generalLimiter, (req, res, next) => {
  getIssuesStatistics(req, res, next);
});

AnalyticsRouter.get('/summary', authorize_admin, generalLimiter, (req, res, next) => {
  getAnalyticsDashboard(req, res, next);
});

AnalyticsRouter.post('/generate', authorize_superadmin, (req, res, next) => {
  generateAnalytics(req, res, next);
});

export default AnalyticsRouter;