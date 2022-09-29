module.exports = function Tracker(db){

    async function addName(name) {
        var staff = await db.oneOrNone("INSERT into users (name) values($1)",[name]);
        return staff;
    }

   
    return{
        addName,

    }
}