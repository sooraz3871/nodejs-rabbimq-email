(() => {
    const emailApis = require('./src/routes/api_definition');
  
    module.exports = {
      server: {
        openapi: '3.0.1',
        info: {
          title: 'Email APIs',
          description: 'This is a api document for email api',
          version: '1.0.0',
        },
        servers: [
          {
            url: 'http://127.0.0.1:8000/v1/api',
          }
        ],
        tags: [
            emailApis.api.tags
        ],
        paths: {
          ...emailApis.api.paths
        },
        components: {
          schemas: {
            ...emailApis.api.schemas
          }
        },
      },
    };
  })();
  