import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'Library Management API',
        version: '1.0.0',
        description: 'API documentation for the library management system',
    },
    servers: [
        {
            url: 'http://localhost:3001',
            description: 'Development server',
        },
    ],
    components: {
        schemas: {
            Book: {
                type: 'object',
                required: ['code', 'title', 'author'],
                properties: {
                    _id: {
                        type: 'string',
                        description: 'The auto-generated id of the book',
                    },
                    code: {
                        type: 'string',
                        description: 'Unique code for the book',
                    },
                    title: {
                        type: 'string',
                        description: 'Title of the book',
                    },
                    author: {
                        type: 'string',
                        description: 'Author of the book',
                    },
                    stock: {
                        type: 'integer',
                        description: 'Number of available copies in the library',
                        default: 0,
                    },
                },
            },
            Member: {
                type: 'object',
                required: ['code', 'name'],
                properties: {
                    _id: {
                        type: 'string',
                        description: 'The auto-generated id of the member',
                    },
                    code: {
                        type: 'string',
                        description: 'Unique code for the member',
                    },
                    name: {
                        type: 'string',
                        description: 'Name of the member',
                    },
                    borrowedBooks: {
                        type: 'array',
                        items: {
                            $ref: '#/components/schemas/Book',
                        },
                        description: 'Books currently borrowed by the member',
                    },
                    penaltyEndDate: {
                        type: 'string',
                        format: 'date',
                        description: 'The end date of penalty for late returns (if applicable)',
                    },
                },
            },
        },
    },
};

const options = {
    swaggerDefinition,
    apis: ['./routes/*.js', './models/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);
export { swaggerSpec, swaggerUi };