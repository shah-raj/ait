const multer = require('multer');
const path = require('path');
var express = require('express');
var router = express.Router();
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'files')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
  })
var upload = multer({ storage: storage })

router.get('/age',function(req,res){
    res.render('age',{title:'Age Validity Checker', validity:""})
})

router.post('/agemessage',function(req,res){
    if(req.body.age>18){

        var info = {
            'userName': req.body.fullname,
            'age': req.body.age,
            'message':'Valid age'
        }
        res.cookie('username',  req.body.fullname, { maxAge: 100000, httpOnly: true });
        res.render('message',{title:'Age Validity Checker', validity:info})
    }
    else{
        var info = {
            'userName': req.body.fullname,
            'age': req.body.age,
            'message':'Invalid age'
        }
        res.render('message',{title:'Age Validity Checker', validity:info})
    }
})

router.get('/setck', function(req, res){
    res.cookie('username', 'Generic User', { maxAge: 100000, httpOnly: true });
    return res.render('message',{title:"Cookie Setter",message:"Cookie has been Set"});
});

router.get('/getck', function(req, res) {
    var username = req.cookies['username'];
    if (username) {
        return res.render('message',{title:"Cookie Getter",message:username});        
    }
    return res.render('message',{title:"Cookie Getter",message:"Cookie not found"});
});


router.get('/delck', function(req, res){
    cookie = req.cookies;
    for (var prop in cookie) {
        if (!cookie.hasOwnProperty(prop)) {
            continue;
        }    
        res.cookie(prop, '', {expires: new Date(0)});
    }
    return res.render('message',{title:"Cookie Getter",message:"All cookies were deleted successfully"});
});

router.get('/upload',function(req,res){
    res.render('multer');
  
  });


router.post('/single', upload.single('doc'), (req, res, next) => {
    const file = req.file
    if (!file) {
      const error = new Error('Please upload a file')
      error.httpStatusCode = 400
      return next(error)
    }
    res.render('message',{title:"File Upload",message:"Successfully Uploaded: ",singleFile:file})
   
  })

  router.post('/multiple', upload.array('docs', 12), (req, res, next) => {
    const files = req.files
    if (!files) {
      const error = new Error('Please choose files')
      error.httpStatusCode = 400
      return next(error)
    }
        res.render('message',{title:"File Upload",message:"Successfully Uploaded: ",multipleFiles:files})

  })

module.exports = router;