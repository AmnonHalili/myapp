const app = require("./server");
const port = process.env.PORT || 3000;
require("dotenv").config();

if (process.env.ENVIRONMENT !== "testing") {
    app.listen(port, () => {
        console.log(`Server running on http://localhost:${port}`);
    });
}

module.exports = app;
