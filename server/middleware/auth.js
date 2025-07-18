module.exports = (requiredRole) => (req, res, next) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader) {
    return res.status(401).json({ error: 'Authorization header missing' });
  }
  
  const token = authHeader.split(' ')[1];
  
  // Hardcoded tokens for prototype
  const validTokens = {
    viewer: process.env.VIEWER_TOKEN,
    reviewer: process.env.REVIEWER_TOKEN
  };
  
  if (!Object.values(validTokens).includes(token)) {
    return res.status(401).json({ error: 'Invalid token' });
  }
  
  // Determine role from token
  let role = 'viewer';
  if (token === validTokens.reviewer) role = 'reviewer';
  
  // Check if role meets requirement
  if (requiredRole === 'reviewer' && role !== 'reviewer') {
    return res.status(403).json({ error: 'Insufficient permissions' });
  }
  
  // Attach user to request
  req.user = {
    id: `user-${token.slice(-6)}`,
    role,
    name: role === 'reviewer' ? 'Analyst' : 'Executive'
  };
  
  next();
};