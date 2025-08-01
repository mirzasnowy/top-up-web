// netlify/functions/api.ts
import serverless from "serverless-http";
import { createServer } from "../../server";

const server = createServer();
export const handler = serverless(server, {
  binary: false,
  request: (request: any, event: any, context: any) => {
    // Debug logging
    console.log('Event path:', event.path);
    console.log('Event httpMethod:', event.httpMethod);
    console.log('Event headers:', event.headers);
    
    return request;
  }
});