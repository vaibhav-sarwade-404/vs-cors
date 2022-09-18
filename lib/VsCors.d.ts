import { Request, Response, NextFunction } from "express";
import { VsCorsOptions } from "./types/VsCors.types";
/**
 * Access-Control-Request-Method    = method
 * Access-Control-Request-Headers   = 1#field-name
 * wildcard                         = "*"
 * Access-Control-Allow-Origin      = origin-or-null / wildcard
 * Access-Control-Allow-Credentials = %s"true" ; case-sensitive
 * Access-Control-Expose-Headers    = #field-name
 * Access-Control-Max-Age           = delta-seconds
 * Access-Control-Allow-Methods     = #method
 * Access-Control-Allow-Headers     = #field-name
 */
/**
 * When responding to a credentialed requests request,
 * the server must specify an origin in the value of the Access-Control-Allow-Origin header,
 * instead of specifying the "*" wildcard.
 *
 * If credential is required then Access-Control-Allow-Origin, Access-Control-Allow-Headers, Access-Control-Allow-Methods cannot have wildcard (*) in preflight request
 */
/**
 * This is simple CORS middleware to hanlde CORS based on routes.
 * Configure all CORS options once and use it for routes specified.
 * @param vsCorsOptions {VsCorsOptions} - CORS options
 * @returns - {Function} middleware function
 */
declare const VsCors: (vsCorsOptions: VsCorsOptions) => (req: Request, resp: Response, next: NextFunction) => Promise<void | Response<any, Record<string, any>>>;
export default VsCors;
