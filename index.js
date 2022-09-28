const app = require('./api/config/expressConfig');
require('dotenv').config();

const port = process.env.PORT || 3030;

app.listen(port, console.log(`Server is running on ${port}`));