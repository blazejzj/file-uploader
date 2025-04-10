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

module.exports = {
    getUserById,
    getUserByUsername,
    usernameExists,
    addNewUser,
};
