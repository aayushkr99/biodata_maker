const router = require('express').Router();
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const {getAlltemplate,  createTemplate, downloadImageBiodata, downloadBiodata} = require("../controller/controller")

router.post('/biodata/create/template', createTemplate)
router.get('/biodata/sample', getAlltemplate)
router.post('/biodata/image',upload.single("profilePicture"), downloadImageBiodata)
router.post('/biodata', downloadBiodata )




module.exports = router