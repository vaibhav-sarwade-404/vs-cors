import SchemaValidator, { Schema } from "@vs-org/schema-validator";
import { Request, Response, NextFunction } from "express";

import { VsCorsOptions } from "./types/VsCors.types";
import { DEFAULTS, HEADERS, HttpMethods } from "./utils/constants";
import {
  doesElementMatchesToArrayElements,
  isFunction
} from "./utils/validations";
import VsCorsRulesStore from "./VsCorsRulesStore";

const schemaValidator = SchemaValidator.getInstance({
  allErrors: true
});

const vsCorsOptionsSchema: Schema = {
  properties: {
    allowedOrigins: {
      type: "Array",
      required: false,
      items: ["String"],
      nullable: true,
      errorMessage: "allowedOrigins should be a valid string / regexp array."
    },
    allowedMethods: {
      type: "Array",
      required: false,
      items: ["String"],
      itemsFrom: HttpMethods,
      nullable: true,
      errorMessage: "allowedMethods should be a valid string array."
    },
    allowedHeaders: {
      type: "Array",
      required: false,
      items: ["String"],
      nullable: true,
      errorMessage: "allowedHeaders should be a valid string array."
    },
    allowedExposeHeaders: {
      type: "Array",
      required: false,
      items: ["String"],
      nullable: true,
      errorMessage: "allowedExposeHeaders should be a valid string array."
    },
    allowCredentials: {
      type: "Boolean",
      required: false,
      nullable: true,
      errorMessage: "allowCredentials should be boolean."
    },
    cachingMaxAge: {
      type: "Number",
      required: false,
      nullable: true,
      errorMessage: "cachingMaxAge should be number."
    },
    responseHandler: {
      type: "Function",
      nullable: true,
      errorMessage: "responseHandler should be a function."
    },
    routes: {
      type: "Array",
      items: ["String", "RegExp"],
      nullable: true,
      errorMessage: "routes should be a valid string array."
    }
  }
};

schemaValidator.addSchema(DEFAULTS.schemaName, vsCorsOptionsSchema);
schemaValidator.compile(DEFAULTS.schemaName);

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
const VsCors = (vsCorsOptions: VsCorsOptions) => {
  for (const vsCorsOption of vsCorsOptions) {
    const { corsRules, routes } = vsCorsOption;
    const validationErrors = schemaValidator.validate(DEFAULTS.schemaName, {
      ...corsRules,
      routes
    });
    if (validationErrors && validationErrors.hasSchemaValidationError()) {
      throw validationErrors.getErrors();
    }

    if (corsRules.allowCredentials) {
      if (corsRules.allowedOrigins?.includes("*"))
        throw new Error(
          `With allowCredentials is as true Access-Control-Allow-Origin cannot contain wildcard (*).`
        );
      if (corsRules.allowedHeaders?.includes("*"))
        throw new Error(
          `With allowCredentials is as true Access-Control-Allow-Headers cannot contain wildcard (*).`
        );
      if (corsRules.allowedMethods?.includes("*"))
        throw new Error(
          `With allowCredentials is as true Access-Control-Allow-Methods cannot contain wildcard (*).`
        );
    }

    if (routes.length > 1 && routes.includes("*")) {
      throw new TypeError(
        `VsCorsOptions.routes cannot contain plain routes and wildcard (*).`
      );
    }

    VsCorsRulesStore.addRule(vsCorsOption);
  }

  return async (req: Request, resp: Response, next: NextFunction) => {
    const route = req.route.path || "";
    const requestMethod = (req.method || "").toUpperCase();
    const origin = req.headers.origin || "";

    if (!origin) {
      return next();
    }

    const corsRule = VsCorsRulesStore.getRule(route);
    if (!corsRule) {
      return next();
    }

    const {
      allowCredentials,
      allowedExposeHeaders,
      allowedHeaders,
      allowedMethods,
      allowedOrigins,
      cachingMaxAge,
      responseHandler
    } = corsRule;

    if (
      allowedOrigins &&
      doesElementMatchesToArrayElements(allowedOrigins, origin)
    ) {
      resp.setHeader(HEADERS.accessControlAllowOrigin, origin);
      resp.setHeader(HEADERS.vary, "Origin");

      if (allowCredentials) {
        resp.setHeader(HEADERS.accessControlAllowCredentials, "true");
      }

      if (allowedExposeHeaders && allowedExposeHeaders.length) {
        resp.setHeader(
          HEADERS.accessControlExposeHeaders,
          allowedExposeHeaders.join(", ")
        );
      }

      if (allowedHeaders && allowedHeaders.length) {
        resp.setHeader(
          HEADERS.accessControlAllowHeaders,
          allowedHeaders.join(", ")
        );
      }

      if (allowedMethods && allowedMethods.length) {
        resp.setHeader(
          HEADERS.accessControlAllowMethods,
          allowedMethods.join(", ")
        );
      }

      if (cachingMaxAge) {
        resp.setHeader(HEADERS.accessControlMaxAge, String(cachingMaxAge));
      }
    }
    if (requestMethod === "OPTIONS") {
      if (responseHandler && isFunction(responseHandler)) {
        return responseHandler(req, resp, next);
      }
      return resp.status(204).send();
    }
    return next();
  };
};

export default VsCors;
