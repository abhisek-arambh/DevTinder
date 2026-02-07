const adminAuth =(req , res , next) => {
    console.log("admin authorisation is getting checked");
    const token = "xyz";
    const isAdminAuthorised = token === "xyz";
    if(!isAdminAuthorised){
        res.status(401).send("Admin is not athorised");
    }else{
        next();
    }
}
const userAuth =(req , res , next) => {
    console.log("admin authorisation is getting checked");
    const token = "xyz";
    const isAdminAuthorised = token === "xyz";
    if(!isAdminAuthorised){
        res.status(401).send("Admin is not athorised");
    }else{
        next();
    }
}

module.exports = {
    adminAuth,
    userAuth,
}