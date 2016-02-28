var express = require('express');
var router = express.Router();
var multer = require('multer');
var crypto = require('crypto');
var path = require('path');
var passport = require('passport');
var bcrypt = require('bcrypt-nodejs');
var Model = require('../model');

//var Home = require('../controllers/Home');
//var Lead = require('../controllers/Lead');
//var SaveLead = require('../controllers/SaveLead');
var SearchLead = require('../controllers/SearchLead');
//var About = require('../controllers/About');
//var SignIn = require('../controllers/SignIn');
//var SignUp = require('../controllers/SignUp');
//var SignupPOST = require('../controllers/SignupPOST');
//var SigninPOST = require('../controllers/SigninPOST');


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
// example : http://localhost:3000/
router.get('/', function (req, res, next) {

    var user = req.user;

    if (user !== undefined) {
        user = user.toJSON();
    }

    res.render('home/index', { title: 'Home', user: user });
}); // 1

/* GET sign up form */
// example : http://localhost:3000/signup
router.get('/signup', function (req, res, next) {
    if (req.isAuthenticated()) {
        res.redirect('/');
    } else {
        res.render('signup/index');
    }
}); // 2

/* POST sign up form */
// example : http://localhost:3000/signup/
router.post('/signup', function (req, res, next) {
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
}); // 2

/* GET signin form. */
// example : http://localhost:3000/signin
router.get('/signin', function (req, res, next) {
    if (req.isAuthenticated())
        res.redirect('/');
    else
        res.render('signin/index');
}); // 3

/* POST signin form. */
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
}); // 3

/* GET signin form after registration */
// example : http://localhost:3000/signin/:email
router.get('/signin/:email', function (req, res, next) {
    if (req.isAuthenticated())
        res.redirect('/');
    else
        res.render('signin/index', { view_email: req.params.email });
}); // 3

/* GET form new product */
// example : http://localhost:3000/product-new
router.get('/product-new', function (req, res, next) {

    if (req.isAuthenticated()) {
        var user = req.user;

        if (user !== undefined) {
            user = user.toJSON();
        }

        res.render('product/create', { user: user });
    } else {
        res.render('signin/index');
    }
});  // 4

/* POST form new product */
// example : http://localhost:3000/lead/save-lead
router.post('/product-new', upload.any(), function (req, res, next) {

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
            res.render('product/create', { successMessage: 'product successfully added', user: user });
        });
        // }
    }
    else {
        res.render('signin/index');
    }
}); // 4

/* Get form manage product */
// example : http://localhost:3000/product-manage
router.get('/product-manage', function (req, res, next) {

    if (req.isAuthenticated()) {
        SearchLead.run(req, res, next);
    } else {
        res.render('signin/index');
    }
}); // 5

/* GET JSON all product */
// example : http://localhost:3000/products/list
router.get('/products/list', function (req, res, next) {

    var PAGINATION_LIMIT = req.query.page;
    var ITEMS_PER_PAGE = req.query.itemsByPage;
    var offset = (PAGINATION_LIMIT - 1) * ITEMS_PER_PAGE;

    new Model.Product()
        .count('productId')
        .then(function (count) {
            new Model.Product()
                .query({ limit: ITEMS_PER_PAGE, offset: offset })
                .fetchAll()
                .then(function (collection) {

                    var params = {
                        NumItems: count,
                        data: collection
                    };

                    res.end(JSON.stringify(params))
                });
        });
}); // 6

/* Get JSON customer's list */
// example : http://localhost:3000/products/customerlist
router.get('/products/customerlist', function (req, res, next) {

    if (req.isAuthenticated()) {

        var user = req.user;

        if (user !== undefined) {
            user = user.toJSON();
        }

        var customerId = user.customerId;
        var PAGINATION_LIMIT = req.query.page;
        var ITEMS_PER_PAGE = req.query.itemsByPage;
        var offset = (PAGINATION_LIMIT - 1) * ITEMS_PER_PAGE;

        new Model.Product()
            .where('productCustomerId', customerId)
            .count('productId')
            .then(function (count) {
                new Model.Product()
                    .where('productCustomerId', customerId)
                    .query({ limit: ITEMS_PER_PAGE, offset: offset })
                    .fetchAll()
                    .then(function (collection) {
                        var params = {
                            NumItems: count,
                            data: collection
                        };

                        res.end(JSON.stringify(params))
                    });
            });
    } else {
        res.render('signin/index');
    }

});

// sign out
router.get('/signout', function (req, res, next) {
    if (!req.isAuthenticated()) {
        res.redirect('/');
    } else {
        req.logout();
        res.redirect('/');
    }
});

/* Get search view for lead */
// example : http://localhost:3000/search-lead/search?word=example
//router.get('/search-lead/:search?', function (req, res, next) {
//    SearchLead.run(req, res, next);
//});


module.exports = router;
