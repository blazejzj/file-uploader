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

async function getFolderById(id) {
    return await prisma.folder.findUnique({
        where: {
            id,
        },
    });
}

async function isUserFolderOwner(userId, folderId) {
    const folder = await getFolderById(folderId);
    if (!folder || folder.userId !== userId) {
        return false;
    }
    return true;
}

async function updateFolderName(folderId, newName) {
    return await prisma.folder.update({
        where: {
            id: folderId,
        },
        data: {
            name: newName,
        },
    });
}

async function updateUserName(userId, newName) {
    return prisma.user.update({
        where: { id: userId },
        data: { name: newName },
    });
}

async function updateUserPassword(userId, newHashedPassword) {
    return prisma.user.update({
        where: { id: userId },
        data: { password: newHashedPassword },
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
    getFolderById,
    isUserFolderOwner,
    updateFolderName,
    updateUserName,
    updateUserPassword,
};
