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
        console.info(message)
        let messageToBeSend = [0.6, 0.8, 0.9]
        messageToBeSend = bufferPack.pack('>3d', messageToBeSend)
        console.info(messageToBeSend)
        connection.write(`length:${messageToBeSend.length}\n`)
        connection.write(`content:\n`)
        connection.write(messageToBeSend)
        //connection.end()
    })
})

server.listen(config.unixSocket,(server)=>{
    console.info(` [ > ] Server listening @ ${config.unixSocket}.`)
})
terminateCorrectly(server)
