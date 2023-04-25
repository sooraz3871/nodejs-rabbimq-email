(() => {
    module.exports = {
      api: {
        tags: {
          name: 'Email management',
          description: 'Email Apis ',
        },
        paths: {
          '/emails': {
            get: {
              tags: ['APIs'],
              summary: ' Gets the list of emails and can filter blogs',
              description: 'Gets the list of emails and can filter blogs',
              operationId: 'getEmailsList',
              parameters: [
                {
                  in: 'query',
                  name: 'start_date',
                  schema: {
                    type: 'string'
                  },
                  description: 'Start Date for the Range'
                },
                {
                  in: 'query',
                  name: 'end_date',
                  schema: {
                    type: 'string'
                  },
                  description: 'End Date for the range'
                },
                {
                  in: 'query',
                  name: 'email',
                  schema: {
                    type: 'string'
                  },
                  description: 'Filter by Destination email address'
                },
                {
                  in: 'query',
                  name: 'emails',
                  schema: {
                    type: ['string']
                  },
                  description: 'Filter by destination email addresses'
                },
                
              ],
              responses: {
                default: {
                  description: ' Response',
                  content: {
                    'application/json': {
                      schema: {
                        $ref: '#/components/schemas/getEmailsResponse',
                      },
                    },
                  },
                },
              },
              security:
                [
                  {
                    bearerAuth: [],
                  },
                ]
            },
          }
        },
        schemas: {
            getEmailsResponse: {
            type: 'object',
            properties: {


            }
          }
        }
      }
    };
  })();
  