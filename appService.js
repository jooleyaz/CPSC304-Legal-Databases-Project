const oracledb = require('oracledb');
const loadEnvFile = require('./utils/envUtil');

const envVariables = loadEnvFile('./.env');

// Database configuration setup. Ensure your .env file has the required database credentials.
const dbConfig = {
    user: envVariables.ORACLE_USER,
    password: envVariables.ORACLE_PASS,
    connectString: `${envVariables.ORACLE_HOST}:${envVariables.ORACLE_PORT}/${envVariables.ORACLE_DBNAME}`
};

const keywordList =
    ["TABLE",
    "DROP",
    "INSERT",
    "WHERE",
    "UPDATE",
    "SET",
    "SELECT",
    "FROM",
    "--"];

const tableList = [
    "CASEHEARINGS",
    "CASEJURY",
    "CLOSEDCASE",
    "DEFEND",
    "DEFENDANT",
    "EVIDENCEBELONGINGTO",
    "JUDGE",
    "JUDGEDCASES",
    "LAWYERCOMPANYADDRESS",
    "LAWYERCOMPANYPHONE",
    "LAWYERS",
    "PROSECUTOR",
    "REPRESENT",
    "TESTIFYFOR",
    "WITNESS",
    "WORKON",
    "user_tables"
];

function checkContains(str, array) {
    return array.some(s => str.includes(s));
}

function checkArrayContains(toCheck, array) {
    for (const s of toCheck) {
        if (checkContains(s, array)) {
            return true
        }
    }
    return false;
}
function checkArray (array){
    if (checkArrayContains(array, keywordList)){
        console.log("Forbidden words in request")
        throw new Error("Forbidden words in request");
    }
}

function checkString (str){
    if (checkContains(str, keywordList)){
        console.log("Forbidden words in request")
        throw new Error("Forbidden words in request");
    }

}

function checkIfOneOf(str, array) {
    return array.includes(str);
}
// ----------------------------------------------------------
// Wrapper to manage OracleDB actions, simplifying connection handling.
async function withOracleDB(action) {
    let connection;
    try {
        connection = await oracledb.getConnection(dbConfig);
        return await action(connection);
    } catch (err) {
        console.error(err);
        throw err;
    } finally {
        if (connection) {
            try {
                await connection.close();
            } catch (err) {
                console.error(err);
            }
        }
    }
}


// ----------------------------------------------------------
// Core functions for database operations
// Modify these functions, especially the SQL queries, based on your project's requirements and design.
async function testOracleConnection() {
    return await withOracleDB(async (connection) => {
        return true;
    }).catch(() => {
        return false;
    });
}

async function fetchDemotableFromDb() {
    return await withOracleDB(async (connection) => {
        const result = await connection.execute('SELECT * FROM DEMOTABLE');
        return result.rows;
    }).catch(() => {
        return [];
    });
}

///////////////////////

async function fetchTableFromDb(targetTable) {
    return await withOracleDB(async (connection) => {
        const result = await connection.execute('SELECT * FROM ' + targetTable);
        return result.rows;
    }).catch(() => {
        return [];
    });
}

/////////////////////


async function initiateDemotable() {
    console.log(dbConfig);
    return await withOracleDB(async (connection) => {
        try {
            await connection.execute(`DROP TABLE DEMOTABLE`);
        } catch(err) {
            console.log('Table might not exist, proceeding to create...');
        }

        const result = await connection.execute(`
            CREATE TABLE DEMOTABLE (
                id NUMBER PRIMARY KEY,
                name VARCHAR2(20)
            )
        `);
        return true;
    }).catch(() => {
        return false;
    });
}

async function insertDemotable(id, name) {
    return await withOracleDB(async (connection) => {
        const result = await connection.execute(
            `INSERT INTO DEMOTABLE (id, name) VALUES (:id, :name)`,
            [id, name],
            { autoCommit: true }
        );

        return result.rowsAffected && result.rowsAffected > 0;
    }).catch(() => {
        return false;
    });
}

