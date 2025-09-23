import { Router } from "express";
import { authorize_admin, authorize_superadmin } from "../middlewares/auth.middleware.js";
import { generalLimiter } from "../middlewares/rateLimit.middleware.js";
import { getStatistics, getSummary, getTrends } from "../controllers/analytics.controller.js";

const AnalyticsRouter = Router();

AnalyticsRouter.get('/statistics', authorize_superadmin, generalLimiter, (req, res, next) => {
  getStatistics(req, res, next);
});
AnalyticsRouter.get('/summary', authorize_admin, generalLimiter, (req, res, next) => {
  getSummary(req, res, next);
});
AnalyticsRouter.get('/trends', authorize_admin, generalLimiter, (req, res, next) => {
  getTrends(req, res, next);
});

export default AnalyticsRouter;
