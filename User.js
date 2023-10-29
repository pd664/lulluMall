let users = new Set()

const addUser = (id) => {
    // const existingUser = users.find((user) => {
    //      user.id === id
    // });
    // if (existingUser) {
    //     return { error: "already taken" };
    // }
    const user = { id:id };
 
    users.add(user);
    return { user };

}

const removeUser = (id) => {
    // const index = users.findIndex((user) => {
    //     user.id === id
    // });
 
    // if (index !== -1) {
    //     return users.splice(index, 1);
    // }
    users.forEach((user) => {
        if(user.id == id) {
            users.delete(user)
        }
    })
}

module.exports = {
    addUser, removeUser, users
}