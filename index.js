// Import server here and start the application
import server from "./api/Server.js";

const port = 3000

server.listen(port, console.log(`server is runing port ${port}`))