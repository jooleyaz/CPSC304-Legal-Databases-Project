/*
 * These functions below are for various webpage functionalities. 
 * Each function serves to process data on the frontend:
 *      - Before sending requests to the backend.
 *      - After receiving responses from the backend.
 * 
 * To tailor them to your specific needs,
 * adjust or expand these functions to match both your 
 *   backend endpoints 
 * and 
 *   HTML structure.
 * 
 */


// This function checks the database connection and updates its status on the frontend.

async function checkDbConnection() {
    const statusElem = document.getElementById('dbStatus');
    const loadingGifElem = document.getElementById('loadingGif');

    const response = await fetch('/check-db-connection', {
        method: "GET"
    });

    // Hide the loading GIF once the response is received.
    loadingGifElem.style.display = 'none';
    // Display the statusElem's text in the placeholder.
    statusElem.style.display = 'inline';

    response.text()
    .then((text) => {
        statusElem.textContent = text;
    })
    .catch((error) => {
        statusElem.textContent = 'connection timed out';  // Adjust error handling if required.
    });
}

/*async function displayProjection() {
    const tableElement = document.getElementById('projectionTable');
    const tableBody = tableElement.querySelector('tbody');

    const response = await fetch('/projection', {
        method: 'GET'
    });

    const responseData = await response.json();
    const success = responseData.success;
    const projectionTableContent = responseData.body; // used to be data in examples

    if (tableBody) {
            tableBody.innerHTML = '';
            }

    projectionTableContent.forEach(user => {
            const row = tableBody.insertRow();
            user.forEach((field, index) => {
                const cell = row.insertCell(index);
                cell.textContent = field;
            });
        });
}*/

// Fetches data from the demotable and displays it.
async function fetchAndDisplayUsers() {
    const tableElement = document.getElementById('demotable');
    const tableBody = tableElement.querySelector('tbody');

    const response = await fetch('/demotable', {
        method: 'GET'
    });

    const responseData = await response.json();
    const demotableContent = responseData.data;

    // Always clear old, already fetched data before new fetching process.
    if (tableBody) {
        tableBody.innerHTML = '';
    }

    demotableContent.forEach(user => {
        const row = tableBody.insertRow();
        user.forEach((field, index) => {
            const cell = row.insertCell(index);
            cell.textContent = field;
        });
    });
}

///////////////////////

async function fetchAndDisplayJudgedCases() {
    const tableElement = document.getElementById('judgedCases');
    const tableBody = tableElement.querySelector('tbody');

    const response = await fetch('/judgedcases-table', {
        method: 'GET'
    });

    const responseData = await response.json();
    const tableContent = responseData.data;

    // Always clear old, already fetched data before new fetching process.
    if (tableBody) {
        tableBody.innerHTML = '';
    }

    tableContent.forEach(user => {
        const row = tableBody.insertRow();
        user.forEach((field, index) => {
            const cell = row.insertCell(index);
            cell.textContent = field;
        });
    });
}

async function fetchAndDisplayTable() {
    const tableElement = document.getElementById('judgedCasesTable');
    const tableBody = tableElement.querySelector('tbody');

    const response = await fetch('/judgedcases-table', {
        method: 'GET'
    });

    const responseData = await response.json();
    const tableContent = responseData.data;

    // Always clear old, already fetched data before new fetching process.
    if (tableBody) {
        tableBody.innerHTML = '';
    }

    tableContent.forEach(user => {
        const row = tableBody.insertRow();
        user.forEach((field, index) => {
            const cell = row.insertCell(index);
            cell.textContent = field;
        });
    });
}

async function fetchAndDisplayJudgeTable() {
    const tableElement = document.getElementById('judgeTable');
    const tableBody = tableElement.querySelector('tbody');

    const response = await fetch('/judge-table', {
        method: 'GET'
    });

    const responseData = await response.json();
    const tableContent = responseData.data;

    // Always clear old, already fetched data before new fetching process.
    if (tableBody) {
        tableBody.innerHTML = '';
    }

    tableContent.forEach(user => {
        const row = tableBody.insertRow();
        user.forEach((field, index) => {
            const cell = row.insertCell(index);
            cell.textContent = field;
        });
    });
}

