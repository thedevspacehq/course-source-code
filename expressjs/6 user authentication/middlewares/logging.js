export default async function addLogging(req, res, next) {
  console.log(req);
  next();
}
