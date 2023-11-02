// Import server here and start the application
import server from "./api/server.js";

const port = 3000

server.listen(port, console.log(`server is runing port ${port}`))