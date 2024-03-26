const express = require('express');
const router = express.Router();
const courseController = require('../controller/coursescontroller');
const productController=require('../controller/productscontroller');
const { searchPurchasesByItemId } = require('../controller/purchasecontroller');
const { handlePurchase } = require('../controller/newpuurchasecontroller');

const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // the folder where files will be saved
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// Setup to handle multiple fields
const fileFields = upload.fields([
  { name: 'image', maxCount: 1 },
  { name: 'zipFile', maxCount: 1 }
]);



// router.post('/courses', upload.single('image'), courseController.addCourse);

router.post('/courses', fileFields, courseController.addCourse);
router.delete('/course/:courseId', courseController.deleteCourseById);
router.post('/courseOne',courseController.getCoursesByEmail);
router.post('/products', fileFields, productController.addProduct);
router.delete('/products/:productId', productController. deleteProductById);
router.post('/productOne',productController.getProductsByEmail);
router.get('/getAllprod',productController.getAllProducts);

router.post('/purchases', handlePurchase);


router.get('*', function(req, res){
    res.status(404).send('404 error: page not found');
  });

module.exports = router