async function updateNameDemotable(oldName, newName) {
    return await withOracleDB(async (connection) => {
        const result = await connection.execute(
            `UPDATE DEMOTABLE SET name=:newName where name=:oldName`,
            [newName, oldName],
            { autoCommit: true }
        );

        return result.rowsAffected && result.rowsAffected > 0;
    }).catch(() => {
        return false;
    });
}

async function countDemotable() {
    return await withOracleDB(async (connection) => {
        const result = await connection.execute('SELECT Count(*) FROM DEMOTABLE');
        return result.rows[0][0];
    }).catch(() => {
        return -1;
    });
}

async function test() {


    //preset input for testing purposes
    targetTable = "CASEJURY"

    const inlist = ['NUMPEOPLE', 'CASENUM'];
    //

    return await withOracleDB(async (connection) => {

        const query = 'SELECT :bv FROM ' + targetTable;



        const binds = { bv: { type: "SYS.ODCIVARCHAR2LIST", val: inlist }};

        const results = await connection.execute(query,binds);

        console.log(results.rows);

        return {status: true, body:"success"};
    }).catch((e) => {
        return {status: false, body:e.toString()};
    });
}

async function projectTable(targetTable, attributeList) {

    return await withOracleDB(async (connection) => {
        console.log(targetTable);

        checkArray(attributeList);

        let query = 'SELECT ';

        for (const val of attributeList) {
            query = query + val +',';
        }

        query = query.slice(0,-1);

        query = query  + ' FROM ' + targetTable;

        // passing in select with binds is causing a server crash with no error message

        console.log("Executing Select: " + query +"\n");

        const results = await connection.execute(query);

        console.log(results);
        console.log(results.rows);

        return {status: true, body: JSON.stringify(results.rows)};
    }).catch((e) => {
        return {status: false, body: e.toString()};
    });
}


async function insertIntoTable(targetTable,
                               attributeList) {

    //preset input for testing purposes
    // targetTable = "DEFENDANT"
    //
    // attributeList = ["555555555", '\'TEST\''];
    //

    return await withOracleDB(async (connection) => {


        if (!checkIfOneOf(targetTable,tableList)) {
            throw new Error("No such table");
        }

        checkArray(attributeList);



        let query = 'INSERT INTO ' + targetTable + ' VALUES (';

        for (const val of attributeList) {
            query = query + val +',';
        }

        query = query.slice(0,-1) + ')';


        console.log("Executing: " + query +"\n");

        const results = await connection.execute(query);

        // don't know why passing in {autoCommit: true} does not work here, so explicit commit it is
        connection.commit();

        console.log(results);

        return {status: true, body: JSON.stringify(results)};
    }).catch((e) => {
        return {status: false, body: e.toString()};
    });
}


async function deleteEntry(targetTable,
                           condition) {

    //preset input for testing purposes
    // targetTable = "DEFENDANT"
    //
    // condition = "NAME = \'TEST\'";
    //

    return await withOracleDB(async (connection) => {

        if (!checkIfOneOf(targetTable,tableList)) {
            throw new Error("No such table");
        }

        checkString(condition);


        let query = 'DELETE FROM ' + targetTable + ' WHERE ' + condition;


        console.log("Executing: " + query +"\n");

        const results = await connection.execute(query);

        // don't know why passing in {autoCommit: true} does not work here, so explicit commit it is
        connection.commit();

        console.log(results);

        return {status: true, body: JSON.stringify(results)};
    }).catch((e) => {
        return {status: false, body: e.toString()};
    });
}