//////////////////////

async function displayClosedCaseTable() {
    const tableElement = document.getElementById('closedCaseTable');
    const tableBody = tableElement.querySelector('tbody');

    const response = await fetch('/closedcase-table', {
        method: 'GET'
    });

    const responseData = await response.json();
    const tableContent = responseData.data;

    // Always clear old, already fetched data before new fetching process.
    if (tableBody) {
        tableBody.innerHTML = '';
    }

    tableContent.forEach(user => {
        const row = tableBody.insertRow();
        user.forEach((field, index) => {
            const cell = row.insertCell(index);
            cell.textContent = field;
        });
    });
}

async function displayEvidenceTable() {
    const tableElement = document.getElementById('evidenceTable');
    const tableBody = tableElement.querySelector('tbody');

    const response = await fetch('/evidence-table', {
        method: 'GET'
    });

    const responseData = await response.json();
    const tableContent = responseData.data;

    // Always clear old, already fetched data before new fetching process.
    if (tableBody) {
        tableBody.innerHTML = '';
    }

    tableContent.forEach(user => {
        const row = tableBody.insertRow();
        user.forEach((field, index) => {
            const cell = row.insertCell(index);
            cell.textContent = field;
        });
    });
}


async function pickAttribute(selectObject) {
    const val = selectObject.value;
    const operation = document.getElementById('selectOperation');
    const value = document.getElementById('selectValue');
    if (selectObject.value==2) {
        changeToInvisible("selectValue");
        changeToVisible("selectOperationVerdict");
    } else {
        changeToInvisible("selectOperationVerdict");
        changeToVisible("selectValue");
    }
}

async function changeToInvisible(div) {
    let myDiv = document.getElementById(div);
    myDiv.style.display = "none";
}
async function changeToVisible(div) {
    let myDiv = document.getElementById(div);
    myDiv.style.display = "block";
}

async function filter(value) {
    const userValue = value;
    let verdict;
    if (userValue==1) {
        verdict = 'guilty';
    } else {
        verdict = 'innocent';
    }
    const tableElement = document.getElementById('closedCaseFiltered');
    const tableBody = tableElement.querySelector('tbody');

    const response = await fetch('/selectFromTable', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            targetTable: "CLOSEDCASE",
            attributeList: ['CASENUM', 'VERDICT', 'END_DATE'],
            condition: "VERDICT = \'" + String(verdict) + "\'"
        })
    })

    const responseData = await response.json();
    const tableContent = responseData.body;

    if (tableBody) {
        tableBody.innerHTML = '';
    }

    content = JSON.parse(tableContent);
    // console.log(content);
    content.forEach(user => {
        const row = tableBody.insertRow();
        user.forEach((field, index) => {
            const cell = row.insertCell(index);
            cell.textContent = field;
        });
    });
}

async function filterValue(attribute, operation, value) {
    let operationSymbol;
    if (operation==1) {
        let operationSymbol = '=';
    } else if (operation==2) {
        let operationSymbol = '>';
    } else {
        let operationSymbol = '<';
    }

    let attributeValue;
    if (attribute==1) {
        let attributeValue = 'CASENUM';
    } else {
        let attributeValue = 'END_DATE';
    }

    let userValue = value;

    const tableElement = document.getElementById('closedCaseFiltered');
    const tableBody = tableElement.querySelector('tbody');

    const response = await fetch('/selectFromTable', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            targetTable: "CLOSEDCASE",
            attributeList: ['CASENUM', 'VERDICT', 'END_DATE'],
            condition: "casenum = 4"
        })
    })

    const responseData = await response.json();
    const tableContent = responseData.body;
    console.log(responseData.body);

    if (tableBody) {
        tableBody.innerHTML = '';
    }

    content = JSON.parse(tableContent);
    // console.log(content);
    content.forEach(user => {
        const row = tableBody.insertRow();
        user.forEach((field, index) => {
            const cell = row.insertCell(index);
            cell.textContent = field;
        });
    });
}

