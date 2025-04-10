const prisma = require("./prisma");

async function getUserById(userId) {
    const user = prisma.user.findUnique({
        where: {
            id: userId,
        },
    });
    return user;
}

async function usernameExists(username) {
    const user = prisma.user.findUnique({
        where: {
            username,
        },
    });
    return !!user;
}

module.exports = {
    getUserById,
    usernameExists,
};
