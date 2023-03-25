import "dotenv/config";
import server from "./services/server.js";
import { initWsServer } from "./services/socket.js";

const init = async () => {
  const port = process.env.PORT || 8080;
  initWsServer(server);
  server.listen(port, () =>
    console.log(`Servidor express escuchando en el puerto ${port}`)
  );

  server.on("error", (error) => {
    console.log("Catch de error en servidor!", error);
  });
};

init();