////////////////////
async function nest() {
    const nestedResult = document.getElementById("nestedResult");
    const nestedHearingsTable = document.getElementById("nestedHearingsTable");

    const response = await fetch("/queryWithJoinGroupByHavingNested", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            targetTables: ["CASEHEARINGS"],
            attributeList: ['CASENUM', 'MIN(HEARING_DATE)'],
            condition: "",
            groupBy: "CASENUM",
            havingAttr1: "MIN(HEARING_DATE)",
            op: "<",
            targetTable2: "CASEHEARINGS",
            attribute2: "MAX(HEARING_DATE)"
        })
    });

    const responseData = await response.json();
    const tableContent = responseData.body;
    const tableBody = nestedHearingsTable.querySelector('tbody');

    if (responseData.success) {
        nestedResult.textContent = 'Successfully processed data!';
        if (tableBody) {
            tableBody.innerHTML = '';
        }
        content = JSON.parse(tableContent);
        console.log(content);
        content.forEach(user => {
            const row = tableBody.insertRow();
            user.forEach((field, index) => {
                const cell = row.insertCell(index);
                cell.textContent = field;
            });
        });
    } else {
        nestedResult.textContent = 'Unsuccessful!';
    }
}
///////////////////////

async function divide() {
    const response = await fetch("/selectFromTable", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            targetTable: "JUDGE",
            attributeList: ['LICENSENUM'],
            condition: "not exists (select licensenum from judgedcases where judgedcases.licensenum<>judge.licensenum)"
        })
    });

    const divisionResult = document.getElementById("divisionResult");
    const judgeDivisionTable = document.getElementById("judgeDivisionTable");
    const responseData = await response.json();
    const tableContent = responseData.body;
    const tableBody = judgeDivisionTable.querySelector('tbody');

    if (responseData.success) {
        divisionResult.textContent = 'Successfully processed data!';
        if (tableBody) {
            tableBody.innerHTML = '';
        }
        content = JSON.parse(tableContent);
        console.log(content);
        content.forEach(user => {
            const row = tableBody.insertRow();
            user.forEach((field, index) => {
                const cell = row.insertCell(index);
                cell.textContent = field;
            });
        });
    } else {
        divisionResult.textContent = 'Unsuccessful!';
    }
}


///////////////////////

async function count() {
    const response = await fetch("/queryWithJoinGroupByHaving", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            targetTables: ["CASEHEARINGS"],
            attributeList: ['CASENUM', 'COUNT(*)'],
            condition: "",
            groupBy: "CASENUM",
            having: ""
        })
    });

    const responseData = await response.json();
    const tableContent = responseData.body;
    const messageElement = document.getElementById('resultMsg');
    const hearingsPerCaseTable = document.getElementById("hearingsPerCaseTable");
    const tableBody = hearingsPerCaseTable.querySelector('tbody');

    if (responseData.success) {
        messageElement.textContent = 'Successfully counted!';
        if (tableBody) {
            tableBody.innerHTML = '';
        }
        content = JSON.parse(tableContent);
        console.log(content);
        content.forEach(user => {
            const row = tableBody.insertRow();
            user.forEach((field, index) => {
                const cell = row.insertCell(index);
                cell.textContent = field;
            });
        });
    } else {
        messageElement.textContent = 'Count unsuccessful!';
    }
}

/////////////

///////////////////////

async function groupByHaving() {
    const juryCount = document.getElementById("insertId").value;
    const response = await fetch("/queryWithJoinGroupByHaving", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            targetTables: ["CASEJURY"],
            attributeList: ['NUMPEOPLE', 'COUNT(*)'],
            condition: "",
            groupBy: "NUMPEOPLE",
            having: "NUMPEOPLE > " + String(juryCount)
        })
    });

    const responseData = await response.json();
    const tableContent = responseData.body;
    const messageElement = document.getElementById('groupByHavingResult');
    const juriesWithMoreThanTable = document.getElementById("juriesWithMoreThanTable");
    const tableBody = juriesWithMoreThanTable.querySelector('tbody');

    if (responseData.success) {
        messageElement.textContent = 'Successfully processed data!';
        if (tableBody) {
            tableBody.innerHTML = '';
        }
        content = JSON.parse(tableContent);
        console.log(content);
        content.forEach(user => {
            const row = tableBody.insertRow();
            user.forEach((field, index) => {
                const cell = row.insertCell(index);
                cell.textContent = field;
            });
        });
    } else {
        messageElement.textContent = 'Unsuccessful!';
    }
}

