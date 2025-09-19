const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: 'http://192.168.0.5:8082', // 백엔드 실제 주소는 HTTP 권장
            changeOrigin: true,
            secure: false
        })
    );
};