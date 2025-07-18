const { v4: uuidv4 } = require('uuid');

module.exports = (req, res, next) => {
  const start = Date.now();
  const traceId = uuidv4();
  
  res.setHeader('X-Trace-Id', traceId);
  
  const originalSend = res.send;
  res.send = function(body) {
    const duration = Date.now() - start;
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl} - ${res.statusCode} ${duration}ms - TraceID: ${traceId}`);
    originalSend.call(this, body);
  };
  
  next();
};