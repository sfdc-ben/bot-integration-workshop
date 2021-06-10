const { v4: uuidv4 } = require('uuid')
const { request, response } = require('express')
const moment = require('moment')

exports.postCustomAlert = ({ body }, response) => {
    const alert = {
        accountName: body.AccountName__c,
        subject: body.CaseSubject__c,
        message: body.Message__c,
        productName: body.ProductName__c,
        caseNumber: body.CaseNumber__c
    }

    console.log(alert)

    const time = moment().utcOffset(-8).format("MMM D YYYY, h:mm:ss a");
    const responseMessage = `${time} | Case: ${alert.caseNumber} | ${alert.message} | ${alert.productName} | ${alert.accountName}`

    const alertResponse = {
        eventResponseHandshakeId: uuidv4(),
        eventTimestampResponseMessage: responseMessage

    }
    response.status(201).json(alertResponse)
}