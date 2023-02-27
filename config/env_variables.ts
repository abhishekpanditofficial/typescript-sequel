export default {
    environment: process.env.ENV,
    PORT: process.env.PORT,

    REPORT_DB_CONFIG: {
        REPORT_DB_HOST: process.env.REPORT_DB_HOST,
        REPORT_DB_PORT: process.env.REPORT_DB_PORT,
        REPORT_DB_USER: process.env.REPORT_DB_USER,
        REPORT_DB_PASSWORD: process.env.REPORT_DB_PASSWORD,
        REPORT_DB_DATABASE: process.env.REPORT_DB_DATABASE
    },
  
}