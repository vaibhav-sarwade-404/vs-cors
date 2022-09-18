"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var schema_validator_1 = __importDefault(require("@vs-org/schema-validator"));
var constants_1 = require("./utils/constants");
var validations_1 = require("./utils/validations");
var VsCorsRulesStore_1 = __importDefault(require("./VsCorsRulesStore"));
var schemaValidator = schema_validator_1.default.getInstance({
    allErrors: true
});
var vsCorsOptionsSchema = {
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
            itemsFrom: constants_1.HttpMethods,
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
schemaValidator.addSchema(constants_1.DEFAULTS.schemaName, vsCorsOptionsSchema);
schemaValidator.compile(constants_1.DEFAULTS.schemaName);
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
var VsCors = function (vsCorsOptions) {
    var e_1, _a;
    var _b, _c, _d;
    try {
        for (var vsCorsOptions_1 = __values(vsCorsOptions), vsCorsOptions_1_1 = vsCorsOptions_1.next(); !vsCorsOptions_1_1.done; vsCorsOptions_1_1 = vsCorsOptions_1.next()) {
            var vsCorsOption = vsCorsOptions_1_1.value;
            var corsRules = vsCorsOption.corsRules, routes = vsCorsOption.routes;
            var validationErrors = schemaValidator.validate(constants_1.DEFAULTS.schemaName, __assign(__assign({}, corsRules), { routes: routes }));
            if (validationErrors && validationErrors.hasSchemaValidationError()) {
                throw validationErrors.getErrors();
            }
            if (corsRules.allowCredentials) {
                if ((_b = corsRules.allowedOrigins) === null || _b === void 0 ? void 0 : _b.includes("*"))
                    throw new Error("With allowCredentials is as true Access-Control-Allow-Origin cannot contain wildcard (*).");
                if ((_c = corsRules.allowedHeaders) === null || _c === void 0 ? void 0 : _c.includes("*"))
                    throw new Error("With allowCredentials is as true Access-Control-Allow-Headers cannot contain wildcard (*).");
                if ((_d = corsRules.allowedMethods) === null || _d === void 0 ? void 0 : _d.includes("*"))
                    throw new Error("With allowCredentials is as true Access-Control-Allow-Methods cannot contain wildcard (*).");
            }
            if (routes.length > 1 && routes.includes("*")) {
                throw new TypeError("VsCorsOptions.routes cannot contain plain routes and wildcard (*).");
            }
            VsCorsRulesStore_1.default.addRule(vsCorsOption);
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (vsCorsOptions_1_1 && !vsCorsOptions_1_1.done && (_a = vsCorsOptions_1.return)) _a.call(vsCorsOptions_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return function (req, resp, next) { return __awaiter(void 0, void 0, void 0, function () {
        var route, requestMethod, origin, corsRule, allowCredentials, allowedExposeHeaders, allowedHeaders, allowedMethods, allowedOrigins, cachingMaxAge, responseHandler;
        return __generator(this, function (_a) {
            route = req.route.path || "";
            requestMethod = (req.method || "").toUpperCase();
            origin = req.headers.origin || "";
            if (!origin) {
                return [2 /*return*/, next()];
            }
            corsRule = VsCorsRulesStore_1.default.getRule(route);
            if (!corsRule) {
                return [2 /*return*/, next()];
            }
            allowCredentials = corsRule.allowCredentials, allowedExposeHeaders = corsRule.allowedExposeHeaders, allowedHeaders = corsRule.allowedHeaders, allowedMethods = corsRule.allowedMethods, allowedOrigins = corsRule.allowedOrigins, cachingMaxAge = corsRule.cachingMaxAge, responseHandler = corsRule.responseHandler;
            if (allowedOrigins &&
                (0, validations_1.doesElementMatchesToArrayElements)(allowedOrigins, origin)) {
                resp.setHeader(constants_1.HEADERS.accessControlAllowOrigin, origin);
                resp.setHeader(constants_1.HEADERS.vary, "Origin");
                if (allowCredentials) {
                    resp.setHeader(constants_1.HEADERS.accessControlAllowCredentials, "true");
                }
                if (allowedExposeHeaders && allowedExposeHeaders.length) {
                    resp.setHeader(constants_1.HEADERS.accessControlExposeHeaders, allowedExposeHeaders.join(", "));
                }
                if (allowedHeaders && allowedHeaders.length) {
                    resp.setHeader(constants_1.HEADERS.accessControlAllowHeaders, allowedHeaders.join(", "));
                }
                if (allowedMethods && allowedMethods.length) {
                    resp.setHeader(constants_1.HEADERS.accessControlAllowMethods, allowedMethods.join(", "));
                }
                if (cachingMaxAge) {
                    resp.setHeader(constants_1.HEADERS.accessControlMaxAge, String(cachingMaxAge));
                }
            }
            if (requestMethod === "OPTIONS") {
                if (responseHandler && (0, validations_1.isFunction)(responseHandler)) {
                    return [2 /*return*/, responseHandler(req, resp, next)];
                }
                return [2 /*return*/, resp.status(204).send()];
            }
            return [2 /*return*/, next()];
        });
    }); };
};
exports.default = VsCors;
