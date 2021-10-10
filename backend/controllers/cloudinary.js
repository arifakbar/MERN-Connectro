const cloudinary = require("cloudinary");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

exports.uploadImage = async (req, res, next) => {
  try {
    let result = await cloudinary.v2.uploader.upload(req.body.image, {
      public_id: `${Date.now()}`,
      resource_type: "auto",
    });
    res.status(210).json({
      data: { public_id: result.public_id, url: result.secure_url },
      message: "Image uploaded succcessfully.",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: "Some error occured" });
  }
};

exports.deleteImage = async (req, res, next) => {
  try {
    let image_id = req.body.public_id;
    await cloudinary.v2.uploader.destroy(image_id);
    res.status(200).json({
      ok: true,
      message: "Image deleted successfully.",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: "Some error occured." });
  }
};
