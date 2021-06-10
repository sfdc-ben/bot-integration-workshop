/* eslint-disable promise/catch-or-return */
/* eslint-disable promise/always-return */
const { request, response } = require('express')
const { v4: uuidv4 } = require('uuid')
const moment = require('moment')
const { Client, Pool } = require('pg')

const pool = new Pool({
    user: 'nrajhmryzscrgz',
    host: 'ec2-23-23-128-222.compute-1.amazonaws.com',
    database: 'db3vid8uo91qdj',
    password: 'ae90604ed5c5f72c4038234cfbfd9fa25c79f197b164503a60f43dd4d484fa6a',
    port: 5432,
    ssl: true,
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000
})

exports.getOrderStatus = (request, response) => {
    let crmId = request.params.orderId
    console.log(crmId)

    const query = `
    SELECT status
    FROM ordersdatabase."order"
    WHERE sfid = '${crmId}'
    `
    let queryResult

    (async function() {
        const client = await pool.connect()
        const result = await client.query(query)
        client.release()
        console.log(result)
            queryResult = result.rows
            const orderResponse = {
                status: queryResult[0].status,
                timestamp : moment().utcOffset(-8).toISOString(),
                responseId: uuidv4()
            }
            response.json(orderResponse)
    })()
}