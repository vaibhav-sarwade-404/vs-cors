import { Request, Response, NextFunction } from "express";
export declare type HttpMethods = "OPTIONS" | "GET" | "HEAD" | "PATCH" | "PUT" | "POST" | "DELETE" | "*";
export declare type VsCorsOptionsBase = {
    /**
     * All allowed origins
     * can be string or regexp
     */
    allowedOrigins?: Array<string | RegExp>;
    /**
     * Allowed methods, can be one of or all values
     * OPTIONS, GET, HEAD, PATCH, PUT, POST, DELETE
     *
     */
    allowedMethods?: HttpMethods[];
    /**
     * Allowed custom headers apart from CORS safelist headers
     * To read more on CORS safelist headers refer:
     * https://developer.mozilla.org/en-US/docs/Glossary/CORS-safelisted_request_header
     */
    allowedHeaders?: string[];
    /**
     * If application is returning some custom headers mention those headers in this option for client side to be able to use it
     * Eg: X-Custom-Header
     * For more information refer:
     * https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Expose-Headers
     */
    allowedExposeHeaders?: string[];
    /**
     * If client side is including crederntials ( cookies, authorization headers, or TLS client certificates)
     * Then this if this option is set as true then only browser will expose headers to client side.
     *
     * For more information refer:
     * https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Allow-Credentials
     */
    allowCredentials?: boolean;
    /**
     * The Access-Control-Max-Age response header indicates how long the results of a preflight request
     * (that is the information contained in the Access-Control-Allow-Methods and Access-Control-Allow-Headers headers) can be cached.
     * There is cap for different browsers, refer below link
     * https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Max-Age
     */
    cachingMaxAge?: number;
    /**
     * Response handler, in case if CORS reponse needs to be handled by application.
     *
     * Respone headers will be already set by package depending on the configuration, but here there is flexibility to override package behaviour or change status code
     */
    responseHandler?: (req: Request, resp: Response, next: NextFunction) => void;
};
/**
 * Routes array (route can be string or regexp)
 * If specific array needs common CORS policy, those routes can be included here.
 * If fallback and common CORS policies are needed then configure one route with only ["*"]. If current request route is not present in configuration then this fallback will be used.
 * Also if `app.options("*", vsCors);` used then also route with ["*"] will be used.
 *
 * If options are mentioend agains a route as a key then also routes can be provided, so CORS policy will be applied to routes and key route
 */
export declare type VsCorsOptionKey = Array<string | RegExp>;
/**
 *
 */
export declare type VsCorsOption = {
    routes: VsCorsOptionKey;
    corsRules: VsCorsOptionsBase;
};
export declare type VsCorsOptions = Array<VsCorsOption>;
