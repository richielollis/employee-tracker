const db = require("../db/connection");

async function getAllDepartments() {
  const sql = `SELECT * FROM department`;

  await db
    .promise()
    .query(sql)
    .then(([rows]) => {
      console.table(rows);
    })
    .catch(console.log);
}

module.exports = { getAllDepartments };
