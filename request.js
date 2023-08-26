let fs = require('fs')
let config = {
        unixSocket: fs.readFileSync('x.unixSocketAddress').toString()
}


let net = require('net')
let con = net.connect(config.unixSocket, (x)=>{
    console.info(` [ > ] Connected to server...`)
    con.write("request")
    con.on("data", (m)=>{
      console.info(m.toString())
    })
})
