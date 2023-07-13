const withAuth = (req, res, next) => {
  // If the user isn't logged in, redirect them to the login route
  console.log("withAuth is running for", req.originalUrl);
  if (!req.session.loggedIn) {
    console.log("this is redirecting to /login");
    res.redirect('/login');
  } else {
    console.log("this is the next section");
    next();
  }
};

module.exports = withAuth;
