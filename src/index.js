import "dotenv/config";
import server from "./services/server.js";
import { initWsServer, getWsServer } from "./services/socket";

const init = async () => {
  const port = process.env.PORT || 8080;
  initWsServer(server);
  server.listen(port, () =>
    console.log(
      `Servidor express escuchando en el puerto ${port} - PID WORKER ${process.pid}`
    )
  );

  server.on("error", (error) => {
    console.log("Catch de error en servidor!", error);
  });
};

init();
