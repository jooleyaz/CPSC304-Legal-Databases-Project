const express = require('express');
const appService = require('./appService');

const router = express.Router();

// ----------------------------------------------------------
// API endpoints
// Modify or extend these routes based on your project's needs.
router.get('/check-db-connection', async (req, res) => {
    const isConnect = await appService.testOracleConnection();
    if (isConnect) {
        res.send('connected');
    } else {
        res.send('unable to connect');
    }
});

///////////////////////////////////

router.get('/judgedcases-table', async (req, res) => {
    const tableContent = await appService.fetchTableFromDb('JUDGEDCASES');
    res.json({data: tableContent});
});

router.get('/judge-table', async (req, res) => {
    const tableContent = await appService.fetchTableFromDb('JUDGE');
    res.json({data: tableContent});
});

router.get('/closedcase-table', async (req, res) => {
    const tableContent = await appService.fetchTableFromDb('CLOSEDCASE');
    res.json({data: tableContent});
});

router.get('/evidence-table', async (req, res) => {
    const tableContent = await appService.fetchTableFromDb('EVIDENCEBELONGINGTO');
    res.json({data: tableContent});
});

/////////////////////////////////////

router.get('/demotable', async (req, res) => {
    const tableContent = await appService.fetchDemotableFromDb();
    res.json({data: tableContent});
});

router.post("/initiate-demotable", async (req, res) => {
    const initiateResult = await appService.initiateDemotable();
    if (initiateResult) {
        res.json({ success: true });
    } else {
        res.status(500).json({ success: false });
    }
});
/*
router.post("/insert-JCtable", async (req, res) => {
    const { id, title, date, licenseNum } = req.body;
    const insertResult = await appService.insertIntoTable('JUDGEDCASES', [id, title, date, licenseNum]);
    if (insertResult) {
        res.json({ success: true });
    } else {
        res.status(500).json({ success: false });
    }
});
*/

router.post("/update-name-demotable", async (req, res) => {
    const { oldName, newName } = req.body;
    const updateResult = await appService.updateNameDemotable(oldName, newName);
    if (updateResult) {
        res.json({ success: true });
    } else {
        res.status(500).json({ success: false });
    }
});

router.get('/count-demotable', async (req, res) => {
    const tableCount = await appService.countDemotable();
    if (tableCount >= 0) {
        res.json({ 
            success: true,  
            count: tableCount
        });
    } else {
        res.status(500).json({ 
            success: false, 
            count: tableCount
        });
    }
});

router.post('/test', async (req, res) => {
    const result = await appService.insertIntoTable();
    if(result.status) {
        res.json({
            success: true,
            msg: result.body
        });
    }else {
        res.status(500).json({
            success: false,
            msg: result.body
        });
    }

});

//access project at /projection with a POST, body should contain two fields, targetTable and attributeList
router.post('/projection', async (req, res) => {

    const { targetTable, attributeList } = req.body;



    const result = await appService.projectTable(targetTable, attributeList);
    if(result.status !== false) {
        res.json({
            success: true,
            body: result.body
        });
    }else {
        res.status(500).json({
            success: false,
            body: result.body
        });
    }


});

router.post('/insertIntoTable', async (req, res) => {

    const { targetTable, attributeList } = req.body;



    const result = await appService.insertIntoTable(targetTable, attributeList);
    if(result.status !== false) {
        res.json({
            success: true,
            body: result.body
        });
    }else {
        res.status(500).json({
            success: false,
            body: result.body
        });
    }


});

router.post('/deleteEntry', async (req, res) => {

    const { targetTable, condition } = req.body;



    const result = await appService.deleteEntry(targetTable, condition);
    if(result.status !== false) {
        res.json({
            success: true,
            body: result.body
        });
    }else {
        res.status(500).json({
            success: false,
            body: result.body
        });
    }


});

router.post('/updateEntry', async (req, res) => {

    const { targetTable,
        conditionAttribute,
        conditionValue,
        targetAttribute,
        targetValue } = req.body;



    const result = await appService.updateEntry(targetTable,
        conditionAttribute,
        conditionValue,
        targetAttribute,
        targetValue);
    if(result.status !== false) {
        res.json({
            success: true,
            body: result.body
        });
    }else {
        res.status(500).json({
            success: false,
            body: result.body
        });
    }


});

router.post('/selectFromTable', async (req, res) => {

    const { targetTable,
        attributeList,
        condition} = req.body;



    const result = await appService.selectFromTable(targetTable,
        attributeList,
        condition);
    if(result.status !== false) {
        res.json({
            success: true,
            body: result.body
        });
    }else {
        res.status(500).json({
            success: false,
            body: result.body
        });
    }


});

router.post('/queryWithJoin', async (req, res) => {

    const { targetTables,
        attributeList,
        condition} = req.body;



    const result = await appService.queryWithJoin(targetTables,
        attributeList,
        condition);
    if(result.status !== false) {
        res.json({
            success: true,
            body: result.body
        });
    }else {
        res.status(500).json({
            success: false,
            body: result.body
        });
    }


});

router.post('/queryWithJoinGroupByHaving', async (req, res) => {

    const { targetTables,
        attributeList,
        condition,
        groupBy,
        having} = req.body;



    const result = await appService.queryWithJoinGroupByHaving(targetTables,
        attributeList,
        condition,
        groupBy,
        having);
    if(result.status !== false) {
        res.json({
            success: true,
            body: result.body
        });
    }else {
        res.status(500).json({
            success: false,
            body: result.body
        });
    }


});

router.post('/queryWithJoinGroupByHavingNested', async (req, res) => {

    const {targetTables,
        attributeList,
        condition,
        groupBy,
        havingAttr1,
        op,
        targetTable2,
        attribute2} = req.body;



    const result = await appService.queryWithJoinGroupByHavingNested(targetTables,
        attributeList,
        condition,
        groupBy,
        havingAttr1,
        op,
        targetTable2,
        attribute2);
    if(result.status !== false) {
        res.json({
            success: true,
            body: result.body
        });
    }else {
        res.status(500).json({
            success: false,
            body: result.body
        });
    }


});


module.exports = router;