async function updateEntry(targetTable,
                           conditionAttribute,
                           conditionValue,
                           targetAttribute,
                           targetValue) {

    //preset input for testing purposes
    // targetTable = "DEFENDANT";
    //
    // conditionAttribute = "NAME";
    //
    // conditionValue = "=\'Steve Wolfman\'";
    //
    // targetAttribute = "NAME";
    //
    // targetValue = "\'S.W\'";
    //

    return await withOracleDB(async (connection) => {


        if (!checkIfOneOf(targetTable,tableList)) {
            throw new Error("No such table");
        }

        checkString(conditionAttribute);
        checkString(conditionValue);
        checkString(targetAttribute);
        checkString(targetValue);



        let query = 'UPDATE ' + targetTable + ' SET ' + targetAttribute + ' = ' + targetValue +
                ' WHERE ' + conditionAttribute + ' = ' + conditionValue;


        console.log("Executing Update: " + query +"\n");

        const results = await connection.execute(query);

        // don't know why passing in {autoCommit: true} does not work here, so explicit commit it is
        connection.commit();

        console.log(results);

        return {status: true, body: JSON.stringify(results)};
    }).catch((e) => {
        return {status: false, body: e.toString()};
    });
}

async function updateEntryDate(targetTable,
                           conditionAttribute,
                           conditionValue,
                           targetAttribute,
                           targetValue) {

    return await withOracleDB(async (connection) => {


        if (!checkIfOneOf(targetTable,tableList)) {
            throw new Error("No such table");
        }

        checkString(conditionAttribute);
        checkString(conditionValue);
        checkString(targetAttribute);
        checkString(targetValue);



        let query = 'UPDATE ' + targetTable + ' SET ' + targetAttribute + " = '" + targetValue +
        "' WHERE " + conditionAttribute + " = '" + conditionValue + "'";


        console.log("Executing Update: " + query +"\n");

        const results = await connection.execute(query);

        // don't know why passing in {autoCommit: true} does not work here, so explicit commit it is
        connection.commit();

        console.log(results);

        return {status: true, body: JSON.stringify(results)};
    }).catch((e) => {
        return {status: false, body: e.toString()};
    });
}


async function selectFromTable(targetTable,
                               attributeList,
                               condition) {

    // targetTable = "DEFENDANT";
    //
    // attributeList = ['NAME'];
    //
    // condition = "SIN > 112233445 AND SIN < 112234567";



    return await withOracleDB(async (connection) => {

        if (!checkIfOneOf(targetTable,tableList)) {
            throw new Error("No such table");
        }

        checkString(condition);

        checkArray(attributeList);


        let query = 'SELECT ';

        for (const val of attributeList) {
            query = query + val +',';
        }

        query = query.slice(0,-1);

        query = query  + ' FROM ' + targetTable + ' WHERE ' + condition;

        // passing in select with binds is causing a server crash with no error message

        console.log("Executing Select: " + query +"\n");

        const results = await connection.execute(query);

        console.log(results.rows);

        return {status: true, body: JSON.stringify(results.rows)};
    }).catch((e) => {
        return {status: false, body: e.toString()};
    });
}


async function queryWithJoin(targetTables,
                             attributeList,
                             condition) {

    // targetTables = ["DEFENDANT", "DEFEND"];
    //
    // attributeList = ['*'];
    //
    // condition = "DEFENDANT.SIN = DEFEND.SIN";



    return await withOracleDB(async (connection) => {
        checkArray(targetTables);


        for (const targetTable of targetTables) {
            if (!checkIfOneOf(targetTable, tableList)) {
                throw new Error("No such table");
            }
        }


        checkString(condition);

        checkArray(attributeList);




        let query = 'SELECT ';

        for (const val of attributeList) {
            query = query + val +',';
        }

        query = query.slice(0,-1);

        query = query  + ' FROM ';

        for (const val of targetTables) {
            query = query + val +',';
        }

        query = query.slice(0,-1);

        query = query  +' WHERE ' + condition;

        // passing in select with binds is causing a server crash with no error message

        console.log("Executing Query: " + query +"\n");

        const results = await connection.execute(query);

        console.log(results.rows);

        return {status: true, body: JSON.stringify(results.rows)};
    }).catch((e) => {
        return {status: false, body: e.toString()};
    });
}


