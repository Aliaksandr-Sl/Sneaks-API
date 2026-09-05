const Sneaks = require('.')      // loads index.js (the library)
const http = require('http')

const sneaks = new Sneaks()
const PORT = process.env.PORT || 3000

const server = http.createServer((req, res) => {
  const url = new URL(req.url, `http://localhost:${PORT}`)

  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Content-Type', 'application/json')

  if (req.method === 'OPTIONS') { res.writeHead(204); res.end(); return }

  const idMatch = url.pathname.match(/^\/id\/(.+)$/)
  if (idMatch) {
    const styleId = decodeURIComponent(idMatch[1])
    sneaks.getProducts(styleId, 1, (err, products) => {
      if (err || !products?.length) { res.writeHead(404); res.end(JSON.stringify(null)); return }
      res.writeHead(200)
      res.end(JSON.stringify(products[0]))
    })
    return
  }

  res.writeHead(404)
  res.end(JSON.stringify({ error: 'Not found' }))
})

server.listen(PORT, () => console.log(`Sneaks server on port ${PORT}`))