///////////////////////

async function select(event) {
    console.log("start");
    const caseNum = document.getElementById("caseNum").value;
    const verdict = document.getElementById("verdict").value;
    //const date = document.getElementById("date").value;
    const andCaseNum = document.getElementById("andCaseNum");
    const orCaseNum = document.getElementById("orCaseNum");
    const andVerdict = document.getElementById("andVerdict");
    const orVerdict = document.getElementById("orVerdict");
    //const andDate = document.getElementById("andDate");
    //const orDate = document.getElementById("orDate");

    let myCondition = "";

    if (andCaseNum.checked) {
        myCondition = myCondition + " and casenum = " + caseNum;
    }
    if (orCaseNum.checked) {
        myCondition = myCondition + " or casenum = " + caseNum;
    }
    if (andVerdict.checked) {
        myCondition = myCondition + " and verdict = \'" + verdict + "\'";
    }
    if (orVerdict.checked) {
        myCondition = myCondition + " or verdict = \'" + verdict + "\'";
    }
//    if (andDate.checked) {
//        myCondition = myCondition + " and end_date = \'" + date + "\'";
//    }
//    if (orDate.checked) {
//        myCondition = myCondition + " or end_date = " + date;
//    }

    if (myCondition.startsWith(" and")) {
        myCondition = myCondition.slice(4);
    }
    if (myCondition.startsWith(" or")) {
        myCondition = myCondition.slice(3);
    }

    console.log(myCondition);
    // targetTable = "DEFENDANT";
    //
    // attributeList = ['NAME'];
    //
    // condition = "SIN > 112233445 AND SIN < 112234567";
    const response = await fetch("/selectFromTable", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            targetTable: "CLOSEDCASE",
            attributeList: ['CASENUM', 'VERDICT', 'END_DATE'],
            condition: myCondition
        })
    });

    const responseData = await response.json();
    const tableContent = responseData.body;
    console.log(tableContent);
    const messageElement = document.getElementById('filterMsg');
    const closedCaseFiltered = document.getElementById("closedCaseFiltered");
    const tableBody = closedCaseFiltered.querySelector('tbody');

    if (responseData.success) {
        messageElement.textContent = 'Successfully filtered data!';
        if (tableBody) {
            tableBody.innerHTML = '';
        }
        content = JSON.parse(tableContent);
        console.log(content);
        content.forEach(user => {
            const row = tableBody.insertRow();
            user.forEach((field, index) => {
                const cell = row.insertCell(index);
                cell.textContent = field;
            });
        });
    } else {
        messageElement.textContent = 'Unsuccessful filtering!';
    }
}

///////////////////////


// This function resets or initializes the demotable.
async function resetDemotable() {
    const response = await fetch("/initiate-demotable", {
        method: 'POST'
    });
    const responseData = await response.json();

    if (responseData.success) {
        const messageElement = document.getElementById('resetResultMsg');
        messageElement.textContent = "demotable initiated successfully!";
        fetchTableData();
    } else {
        alert("Error initiating table!");
    }
}

