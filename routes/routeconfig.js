var express = require('express');
var router = express.Router();
var multer = require('multer');
var crypto = require('crypto');
var path = require('path');
var Home = require('../controllers/Home');
var Lead = require('../controllers/Lead');
var SaveLead = require('../controllers/SaveLead');
var SearchLead = require('../controllers/SearchLead');
var About = require('../controllers/About');
var SignIn = require('../controllers/SignIn');
var SignUp = require('../controllers/SignUp');
var SignupPOST = require('../controllers/SignupPOST');
var SigninPOST = require('../controllers/SigninPOST');
var passport = require('passport');
var bcrypt = require('bcrypt-nodejs');
var Model = require('../model');

var storage = multer.diskStorage({
    destination: './public/uploads/',
    filename: function (req, file, cb) {
        crypto.pseudoRandomBytes(16, function (err, raw) {
            if (err) return cb(err)

            cb(null, raw.toString('hex') + path.extname(file.originalname))
        })
    }
})

var upload = multer({ storage: storage });

/* GET home page. */
// example : http://localhost:3000
router.get('/', function (req, res, next) {

    //if (!req.isAuthenticated()) {
    //    res.redirect('/signin');
    //} else {

        var user = req.user;

        if (user !== undefined) {
            user = user.toJSON();
        }

        res.render('home/index', { title: 'Home', user: user });
       // Home.run(req, res, next);
    //}
});

/* GET create form for lead */
// example : http://localhost:3000/lead
router.get('/lead', function (req, res, next) {
   // Lead.run(req, res, next);
  

    if (req.isAuthenticated()) {
        var user = req.user;

        if (user !== undefined) {
            user = user.toJSON();
        }

        res.render('lead/index', {  user: user });
    } else {
        res.render('signin/index');
    }
});


/* GET create form for lead */
// example : http://localhost:3000/lead/id
router.get('/lead/:id', function (req, res, next) {
    Lead.run(req, res, next);
});

/* POST form for lead */
// example : http://localhost:3000/lead/save-lead
router.post('/lead/save-lead', upload.any(), function (req, res, next) {

    if (req.isAuthenticated()) {

       var product = JSON.parse(JSON.stringify(req.body));

        var filename = req.files[0] ? req.files[0].filename : '';

       var user = req.user;

       if (user !== undefined) {
           user = user.toJSON();
       }

       var customerId = user.customerId;

       //var usernamePromise = null;
       //usernamePromise = new Model.User({ email: user.join_email }).fetch();

       //return usernamePromise.then(function (model) {
       //    if (model) {
       //        res.render('signup/index', { title: 'signup', errorMessage: 'email already exists' });
       //    } else {
       //****************************************************//
       // MORE VALIDATION GOES HERE(E.G. PASSWORD VALIDATION)
       //****************************************************//
       // var password = user.join_password;
       // var hash = bcrypt.hashSync(password);

       var saveProduct = new Model.Product({ name: product.name, description: product.description, price: product.price, category: product.category, productImageUrl: filename, productCustomerId: customerId });

       saveProduct.save().then(function (model) {
           // sign in the newly registered user
           //signInPost(req, res, next);
           res.render('lead/index', { successMessage: 'product successfully added',user:user });
       });
       // }

   }
   else {
       res.render('signin/index');
   }
    });


/* Get search view for lead */
// example : http://localhost:3000/search-lead
router.get('/search-lead', function (req, res, next) {

    if (req.isAuthenticated()) {
         SearchLead.run(req, res, next);
    } else {
        res.render('signin/index');
    }
});

/* Get search view for lead */
// example : http://localhost:3000/search-lead/list
router.post('/search-lead/list', function (req, res, next) {
    SearchLead.getjson(req, res, next);
});

/* Get search view for lead */
// example : http://localhost:3000/search-lead/search?word=example
router.get('/search-lead/:search?', function (req, res, next) {
    SearchLead.run(req, res, next);
});

/* GET about page. */
// example : http://localhost:3000/about
router.get('/about', function (req, res, next) {
    About.run(req, res, next);
});

/* GET signin page. */
// example : http://localhost:3000/signin
router.get('/signin', function (req, res, next) {

    if (req.isAuthenticated())
        res.redirect('/');
    else
        res.render('signin/index');
       // SignIn.run(req, res, next);
});

/* GET signin page. */
// example : http://localhost:3000/signin
router.get('/signin/:email', function (req, res, next) {

    if (req.isAuthenticated())
        res.redirect('/');
    else
        res.render('signin/index', { view_email: req.params.email });
       // SignIn.run(req, res, next);
});

/* POST signin page. */
// example : http://localhost:3000/signin
router.post('/signin', function (req, res, next) {
    //  SigninPOST.run(req, res, next);
    passport.authenticate(
   'local',
   {
       successRedirect: '/',
       failureRedirect: '/signin'
   },
   function (err, user, info) {
       if (err) {
           return res.render('signin', { title: 'Sign In', errorMessage: err.message });
       }

       if (!user) {
           return res.render('signin', { title: 'Sign In', errorMessage: info.message });
       }

       return req.logIn(user, function (err) {
           if (err) {
               return res.render('signin', { title: 'Sign In', errorMessage: err.message });
           } else {
               return res.redirect('/');
           }
       });
   })(req, res, next);
});

/* GET sign up form */
// example : http://localhost:3000/signup
router.get('/signup', function (req, res, next) {
    // SignUp.run(req, res, next);
    if (req.isAuthenticated()) {
        res.redirect('/');
    } else {
        res.render('signup/index');
    }
});

/* POST sign up form */
// example : http://localhost:3000/signup/
router.post('/signup', function (req, res, next) {
    // SignupPOST.run(req, res, next);
    var user = JSON.parse(JSON.stringify(req.body));
    var usernamePromise = null;
    usernamePromise = new Model.User({ email: user.join_email }).fetch();

    return usernamePromise.then(function (model) {
        if (model) {
            res.render('signup/index', { title: 'signup', errorMessage: 'email already exists' });
        } else {
            //****************************************************//
            // MORE VALIDATION GOES HERE(E.G. PASSWORD VALIDATION)
            //****************************************************//
           // var password = user.join_password;
           // var hash = bcrypt.hashSync(password);

            var signUpUser = new Model.User({ firstName: user.first_name, lastName: user.last_name, email: user.join_email, password: user.join_password });

            signUpUser.save().then(function (model) {
                // sign in the newly registered user
                //signInPost(req, res, next);
                res.redirect('/signin/' + user.join_email);
            });
        }
    });

});


router.get('/signout', function (req, res, next) {
    if (!req.isAuthenticated()) {
        notFound404(req, res, next);
    } else {
        req.logout();
        res.redirect('/');
    }
});

module.exports = router;
