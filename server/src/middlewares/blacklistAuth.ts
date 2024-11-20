

// export const isTokenBlacklisted = async (req, res, next) => {
//     const token = req.headers.authorization?.split(' ')[1];
  
//     if (!token) {
//       return res.status(401).json({ success: false, error: 'Unauthorized token toer' });
//     }
  
//     const isBlacklisted = await BlacklistToken.findOne({ token }).lean();
//     if (isBlacklisted) {
//       return res.status(401).json({ success: false, error: 'Unauthorized token' });
//     }
  
//     next();
//   };
  