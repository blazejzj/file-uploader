const prisma = require("./prisma");

async function getUserById(userId) {
    const user = prisma.user.findUnique({
        where: {
            id: userId,
        },
    });
    return user;
}

async function getUserByUsername(username) {
    const user = prisma.user.findUnique({
        where: {
            username,
        },
    });
    return user;
}

async function usernameExists(username) {
    const user = await prisma.user.findUnique({
        where: {
            username,
        },
    });
    return !!user;
}

async function addNewUser(name, username, password) {
    await prisma.user.create({
        data: {
            name,
            username,
            password,
        },
    });
}

async function createNewFolder(folderName, userId) {
    await prisma.folder.create({
        data: {
            name: folderName,
            userId: userId,
        },
    });
}

async function getAllUserFolders(userId) {
    return await prisma.folder.findMany({
        where: {
            userId: userId,
        },
    });
}

async function userOwnsFolder(userId, folderId) {
    const folder = await prisma.folder.findUnique({
        where: {
            id: folderId,
        },
    });

    if (!folder) {
        return false;
    }

    return folder.userId === userId;
}

async function deleteFolder(folderId) {
    return await prisma.folder.delete({
        where: {
            id: folderId,
        },
    });
}

module.exports = {
    getUserById,
    getUserByUsername,
    usernameExists,
    addNewUser,
    createNewFolder,
    getAllUserFolders,
    userOwnsFolder,
    deleteFolder,
};
