import express from "express";
import { getPayloadClient } from "./getPayload";
import { nextApp, nextHandler } from "./next-utils";

const app = express();
const PORT = process.env.PORT || 3000;

const start = async () => {
  // Intialize the payload client
  const payload = getPayloadClient({
    InitOptions: {
      express: app,
      onInit: async (cms) => {
        cms.logger.info(`Admin URL ${cms.getAdminURL()}`);
      },
    },
  });
  /*
  since this is express server(custom server), we have to integrate
  with the Nextjs app using the handler that we define inside next-utils.ts
  and the handler will forward the req and res to the nextjs app
  */
  app.use((req, res) => nextHandler(req, res));

  nextApp.prepare().then(() => {
    // payload.logger.info('Next.js started')

    app.listen(PORT, async () => {
      // payload.logger.info(
      //     `Next.js App URL: ${process.env.NEXT_PUBLIC_SERVER_URL}`
      // )
    });
  });
};

start();
