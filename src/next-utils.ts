import next from "next";

/**************The purpose of this file***************** 
 sets up a Next.js application instance (nextApp) and a request handler (nextHandler).
 The PORT constant determines the port on which the application will run, and the dev
 property in the configuration object ensures that development features are enabled
 when the application is running in a non-production environment. The nextHandler
 is essential for integrating Next.js with a custom server setup.
*/

/*
****dev: The dev property is set to true if the NODE_ENV is not "production,"
indicating that the application is running in development mode.
This is useful for enabling certain development features or optimizations.

****port: The port property is set to the value of the PORT constant, specifying the
port on which the Next.js application should listen.
*/

const PORT = Number(process.env.PORT) || 3000;

export const nextApp = next({
  dev: process.env.NODE_ENV !== "production",
  port: PORT,
});

/*
The nextApp variable now holds an instance of the Next.js application,
which can be used to start the server.
This handler is crucial for integrating Next.js with a custom server
(like an Express server).
*/
export const nextHandler = nextApp.getRequestHandler();

/*
The getRequestHandler method returns a function that can handle HTTP
requests for your Next.js application. You typically use this handler in
conjunction with your server's routing mechanism to ensure that Next.js
handles requests to pages defined in your application.

The getRequestHandler function provides a function that can be used as
middleware in your custom server to delegate handling of Next.js-specific
routes to Next.js itself.
*/

/**************Why this file? why we manually instantiate nextjs app?***************
 When you run a Next.js app with its default server
 (which is built into Next.js and starts automatically), you don't need to
 use this file explicitly because the default server handles routing and request
 handling for you. However, in certain scenarios, you might want to use a
 custom server, such as an Express server, to handle additional features, middleware,
 or more advanced routing.
*/
