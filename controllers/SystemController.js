
const info = (req,res) => {
    let argumentos = []
    process.argv.forEach(function (val, index, array) {
      argumentos.push(val)
    })
    let valores =  {
                    arguments : argumentos,
                    plataforma : process.platform,
                    version : process.version,
                    rss : process.memoryUsage().rss,
                    execPath : process.execPath,
                    processId : process.pid,
                    folder : process.cwd(),
                    procesadores : process.env.NUMBER_OF_PROCESSORS
   
                  }
    res.render('processInfo',valores)
  }



module.exports = {
   info
  }