async function project(event) {
    event.preventDefault();

    const tableElement = document.getElementById('finalProjectionTable');
    const tableBody = tableElement.querySelector('tbody');
    const attributeNameValue = document.getElementById('attributeNameProject').value;
    const tableNameValue = document.getElementById('tableNameFinalProject').value;
    const strANList = String(attributeNameValue);
    const attributeList = strANList.split(',');

    const response = await fetch('/projection', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            targetTable: String(tableNameValue),
            attributeList: attributeList
        })
    })

    const responseData = await response.json();
    const tableContent = responseData.body;
    const messageElement = document.getElementById('inputANResultMsg');

    if (responseData.success) {
        messageElement.textContent = "Attributes projected successfully!";
        const tableHead = tableElement.querySelector('tr');

            if (tableHead) {
                        tableHead.innerHTML = '';
                }
            for (var x = 0; x < attributeList.length; x++) {
                const headerCell = tableHead.insertCell(x);
                headerCell.innerHTML = attributeList[x];
            }

            // Always clear old, already fetched data before new fetching process.
            if (tableBody) {
                tableBody.innerHTML = '';
            }

            content = JSON.parse(tableContent);
                console.log(content);
                content.forEach(user => {
                    const row = tableBody.insertRow();
                    user.forEach((field, index) => {
                        const cell = row.insertCell(index);
                        cell.textContent = field;
                    });
                });
    } else {
        messageElement.textContent = "Error projecting attributes! Please follow the input format listed above!";
    }


}

async function displayTableNames(event) {
    event.preventDefault();

    const tableElement = document.getElementById('tableNameTable');
    const tableBody = tableElement.querySelector('tbody');

    const response = await fetch('/projection', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            targetTable: "user_tables",
            attributeList: ["table_name"]
        })
    })

    const responseData = await response.json();
    const tableContent = responseData.body;
    console.log(responseData);
    console.log(responseData.body);
    console.log(tableContent);

    // Always clear old, already fetched data before new fetching process.
    if (tableBody) {
        tableBody.innerHTML = '';
    }

    content = JSON.parse(tableContent);
    var removeIndex = -1;

    for (var i = 0; i < content.length; i++) {
        if (content[i].includes("DEMOTABLE")) {
            removeIndex = i;
        }
    }
    if (removeIndex > -1) {
        content.splice(removeIndex, 1);
    }
    content.forEach(user => {
        const row = tableBody.insertRow();
        user.forEach((field, index) => {
            const cell = row.insertCell(index);
            cell.textContent = field;
        });
    });
}

async function displayAttributeNames(event) {
    event.preventDefault();

    const tableElement = document.getElementById('attributeProjectionTable');
    const tableBody = tableElement.querySelector('tbody');
    const tableNameValue = document.getElementById('tableNameProject').value;

    const response = await fetch('/projection', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            targetTable: "ALL_TAB_COLUMNS WHERE TABLE_NAME = '" + tableNameValue + "'",
            attributeList: ["COLUMN_NAME"]
        })
    })

    const responseData = await response.json();
    const tableContent = responseData.body;
    console.log(responseData);
    console.log(responseData.body);
    console.log(tableContent);

    const messageElement = document.getElementById('inputTNResultMsg');

    if (responseData.success) {
       messageElement.textContent = "Table attributes are displayed below!";

       // Always clear old, already fetched data before new fetching process.
       if (tableBody) {
           tableBody.innerHTML = '';
       }

       content = JSON.parse(tableContent);
       content.forEach(user => {
           const row = tableBody.insertRow();
           user.forEach((field, index) => {
                const cell = row.insertCell(index);
                cell.textContent = field;
           });
       });
    } else {
       messageElement.textContent = "Please select a table name listed above in the right case!";
    }
}

