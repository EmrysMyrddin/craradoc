const Koa = require('koa')
const KoaBody = require('koa-body')
const koaRespond = require('koa-respond')

const app = new Koa()
app.use(koaRespond())
app.use(new KoaBody())

const listen = () => {
  const port = process.env.PORT || 4000
  app.listen(port, () => {
    console.info(`http server listening on port ${port}`)
  })

  app.on('error', (err, ctx) => {
    if (ctx) console.error('internal server error during request: ', err, ctx)
    else console.error('internal server error:', err)
  })
}

module.exports = { app, listen }
