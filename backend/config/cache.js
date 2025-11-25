const NodeCache = require('node-cache');

// Cache with 5 minute TTL and check period of 2 minutes
const cache = new NodeCache({
  stdTTL: 300,
  checkperiod: 120,
  useClones: false
});

// Cache middleware for GET requests
const cacheMiddleware = (duration = 300) => {
  return (req, res, next) => {
    // Only cache GET requests
    if (req.method !== 'GET') {
      return next();
    }

    const key = `__express__${req.originalUrl || req.url}`;
    const cachedResponse = cache.get(key);

    if (cachedResponse) {
      return res.json(cachedResponse);
    }

    // Store original json method
    const originalJson = res.json.bind(res);

    // Override json method to cache response
    res.json = (data) => {
      cache.set(key, data, duration);
      return originalJson(data);
    };

    next();
  };
};

// Clear cache for specific patterns
const clearCache = (pattern) => {
  const keys = cache.keys();
  keys.forEach(key => {
    if (key.includes(pattern)) {
      cache.del(key);
    }
  });
};

// Clear all property-related cache
const clearPropertyCache = () => {
  clearCache('properties');
};

// Clear all user-related cache
const clearUserCache = (userId) => {
  clearCache(`user_${userId}`);
};

// Get cache stats
const getCacheStats = () => {
  return cache.getStats();
};

module.exports = {
  cache,
  cacheMiddleware,
  clearCache,
  clearPropertyCache,
  clearUserCache,
  getCacheStats
};