async function queryWithJoinGroupByHaving(targetTables,
                                          attributeList,
                                          condition,
                                          groupBy,
                                          having) {


    // targetTables = ["CASEJURY"];
    //
    // attributeList = ['MAX(CASENUM)'];
    //
    // condition = "";
    //
    // groupBy = "NUMPEOPLE"
    //
    // having = "NUMPEOPLE > 13"


    return await withOracleDB(async (connection) => {

        for (const targetTable of targetTables) {
            if (!checkIfOneOf(targetTable, tableList)) {
                throw new Error("No such table");
            }
        }

        checkArray(attributeList);

        checkString(groupBy);

        let query = 'SELECT ';

        for (const val of attributeList) {
            query = query + val +',';
        }

        query = query.slice(0,-1);

        query = query  + ' FROM ';

        for (const val of targetTables) {
            query = query + val +',';
        }

        query = query.slice(0,-1);

        if (condition) {
            checkString(condition);
            query = query + ' WHERE ' + condition;
        }

        query = query + " GROUP BY " + groupBy;

        if (having) {
            checkString(having);
            query = query + ' HAVING ' + having;
        }

        // passing in select with binds is causing a server crash with no error message

        console.log("Executing Query: " + query +"\n");

        const results = await connection.execute(query);

        console.log(results.rows);

        return {status: true, body: JSON.stringify(results.rows)};
    }).catch((e) => {
        return {status: false, body: e.toString()};
    });
}


async function queryWithJoinGroupByHavingNested(targetTables,
                                                attributeList,
                                                condition,
                                                groupBy,
                                                havingAttr1,
                                                op,
                                                targetTable2,
                                                attribute2) {


    // targetTables = ["CASEJURY"];
    //
    // attributeList = ['MAX(CASENUM)'];
    //
    // condition = "";
    //
    // groupBy = "NUMPEOPLE";
    //
    // havingAttr1 = "NUMPEOPLE";
    //
    // op = " > "
    //
    // targetTable2 = "CASEJURY";
    //
    // attribute2 = 'MAX(CASENUM)';


    return await withOracleDB(async (connection) => {

        for (const targetTable of targetTables) {
            if (!checkIfOneOf(targetTable, tableList)) {
                throw new Error("No such table");
            }
        }

        checkString(condition);
        checkArray(attributeList);
        checkString(groupBy);
        checkString(havingAttr1);
        checkString(op);
        checkString(targetTable2);
        checkString(attribute2);



        let query = 'SELECT ';

        for (const val of attributeList) {
            query = query + val +',';
        }

        query = query.slice(0,-1);

        query = query  + ' FROM ';

        for (const val of targetTables) {
            query = query + val +',';
        }

        query = query.slice(0,-1);

        if (condition) {
            query = query + ' WHERE ' + condition;
        }
        query = query + " GROUP BY " + groupBy;
        query = query + ' HAVING ' + havingAttr1;
        query = query + op + "(SELECT " + attribute2 + " FROM " +targetTable2 + ")";


        // passing in select with binds is causing a server crash with no error message

        console.log("Executing Query: " + query +"\n");

        const results = await connection.execute(query);

        console.log(results.rows);

        return {status: true, body: JSON.stringify(results.rows)};
    }).catch((e) => {
        return {status: false, body: e.toString()};
    });
}

module.exports = {
    testOracleConnection,
    fetchDemotableFromDb,
    fetchTableFromDb,
    initiateDemotable, 
    insertDemotable,
    updateNameDemotable, 
    countDemotable,
    test,
    projectTable,
    deleteEntry,
    insertIntoTable,
    updateEntry,
    selectFromTable,
    queryWithJoin,
    queryWithJoinGroupByHaving,
    queryWithJoinGroupByHavingNested
};