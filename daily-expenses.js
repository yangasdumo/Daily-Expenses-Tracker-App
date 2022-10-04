module.exports = function Tracker(db) {

    async function checknames(email) {
        var user = await db.any("select email from users where email =$1", [email]);
        return user.length == 0 ? true : false;

    }

    async function adduser(names, surnames, emails) {
        const getname = names.toUpperCase()
        const getsurname = surnames.toUpperCase()
        const getemail = emails.toUpperCase()

        let getnameRegex = /^[a-zA-Z]{3,}$/
        let getemailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/

        const name = getnameRegex.test(getname);
        const surname = getnameRegex.test(getsurname);
        const email = getemailRegex.test(getemail);
        if (name && surname && email) {

            let repeat = await checknames(getemail)

            if (repeat) {
                await db.none("INSERT into users (first_name,last_name,email) values($1,$2,$3)", [getname, getsurname, getemail]);
                return "users"

            } else {
                return "repeat"
            }
        }
    }

    async function insertExpense(catagory,amount,expense_date) {
        await db.oneOrNone('insert into expenses(catagories_id,amount,dates) values($1,$2,$3)', [catagory,amount,expense_date])
    }


    async function getData(){
         let getexpense =  await db.manyOrNone('select * from expenses')
         return getexpense
    }

     
    async function removeData() {
        await db.none("DELETE FROM expenses ")
    }

       
    return {
        adduser,
        checknames,
        insertExpense,
        removeData,
        getData
    }
}