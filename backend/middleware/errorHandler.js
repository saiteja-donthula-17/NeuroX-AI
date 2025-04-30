export const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  res.status(401).send("Unauthenticated!");
};