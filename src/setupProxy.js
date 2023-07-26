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