async function insertJCtable(event) {
    event.preventDefault();

    const idValue = document.getElementById('insertId').value;
    const titleValue = document.getElementById('insertTitle').value;
    const dateValue = document.getElementById('insertDate').value;
    const licenseNumValue = document.getElementById('insertJudgeNum').value;

    const response = await fetch('/insertIntoTable', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            targetTable: "JUDGEDCASES",
            attributeList: ["'" + idValue + "'", "'" + titleValue + "'", "DATE '" + dateValue + "'", "'" + licenseNumValue + "'"]
        })
    });

    const responseData = await response.json();
    const messageElement = document.getElementById('insertResultMsg');
    const responseDataBody = responseData.body;

    console.log(responseDataBody);

    if (responseData.success) {
        messageElement.textContent = "Data inserted successfully!";
        fetchAndDisplayTable();
    } else {
        if (responseDataBody.includes("Error: ORA-02291: integrity constraint") && responseDataBody.includes("violated - parent key not found")) {
            messageElement.textContent = "Error inserting data! Please input a Judge License Number listed in the judge table.";
        } else if (responseDataBody.includes("Error: ORA-00001: unique constraint")) {
            messageElement.textContent = "Error inserting data! Please input a unique Case Number not used in the table.";
        } else if (responseDataBody.includes("Error: Forbidden words in request")) {
            messageElement.textContent = "Error inserting data! Please remove the forbidden words.";
        } else {
            messageElement.textContent = "Error inserting data!";
        }
    }
}

async function deleteJCTable(event) {
    event.preventDefault();

    const caseNum = document.getElementById('caseId').value;

    const response = await fetch('/deleteEntry', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            targetTable: "JUDGEDCASES",
            condition: "CASENUM = \'" + String(caseNum) + "\'"
        })
    });

    const responseData = await response.json();
    const demotableContent = responseData.data;
    const messageElement = document.getElementById('insertResultMsg');

    if (responseData.success) {
        messageElement.textContent = "Data deleted successfully!";
        fetchAndDisplayTable();
    } else {
        messageElement.textContent = "Error deleting data!";
    }
}

// Updates title in judged cases table.
async function updateTitleJCTable(event) {
    event.preventDefault();

    const caseIDValue = document.getElementById('updateTitleCaseID').value;
    // const oldTitleValue = document.getElementById('updateOldTitle').value;
    const newTitleValue = document.getElementById('updateNewTitle').value;

    const response = await fetch('/updateEntry', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            targetTable: "JUDGEDCASES",
            conditionAttribute: "casenum",
            conditionValue: "'" + String(caseIDValue) + "'",
            targetAttribute: "title",
            targetValue: "'" + String(newTitleValue)+ "'"
        })
    });

    const responseData = await response.json();
    const messageElement = document.getElementById('updateTitleResultMsg');
    const responseDataBody = responseData.body;

    console.log(responseDataBody);

    if (responseData.success) {
        if (!responseDataBody.includes('"rowsAffected":0')) {
            messageElement.textContent = "Title updated successfully!";
        } else {
            messageElement.textContent = "Error updating title! Please input a Case Number listed in the judged cases table.";
        }
        fetchAndDisplayTable();
    } else {
        if (responseDataBody.includes("Error: ORA-02291: integrity constraint") && responseDataBody.includes("violated - parent key not found")) {
            messageElement.textContent = "Error updating title! Please input a Judge License Number listed in the judge table.";
        } else {
            messageElement.textContent = "Error updating title!";
        }
    }
}

// Updates starting date in judged cases table.
async function updateDateJCTable(event) {
    event.preventDefault();

    const caseIDValue = document.getElementById('updateDateCaseID').value;
    // const oldStartDateValue = document.getElementById('updateOldStartDate').value;
    const newStartDateValue = document.getElementById('updateNewStartDate').value;

    const response = await fetch('/updateEntry', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            targetTable: "JUDGEDCASES",
            conditionAttribute: "casenum",
            conditionValue: "'" + String(caseIDValue) + "'",
            targetAttribute: "start_date",
            targetValue: "DATE '" + String(newStartDateValue) + "'"
        })
    });

    const responseData = await response.json();
    const messageElement = document.getElementById('updateDateResultMsg');
    const responseDataBody = responseData.body;

    console.log(responseDataBody);

    if (responseData.success) {
        if (!responseDataBody.includes('"rowsAffected":0')) {
            messageElement.textContent = "Starting date updated successfully!";
        } else {
            messageElement.textContent = "Error updating starting date! Please input a Case Number listed in the judged cases table.";
        }
        fetchAndDisplayTable();
    } else {
        if (responseDataBody.includes("Error: ORA-02291: integrity constraint") && responseDataBody.includes("violated - parent key not found")) {
            messageElement.textContent = "Error updating starting date! Please input a Judge License Number listed in the judge table.";
        } else {
            messageElement.textContent = "Error updating starting date!";
        }
    }
}

