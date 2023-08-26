let fs = require('fs')

let config = {
        unixSocket: fs.readFileSync('x.unixSocketAddress').toString()
}

let bufferPack = require('bufferpack')

console.info()
console.info(` [>*<] ... `)
console.info()

let terminateCorrectly = (x)=>{
['SIGINT', 'SIGTERM', 'SIGQUIT']
  .forEach(signal => process.on(signal, () => {
    x.close(
        ()=>{
        console.info(x)
        console.info(` [ ! ] Server at ${config.unixSocket} is now closed.`)
        process.exit()
    })
  }))
}

let net = require('net')
let server = net.Server()

server.on('connection', (connection)=>{
    connection.on("data", (message)=>{
        message = message.toString()
        console.info(` [ > ] Recieved message:`)
        console.info(`          `,message)
        let messageToBeSend = [0.6, 0.8, 0.9, 0.7]
        let packParameter   = `>${messageToBeSend.length}d`
        messageToBeSend = bufferPack.pack(packParameter, messageToBeSend)
        messageToBeSend = Buffer.from(messageToBeSend)
        console.info(`   >   Sending back buffer:`)
        console.info(`          `,messageToBeSend.toString())
        let header = `${packParameter}\n`
        header = Buffer.from(header)
        let bufferToWrite = Buffer.concat([header, messageToBeSend])
        connection.write(bufferToWrite)
        connection.end()
    })
    connection.on("error", (error)=>{
        console.info(error)
    })
})

server.listen(config.unixSocket,(server)=>{
    console.info(` [ > ] Server listening @ ${config.unixSocket}.`)
})
terminateCorrectly(server)
