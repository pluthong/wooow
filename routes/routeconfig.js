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
//var SearchLead = require('../controllers/SearchLead');
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

                res.redirect('/signin/' + user.join_email);

            });
        }
    });
}); // 2

/* GET signin form. */
// example : http://localhost:3000/signin
router.get('/signin', function (req, res, next) {
    if (req.isAuthenticated())
        res.redirect('/product-manage');
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
       successRedirect: '/product-manage',
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
               return res.redirect('/product-manage');
           }
       });
   })(req, res, next);
}); // 3

/* GET signin form after registration */
// example : http://localhost:3000/signin/name@gmail.com
router.get('/signin/:email', function (req, res, next) {
    if (req.isAuthenticated())
        res.redirect('/product-manage');
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

        res.redirect('/signin');
    }
});  // 4

/* POST form new product */
// example : http://localhost:3000/product-new
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

        var saveProduct = new Model.Product({ name: product.name, description: product.description, price: product.price, category: product.category, productCustomerId: customerId });

        saveProduct.save().then(function (product) {

            var p = product.toJSON();
            var saveProductImageMain = new Model.ProductImage({ productImageMain: 1, productImageUrl: filename, productImageProductId: p.productId });

            saveProductImageMain.save().then(function (productImage) {

                res.render('product/create', { successMessage: 'product successfully added', user: user });

            });
        });
    }
    else {
        res.redirect('/signin');
    }
}); // 4

/* Get form manage product */
// example : http://localhost:3000/product-manage
router.get('/product-manage', function (req, res, next) {

    if (req.isAuthenticated()) {
        //SearchLead.run(req, res, next);
        var user = req.user;

        if (user !== undefined) {
            user = user.toJSON();
        }

        res.render('manage/index', { user: user });
    } else {
        res.redirect('/signin');
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
                .fetchAll({
                    withRelated: ['images']
                })
                .then(function (collection) {

                    //collection.forEach(function (e) {
                    //    console.log(JSON.stringify(e.related('images')));
                    //});

                    //console.log(collection.toJSON()[0].images);

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
                    .fetchAll({
                        withRelated: ['images', {
                            'images': function (qb) {
                                // qb is a reference to the query builder, so you can use all its methods here
                                qb.where('productImageMain', 1);
                            }
                        }]
                    })
                    .then(function (collection) {

                        //collection.forEach(function (e) {
                        //    console.log(JSON.stringify(e.related('images')));
                        //});

                        var params = {
                            NumItems: count,
                            data: collection
                        };

                        res.end(JSON.stringify(params))
                    });
            });
    } else {
        res.redirect('/signin');
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

/* Get delete product by productId */
// example : http://localhost:3000/deleteProduct/1
router.get('/deleteProduct/:id', function (req, res, next) {
    if (req.isAuthenticated()) {

        Model.Product.forge({ productId: req.params.id })
            .fetch({ require: true })
            .then(function (product) {
                var p = product.toJSON();
                product.destroy()
                    .then(function () {

                        Model.ProductImage.forge({ productImageProductId: req.params.id })
                            .fetch({ require: true })
                            .then(function (img) {

                                img.destroy()
                                    .then(function () {
                                        res.json({ error: false, data: { message: 'Product : "' + p.name + '" successfully deleted' } });
                                    })
                                    .catch(function (err) {
                                        res.status(500).json({ error: true, data: { message: err.message } });
                                    });
                            })
                            .catch(function (err) {
                                res.status(500).json({ error: true, data: { message: err.message } });
                            });
                    })
                    .catch(function (err) {
                        res.status(500).json({
                            error: true, data: { message: err.message }
                        });
                    });
            })
            .catch(function (err) {
                res.status(500).json({ error: true, data: { message: err.message } });
            });
    } else {

        res.redirect('/signin');
    }
});

/* Get delete image */
// example : http://localhost:3000/deleteImage
router.get('/deleteImage', function (req, res, next) {

    if (req.isAuthenticated()) {

        var productId = req.query.productId;
        var imageId = req.query.imageId;

        Model.ProductImage
            .forge({ productImageProductId: productId, productImageId: imageId })
            .fetch({ require: true })
            .then(function (img) {
                img.destroy()
                    .then(function () {
                        res.json({ error: false, data: { message: 'Image successfully deleted' } });
                    })
                    .catch(function (err) {
                        res.status(500).json({ error: true, data: { message: err.message } });
                    });
            })
            .catch(function (err) {
                res.status(500).json({ error: true, data: { message: err.message } });
            });

    } else {
        res.redirect('/signin');
    }

});

/* Get delete image */
// example : http://localhost:3000/setImageMain
router.get('/setImageMain', function (req, res, next) {

    if (req.isAuthenticated()) {

        var productId = req.query.productId;
        var imageId = req.query.imageId;

        // select * from productimages where productImageProductId = 4 and productImageMain = 1
        new Model.ProductImage({ productImageProductId: productId, productImageMain: 1 })
            .fetch()
            .then(function (model) {
                var img = model.toJSON();
                new Model.ProductImage({ productImageId: img.productImageId })
                    .save({ productImageMain: 0 }, { patch: true })
                    .then(function (model) {
                        new Model.ProductImage({ productImageId: imageId })
                            .save({ productImageMain: 1 }, { patch: true })
                            .then(function (model) {
                                res.json({ error: false, data: { message: 'Image successfully set to main' } });
                            })
                            .catch(function (err) {
                                res.status(500).json({ error: true, data: { message: err.message } });
                            });
                    })
                    .catch(function (err) {
                        res.status(500).json({ error: true, data: { message: err.message } });
                    });
            });
    } else {
        res.redirect('/signin');
    }

});

/* GET FORM product gallery */
// example : http://localhost:3000/product-gallery/2
router.get('/product-gallery/:id', function (req, res, next) {

    if (req.isAuthenticated()) {

        var user = req.user;

        if (user !== undefined) {
            user = user.toJSON();
        }

        res.render('product/gallery', { user: user, id: req.params.id });

    } else {
        res.redirect('/signin');
    }
});  // 4


/* POST form new product image */
// example : http://localhost:3000/product-gallery
router.post('/product-gallery', upload.any(), function (req, res, next) {

    if (req.isAuthenticated()) {

        var user = req.user;

        if (user !== undefined) {
            user = user.toJSON();
        }

        var reqbody = JSON.parse(JSON.stringify(req.body));

        var filename = req.files[0] ? req.files[0].filename : '';

        var saveProductImageMain = new Model.ProductImage({ productImageMain: 0, productImageUrl: filename, productImageProductId: reqbody.hiddenproduct });

        saveProductImageMain.save().then(function (productImage) {

            res.redirect('/product-gallery/' + reqbody.hiddenproduct);

        });
    }
    else {
        res.redirect('/signin');
    }
}); // 4


/* GET JSON product gallery */
// example : http://localhost:3000/api-product-gallery/3
router.get('/api-product-gallery/:id', function (req, res, next) {

    if (req.isAuthenticated()) {

        new Model.ProductImage()
            .where('productImageProductId', req.params.id)
            .fetchAll({
                withRelated: ['product']
            })
            .then(function (images) {

                var params = {
                    data: images
                };

                res.end(JSON.stringify(params))
            })
            .catch(function (err) {
                res.status(500).json({ error: true, data: { message: err.message } });
            });

    } else {
        res.redirect('/signin');
    }
});  // 4


module.exports = router;
