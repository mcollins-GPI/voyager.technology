const Fastify = require('fastify');
const server = Fastify();
const proxy = require('fastify-http-proxy');

server.register(proxy, {
  upstream: 'http://my-api.example.com',
  prefix: '/api', // optional
  http2: false // optional
})

server.listen(3000)