// Updates judge license number in judged cases table.
async function updateJudgeNumJCTable(event) {
    event.preventDefault();

    const caseIDValue = document.getElementById('updateJudgeNumCaseID').value;
    // const oldJudgeLicenseNumValue = document.getElementById('updateOldJudgeLicenseNumber').value;
    const newJudgeLicenseNumValue = document.getElementById('updateNewJudgeLicenseNumber').value;

    const response = await fetch('/updateEntry', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            targetTable: "JUDGEDCASES",
            conditionAttribute: "casenum",
            conditionValue: "'" + String(caseIDValue) + "'",
            targetAttribute: "licensenum",
            targetValue: "'" + String(newJudgeLicenseNumValue) + "'"
        })
    });

    const responseData = await response.json();
    const messageElement = document.getElementById('updateJudgeNumResultMsg');
    const responseDataBody = responseData.body;

    // console.log(responseDataBody);

    if (responseData.success) {
        if (!responseDataBody.includes('"rowsAffected":0')) {
            messageElement.textContent = "Judge license number updated successfully!";
        } else {
            messageElement.textContent = "Error updating judge license number! Please input a Case Number listed in the judged cases table.";
        }
        fetchAndDisplayTable();
    } else {
        if (responseDataBody.includes("Error: ORA-02291: integrity constraint") && responseDataBody.includes("violated - parent key not found")) {
            messageElement.textContent = "Error updating judge license number! Please input a Judge License Number listed in the judge table.";
        } else {
            messageElement.textContent = "Error updating judge license number!";
        }
    }
}

// Counts rows in the demotable.
// Modify the function accordingly if using different aggregate functions or procedures.
async function countDemotable() {
    const response = await fetch("/count-demotable", {
        method: 'GET'
    });

    const responseData = await response.json();
    const messageElement = document.getElementById('countResultMsg');

    if (responseData.success) {
        const tupleCount = responseData.count;
        messageElement.textContent = `The number of tuples in demotable: ${tupleCount}`;
    } else {
        alert("Error in count demotable!");
    }
}

async function join(event) {
    event.preventDefault();

    const tableElement = document.getElementById('tableAfterJoin');
    const tableBody = tableElement.querySelector('tbody');
    const joinDateValue = document.getElementById('joinStartDate').value;

    const response = await fetch('/queryWithJoin', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            targetTables: ["EVIDENCEBELONGINGTO", "JUDGEDCASES"],
            attributeList: ["DESCRIPTION", "TITLE", "START_DATE"],
            condition: "EVIDENCEBELONGINGTO.CASENUM = JUDGEDCASES.CASENUM AND START_DATE > DATE '" + String(joinDateValue) + "'"
        })
    })

    const responseData = await response.json();
    const messageElement = document.getElementById('joinResultMsg');
    const tableContent = responseData.body;

    if (responseData.success) {
        messageElement.textContent = "Tables joined successfully!";

        // Always clear old, already fetched data before new fetching process.
            if (tableBody) {
                tableBody.innerHTML = '';
            }

            content = JSON.parse(tableContent);
            console.log(content);
            content.forEach(user => {
                const row = tableBody.insertRow();
                user.forEach((field, index) => {
                    const cell = row.insertCell(index);
                    cell.textContent = field;
                });
            });
    } else {
        messageElement.textContent = "Error joining tables!";
    }
}

/*
async function testFunction() {
    const response = await fetch("/projection", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({targetTable : "CASEJURY",
            attributeList : ['NUMPEOPLE', 'CASENUM']})
    });
    const responseData = await response.json();

    if (responseData.success) {
        const messageElement = document.getElementById('testResultMsg');
        messageElement.textContent = "demotable initiated successfully!";
        fetchTableData();
    } else {
        alert(responseData.fa);
    }
}
*/




