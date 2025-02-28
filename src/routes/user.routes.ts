const router = require("express").Router();
// Bring in the User Registration function
const {
  userAuth,
  userLogin,
  checkRole,
  userRegister,
  serializeUser,
  googleAuth,
  // googleAuthCallback
} = require("../utils/auth");

// Users Registeration Route
// router.post("/register-reader", async (req: { body: any; }, res: any) => {
//   await userRegister(req.body, "reader", res);
// });

// Editor Registration Route
router.post("/register-editor", async (req: { body: any; }, res: any) => {
  await userRegister(req.body, "editor", res);
});

// Admin Registration Route
router.post("/register-admin", async (req: { body: any; }, res: any) => {
  await userRegister(req.body, "admin", res);
});

// Reader Login Route
// router.post("/login-reader", async (req: { body: any; }, res: any) => {
//   await userLogin(req.body, "reader", res);
// });

// Admin Login Route
router.post("/login-editor", async (req: { body: any; }, res: any) => {
  await userLogin(req.body, "editor", res);
});

// Admin Login Route
router.post("/login-admin", async (req: { body: any; }, res: any) => {
  await userLogin(req.body, "admin", res);
});

// Profile Route
router.get(
    "/profile", 
    // userAuth, 
    // googleAuthCallback,
    async (req: { user: any; }, res: any) => {
        // return res.json(await serializeUser(req.user));
        return res.send("You are authenticated");
    }
);


// Read Route
router.get(
    "/read",
    // checkRole(["reader"]),
    async (req: any, res: { json: (arg0: string) => any; }) => {
      return res.json("Hello Reader");
    }
);


// Edit Route
router.get(
  "/edit",
  userAuth,
  checkRole(["editor"]),
  async (req: any, res: { json: (arg0: string) => any; }) => {
    return res.json("Hello Editor");
  }
);


// Admin Route
router.get(
  "/admin",
  userAuth,
  checkRole(["admin"]),
  async (req: any, res: { json: (arg0: string) => any; }) => {
    return res.json("Hello Admin");
  }
);

// Protected Route
router.get(
  "/protected",
  userAuth,
  checkRole(["editor", "admin"]),
  async (req: any, res: { json: (arg0: string) => any; }) => {
    return res.json("Only editors and Admins can access this route, Welcome!");
  }
);


//Google Authentication

router.get('/', (req: any, res: any) => {
  res.send("<button><a href='/api/users/auth'>Login With Google</a></button>");
})

router.get('/auth', googleAuth);


export default router;