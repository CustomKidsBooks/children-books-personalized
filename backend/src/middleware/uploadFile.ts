import multer from "multer";

export var storage = multer.diskStorage({
  destination: "images/page/",
  filename: function (req, file, cb) {
    const pageId = parseInt(req.params.pageId);
    cb(null, `${pageId}_${Date.now()}.jpg`);
  },
});

export var upload = multer({ storage: storage });
