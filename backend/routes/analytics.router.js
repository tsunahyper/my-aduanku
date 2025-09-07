import { Router } from "express";
import { 
    getAnalyticsDashboard, 
    generateAnalytics, 
    getIssuesStatistics
} from "../controllers/analytics.controller.js";
import { 
    authorize_admin, 
    authorize_superadmin
} from "../middlewares/auth.middleware.js";

const AnalyticsRouter = Router();

// Admin routes
AnalyticsRouter.get('/statistics', authorize_admin, getIssuesStatistics);

// Super admin routes
AnalyticsRouter.get('/dashboard', authorize_superadmin, getAnalyticsDashboard);
AnalyticsRouter.post('/generate', authorize_superadmin, generateAnalytics);

export default AnalyticsRouter;
