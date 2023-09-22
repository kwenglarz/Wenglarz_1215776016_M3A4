const sql = require('mssql');
const dbConnection = require('./db.config');
console.log(dbConnection);

async function getSalesCustomers(){
    console.log(' Connecting to SQL....... Cloud Server');
    let dbContext = await sql.connect(dbConnection);
    
    console.log('The Databse connection was Successful');
    console.log('Getting data');
    let results = await dbContext.request()
        .query(
            `SELECT TOP(20)
            CustomerID,
            NameStyle,
            Title,
            FirstName,
            LastName,
            Suffix,
            CompanyName,
            SalesPerson,
            EmailAddress,
            Phone
            FROM
            SalesLT.Customer`);
    console.log(`Returned SQL results`);
            
    return results;
}

//Export
module.exports = {getSalesCustomers: getSalesCustomers};
