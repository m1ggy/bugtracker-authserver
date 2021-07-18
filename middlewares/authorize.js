import jwt from 'jsonwebtoken';

export function authorize(req, res, next) {
  console.log('authorizing 🔃');
  console.log(req.headers);
  if (req.headers['authorization'] == null) {
    return res.status(403).json({ message: 'Please provide authorization' });
  }
  const authHeader = req.headers.authorization;

  const accessToken = authHeader && authHeader.split(' ')[1];

  if (accessToken == null) return res.status(400).send();

  jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.status(403).json({ err });
    req.user = user;
    console.log('successfully authorized ✅');
    next();
  });
}
