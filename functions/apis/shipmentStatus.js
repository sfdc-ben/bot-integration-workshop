const e = require('express')
const { request, response } = require('express')
const { Client, Pool } = require('pg')

const pool = new Pool({
    user: 'slaraahnwbpnni',
    host: 'ec2-52-23-40-80.compute-1.amazonaws.com',
    database: 'd8reh5gb95pu4q',
    password: 'ccc6ba90234a62dedeb268f7717cebfce2b61a5bc1c8cba842b1daaf6b7d161e',
    port: 5432,
    ssl: true,
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000
})

exports.getShipments = (request, response) => {
    let crmEmail = request.params.email
    console.log(crmEmail)
    const query = `
    SELECT onlineordernumber
    FROM oms."shipments"
    WHERE customeremail = '${crmEmail}'
    `
    let queryResult

    (async function() {
        const client = await pool.connect()
        let result
        try {
             result = await client.query(query)
             console.log(result)
            queryResult = result.rows
            const shipResponse = queryResult 
            if (shipResponse.length === 0) {
                response.status(404).send({ error: 'No shipments found'})
            } else {
                response.json(shipResponse)
            }
            
        } catch (e) {
            response.status(404).send({ error: 'No shipments found'})
        }
        client.release()
        
    })()
}

exports.getShipmentDetails = (request, response) => {
    let orderNumber = request.params.order
    console.log(orderNumber)
    const query = `
    SELECT *
    FROM oms."shipments"
    WHERE onlineordernumber = '${orderNumber}'
    `
    let queryResult
    (async function() {
        const client = await pool.connect()
        const result = await client.query(query)
        client.release()
        console.log(result)
        queryResult = result.rows
        const shipResponse = {
            shipment: queryResult[0],
        }
        response.json(shipResponse)
    })()
}