// ---------------------------------------------------------------
// Initializes the webpage functionalities.
// Add or remove event listeners based on the desired functionalities.
window.onload = function() {

    const z = document.getElementById('dbStatus');
    if (z) {
        checkDbConnection();
    }

    const b = document.getElementById("displayJudgedCases")
    if (b) {
        b.addEventListener("click", fetchAndDisplayJudgedCases);
    }

    const c = document.getElementById("displayTableNames");
    if (c) {
        c.addEventListener("click", displayTableNames);
    }

    const d = document.getElementById("resetDemotable");
    if (d) {
        d.addEventListener("click", resetDemotable);
    }

    const e = document.getElementById("insertJCtable");
    if (e) {
        e.addEventListener("submit", insertJCtable);
    }

    const f = document.getElementById("updateNameDemotable");
    if (f) {
        f.addEventListener("submit", updateNameDemotable);
    }

    const g = document.getElementById("countDemotable");
    if (g) {
        g.addEventListener("click", countDemotable);
    }
    /*
    const h = document.getElementById("testButton");
    if (h) {
        h.addEventListener("click", testFunction);
    }
    */

    const i = document.getElementById("deleteJCTable");
    if (i) {
        i.addEventListener("submit", deleteJCTable);
    }

    const l = document.getElementById("updateTitle");
    if (l) {
        l.addEventListener("submit", updateTitleJCTable);
    }

    const m = document.getElementById("updateDate");
    if (m) {
        m.addEventListener("submit", updateDateJCTable);
    }

     const n = document.getElementById("updateJudgeNum");
     if (n) {
        n.addEventListener("submit", updateJudgeNumJCTable);
    }

    const o = document.getElementById("selectProjectionTable");
    if (o) {
        o.addEventListener("submit", displayAttributeNames);
    }
    const p = document.getElementById("selectProjectionAttribute");
    if (p) {
        p.addEventListener("submit", project);
    }

    const q = document.getElementById("joinDateInput");
    if (q) {
        q.addEventListener("submit", join);
    }

    if (document.getElementById("judgedCasesTable")) {
        fetchAndDisplayTable();
    }

    if (document.getElementById("judgeTable")) {
        fetchAndDisplayJudgeTable();
    }

    if (document.getElementById("closedCaseTable")) {
        displayClosedCaseTable();
    }

    if (document.getElementById("evidenceTable")) {
        displayEvidenceTable();
    }

//
//    const selectOperationVerdict = document.getElementById("selectOperationVerdict");
//    const select = document.getElementById("select");
//    const selectValue = document.getElementById("selectValue");
//    const operationVerdictValue = document.getElementById("operationVerdict");
//    const formVerdict = document.getElementById("verdictSubmit");
//    const formValue = document.getElementById("submitter");
//    const operationNumber = document.getElementById("operationNumber");
//    const inputValue = document.getElementById("inputValue");
//    const attribute = document.getElementById("attribute");
//    if (selectOperationVerdict) {
//        formVerdict.addEventListener("click", filter(operationVerdictValue.value));
//    }
//    if (selectValue) {
//        formValue.addEventListener("click", filterValue(attribute.value, operationNumber.value, inputValue));
//    }

    const countButton = document.getElementById("countHearings");
    if (countButton) {
        countButton.addEventListener("click", count);
    }

    const groupByHavingButton = document.getElementById("groupByHavingButton");
    if (groupByHavingButton) {
        groupByHavingButton.addEventListener("click", groupByHaving);
    }

    const judgeDivisionButton = document.getElementById("judgeDivisionButton");
    if (judgeDivisionButton) {
        judgeDivisionButton.addEventListener("click", divide);
    }

    const nestedButton = document.getElementById("nestedButton");
    if (nestedButton) {
        nestedButton.addEventListener("click", nest);
    }

    const filterButton = document.getElementById("filterButton");
    if (filterButton) {
        filterButton.addEventListener("click", select);
    }
};

// General function to refresh the displayed table data. 
// You can invoke this after any table-modifying operation to keep consistency.
function fetchTableData() {
    fetchAndDisplayUsers();
}
