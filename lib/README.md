# @vs-org/cors

This is simple CORS express middleware package to handle CORS headers and configurations. With this package user can keep all CORS policies configured and refered from single place rather than jumping in code for each routes CORS policies.

## Usage

1. Wild card routes (common CORS policy for all routes)

   a) CORS is configured only all routes `*` route and there is `options` route handler as well for `*` route.<br/>
   b) With below example CORS policies will be applied for all routes.<br/>

```
// CJS
import VsCors from "@vs-org/cors";

// Module
const VsCors = "@vs-org/cors".default;

const vsCors = VsCors([
    {
      routes: ["*"],
      corsRules: {
        allowedMethods: ["GET", "DELETE", "PUT", "POST", "PATCH"],
        allowedHeaders: ["*"],
        allowedOrigins: ["http://localhost:3000", "https://www.google.com"]
      }
    }
  ]);

  app.options("*", vsCors);
  app.post("/login", vsCors, async (req: Request, resp: Response) => {
    return resp.send("Login success response");
  });

```

<br/>

2. Specific CORS policies per route

   a) CORS is configured only for `/login` route and there is `options` route handler as well for `/login` route.<br/>
   b) With below example CORS policies will be only applied for `/login` route.<br/>

```
// CJS
import VsCors from "@vs-org/cors";

// Module
const VsCors = "@vs-org/cors".default;

const vsCors = VsCors([
    {
      routes: ["/login"],
      corsRules: {
        allowedMethods: ["POST"],
        allowedHeaders: ["*"],
        allowedOrigins: ["http://localhost:3000", "https://www.google.com"]
      }
    }
  ]);

  // vsCors is required with OPTIONS route, as preflight decides the CORS by browser.
  // vsCors is required with `POST` as it will be actual CORS response
  app.options("/login", vsCors);
  app.post("/login", vsCors, async (req: Request, resp: Response) => {
    return resp.send("Login success response");
  });

```

<br/>

3. Specific CORS policies per route, and common policy for other routes

   a) If CORS policies are needed per route then configure CORS with different rules.<br/>
   b) With below example we have configured `*` route and `/login` route. If any other route apart from `/login` is requested for eg: `/delete` route. Then `*` CORS policies will be used.<br/>
   c) Note even though `*` is configures there should be `options` route handling from application. Refer below example.<br/>

```
// CJS
import VsCors from "@vs-org/cors";

// Module
const VsCors = "@vs-org/cors".default;

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
  app.post("/login", vsCors, async (req: Request, resp: Response) => {
    return resp.send("Login success response");
  });

  app.options("/delete", vsCors); // or here it can be app.options("/delete", vsCors);
  app.delete("/delete", vsCors, async (req: Request, resp: Response) => {
    return resp.send("delete success response");
  });

```

<br/>

## CORS options

| option                 | required | type                                                                                              | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| ---------------------- | -------- | ------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `allowedOrigins`       | `false`  | `string[] \| RegExp[]`                                                                            | This option can be used to restrict which origins can access application resources. If this option is set then `Access-Control-Allow-Origin` header will be configured in preflight requests (`OPTIONS`) response for browser to process CORS request. Actual request response will also be populated with this header. For more information follow [Access-Control-Allow-Origin](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Allow-Origin)                                                                                                                                                                                       |
| `allowedMethods`       | `false`  | `string[] can only contain one of the "OPTIONS", "GET", "HEAD", "PATCH", "PUT", "POST", "DELETE"` | This option can be used to restrict which HTTP verb / methods can be used to access application resources from other domains. If this option is set then `Access-Control-Allow-Methods` header will be configured in preflight requests (`OPTIONS`) response for browser to process CORS request. Actual request response will also be populated with this header. For more information follow [Access-Control-Allow-Methods](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Allow-Methods)                                                                                                                                          |
| `allowedHeaders`       | `false`  | `string[]`                                                                                        | This option can be used to restrict which custom headers (except from [CORS safelist headers](https://developer.mozilla.org/en-US/docs/Glossary/CORS-safelisted_request_header)) can be sent by client application to access application resources from other domains. If this option is set then `Access-Control-Allow-Headers` header will be configured in preflight requests (`OPTIONS`) response for browser to process CORS request. Actual request response will also be populated with this header. For more information follow [Access-Control-Allow-Headers](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Allow-Headers) |
| `allowedExposeHeaders` | `false`  | `string[]`                                                                                        | This option can be used to let browser know which response headers will be accessible for client application (Javascript). If this option is set then `Access-Control-Expose-Headers` header will be configured in preflight requests (`OPTIONS`) response for browser to process CORS request. Actual request response will also be populated with this header. For more information follow [Access-Control-Expose-Headers](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Expose-Headers)                                                                                                                                          |
| `allowCredentials`     | `false`  | `boolean`                                                                                         | This option can be used to let browser know that client application (Javascript) can include crederntials ( cookies, authorization headers, or TLS client certificates) in actual request. If this option is set then `Access-Control-Allow-Credentials` header will be configured in preflight requests (`OPTIONS`) response for browser to process CORS request. Main request response will also be populated with this header. For more information follow [Access-Control-Allow-Credentials](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Allow-Credentials)                                                                   |
| `accessControlMaxAge`  | `false`  | `number`                                                                                          | This option can be used to indicates how long the results of a preflight request (`OPTIONS`). If this option is set then `Access-Control-Max-Age` header will be configured in `OPTIONS` response for browser to process CORS request. Main request response will also be populated with this header. There is cap for different browsers for more information follow [Access-Control-Max-Age](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Max-Age)                                                                                                                                                                               |
| `responseHandler`      | `false`  | `Function: (req:Request, resp: Response, next: NextFunction)=> void`                              | This option can be used to change default response from package for preflight request (`OPTIONS`). Note this is only applicable for preflight request (`OPTIONS`) for other HTTP verb / methods package will relay request to next request handler via `express.NextFunction`.                                                                                                                                                                                                                                                                                                                                                                                 |

<br/>

## License

MIT (see [LICENSE](https://github.com/vaibhav-sarwade-404/vs-cors/blob/main/LICENSE))

<br/>

## Note

This is experimental package and not actively maintained. Please don't raise issues or feature requests. Only use for development and POC's.
