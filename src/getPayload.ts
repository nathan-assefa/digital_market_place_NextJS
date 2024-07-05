/* this file intialize the payload CMS */
/*
if there is permission isue when 'npm istall payload', 
and if it is linux os, you can use this
sudo chown -R $USER:$GROUP ~/.npm
sudo chown -R $USER:$GROUP ~/.config
*/
import dotenv from "dotenv";
import path from "path";
import type { InitOptions } from "payload/config";
import payload from "payload";

dotenv.config({
  path: path.resolve(__dirname, "../.env"),
});

/*
global is a reference to the global object in Node.js.
The (global as any) syntax is used to cast it to the any type,
providing flexibility in accessing properties.
It's attempting to retrieve the value of payload from the global object.
attempting to access the value associated with the payload key within the global object.
*/
let cached = (global as any).payload;

/*
The purpose of this code is to ensure that there is a single
cached payload object in the global scope. If such an object already
exists (cached is truthy), it is reused; otherwise, a new object is created,
assigned to the global payload, and also stored in the cached variable.
**** what are client and promise in this case?****
The client and promise properties are used to store the initialized
Payload client and the associated promise. 
*/
if (!cached) {
  cached = (global as any).payload = {
    client: null,
    promise: null,
  };
}

/*
The getPayloadClient function will get us access to our database,
where we send emails, log users in hand authentication and manage
products etc... 
*/
/*
initOptions: Partial<InitOptions> suggests that initOptions is an object
of type InitOptions or a partial object of that type. It means that when you
create an instance of InitOptions, you don't need to provide values for
all properties; some properties can be omitted.
*/
interface Args {
  InitOptions?: Partial<InitOptions>;
}
export const getPayloadClient = async ({ InitOptions }: Args = {}) => {
  if (!process.env.PAYLOAD_SECRET) {
    throw new Error("PAYLOAD_SECRET is missing");
  }

  if (cached.client) {
    return cached.client;
  }

  /*
  The init method in the Payload client is responsible for
  initializing the client by configuring various settings and
  connecting it to the server.
  ***secret: represents the secret key used for server-client communication.
             This key is typically set on the server and shared securely with the
             client to ensure that only authorized clients can interact with the server.
  ***local:  It controls whether the Payload client should operate in local mode.
  */
  if (!cached.promise) {
    /*
    The init method takes the configuration object
    for the intialization that we can configure
    */
    cached.promise = payload.init({
      secret: process.env.PAYLOAD_SECRET,
      local: InitOptions?.express ? false : true,
      ...(InitOptions || {}),
    });
  }

  try {
    cached.client = await cached.promise;
  } catch (e: unknown) {
    cached.promise = null;
    throw e;
  }

  return cached.client;
};
