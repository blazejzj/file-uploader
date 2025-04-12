const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");
const db = require("../prisma/queries");

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "fileuploader",
        allowed_formats: ["jpg", "png", "pdf", "txt"],
        resource_type: "auto",
    },
});

const upload = multer({ storage: storage });

exports.fileCreateGet = async (req, res) => {
    const folderId = Number(req.params.folderId);
    if (!(await db.userOwnsFolder(req.user.id, folderId))) {
        return res.status(401).redirect("/dashboard");
    }
    res.render("fileCreate", { folderId });
};

exports.fileCreatePost = [
    upload.single("file"),
    async (req, res) => {
        try {
            const folderId = Number(req.params.folderId);
            if (!(await db.userOwnsFolder(req.user.id, folderId))) {
                return res.status(401).redirect("/dashboard");
            }
            if (!req.file) {
                console.error("no file found in req.file");
                return res.status(400).send("no file uploaded");
            }

            console.log("REQ.FILE:", JSON.stringify(req.file, null, 2));
            console.log("REQ.FILE.PATH:", req.file.path);
            console.log("TYPEOF REQ.FILE.PATH:", typeof req.file.path);

            const fileUrl = req.file.path;

            if (typeof fileUrl !== "string") {
                console.error("fileurl isnt a string", fileUrl);
                return res.status(500).send("File url not correct?");
            }

            await db.createNewFile({
                name: req.file.originalname,
                size: req.file.size,
                mimetype: req.file.mimetype,
                path: fileUrl,
                folderId: folderId,
                userId: req.user.id,
            });

            return res.redirect(`/dashboard/folder/${folderId}`);
        } catch (error) {
            console.error("Soemthing went wrong:", error);
            return res.status(500).send("Server error");
        }
    },
];

exports.fileShow = async (req, res) => {
    const fileId = Number(req.params.fileId);
    const file = await db.getFileById(fileId);

    if (!file || file.userId !== req.user.id) {
        return res.status(401).redirect("/dashboard");
    }

    res.render("file", { file });
};

exports.fileDelete = async (req, res) => {
    const fileId = Number(req.params.fileId);
    const file = await db.getFileById(fileId);

    if (!file || file.userId !== req.user.id) {
        return res.status(401).redirect("/dashboard");
    }

    await db.deleteFile(fileId);

    res.redirect(`/dashboard/folder/${file.folderId}`);
};
