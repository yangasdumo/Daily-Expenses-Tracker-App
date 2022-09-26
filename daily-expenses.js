module.exports = function Tracker(db){

    async function addName(name) {
        var staff = await db.oneOrNone("INSERT into myWaiters (name) values($1)",[name]);
        console.log(staff)
        return staff;
    }

   async function selectDays(){
        let getWaiter = await db.any("SELECT")
   }


   async function clear() {
    await db.none('delete from workingDays')

  }

    return{
        addName,
        selectDays,
        clear
    }
}