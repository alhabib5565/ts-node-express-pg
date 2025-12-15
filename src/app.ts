import express, { Application, Request, Response, NextFunction } from 'express';

// Create Express app
const app: Application = express();
// JSON body parser
app.use(express.json());

// Request logging middleware (development এ useful)
app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

// ========================================
// ROUTES
// ========================================

app.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString(),
  });
});

// API routes
// app.use('/api/users', userRoutes);

// ========================================
// ERROR HANDLING
// ========================================

// 404 handler - কোন route match না করলে
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
    path: req.path,
  });
});

// Global error handler - যেকোন error catch করার জন্য
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error('Global error:', err);

  res.status(500).json({
    success: false,
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined,
  });
});

export default app;
