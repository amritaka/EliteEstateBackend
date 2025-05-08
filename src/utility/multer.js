import multer from 'multer';

// Set storage engine to memory storage
const storage = multer.diskStorage({
  filename:function(req,file,cb) {
    cb(null,file.originalname)
  }
})

const upload = multer({storage:storage})

export default upload;
