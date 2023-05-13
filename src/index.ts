import { server } from "./server/server";

server.listen(process.env.PORT || 8000, () => {
  console.log("Server is listening on port 8000");
});
