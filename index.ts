import express, { Request, Response } from "express";

import VsCors from "./src";

(async () => {
  const app = express();

  const vsCors = VsCors([
    {
      routes: ["*"],
      corsRules: {
        allowedMethods: ["GET", "DELETE", "PUT", "POST", "PATCH"],
        allowedHeaders: ["*"],
        allowedOrigins: ["http://localhost:3000", "https://www.google.com"]
      }
    },
    {
      routes: ["/login"],
      corsRules: {
        allowedMethods: ["POST"],
        allowedHeaders: ["*"],
        allowedOrigins: ["http://localhost:3000", "https://www.google.com"]
      }
    }
  ]);

  app.options("/login", vsCors);
  app.get("/login", vsCors, async (req: Request, resp: Response) => {
    return resp.send("Login success response");
  });

  app.options("*", vsCors);
  app.delete("/delete", vsCors, async (req: Request, resp: Response) => {
    return resp.send("delete success response");
  });

  app.patch("/patch", vsCors, async (req: Request, resp: Response) => {
    return resp.send("delete success response");
  });

  app.put("/put", vsCors, async (req: Request, resp: Response) => {
    return resp.send("delete success response");
  });

  app.post("/post", vsCors, async (req: Request, resp: Response) => {
    return resp.send("delete success response");
  });

  app.listen(3000, () => console.log(`App is listening on port 3000`));
})();
