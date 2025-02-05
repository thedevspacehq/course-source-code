export default async function isAuthenticated(req, res, next) {
  if (req.cookies.authenticated === "true") {
    next();
  } else {
    res.redirect("/users/signin");
  }
}
