// import path from 'path'
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/fcu',
    createProxyMiddleware({
      target: 'http://localhost:4000',
      changeOrigin: true,
      pathRewrite: {
        '/fcuPortal': '',
        '/fcu': 'http://localhost:4000'
      }
    })
  )
   app.use(
     '/fcuPortal/fcu',
     createProxyMiddleware({
       target: 'http://localhost:4000',
       changeOrigin: true,
       pathRewrite: {
         '/fcuPortal/fcu': 'http://localhost:4000',
       }
     })
   )

   app.use(
    '/dsa',
    createProxyMiddleware({
      target: 'http://localhost:4001',
      changeOrigin: true,
      pathRewrite: {
        '/dsaPortal': '',
        '/dsa': 'http://localhost:4001'
      }
    })
  )

  app.use(
    '/dsaPortal/dsa',
    createProxyMiddleware({
      target: 'http://localhost:4001',
      changeOrigin: true,
      pathRewrite: {
        '/dsaPortal/dsa': 'http://localhost:4001',
      }
    })
  )
};

// module.exports = function(app) {
//     app.use(
//       '/fcu',
//       createProxyMiddleware({
//         target: 'http://localhost:4000',
//         changeOrigin: true,
//         pathRewrite: (path, req) => {
//             path.replace('/fcu', '')
//         }
//       })
//     );
//   };