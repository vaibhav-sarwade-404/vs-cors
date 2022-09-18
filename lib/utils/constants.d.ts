export declare const HEADERS: {
    /**
     *
     * The Access-Control-Allow-Origin response header indicates whether the response can be shared with requesting code from the given origin.
     *
     * Suppose the server sends a response with an Access-Control-Allow-Origin value with an explicit origin
     * (rather than the "*" wildcard). In that case, the response should also include a Vary response header
     * with the value Origin — to indicate to browsers that server responses can differ based on the value of the Origin request header.
     *
     * For more information refer:
     * https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Allow-Origin
     */
    accessControlAllowOrigin: string;
    /**
     * The Access-Control-Allow-Methods response header specifies one or more methods allowed
     * when accessing a resource in response to a preflight request.
     *
     * For more information refer:
     * https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Allow-Methods
     */
    accessControlAllowMethods: string;
    /**
     * The Access-Control-Allow-Headers response header is used in response to a preflight request
     * which includes the Access-Control-Request-Headers to indicate which HTTP headers can be used during the actual request.
     *
     * Access-Control-Allow-Headers: X-Custom-Header, Upgrade-Insecure-Requests
     *
     * For more information refer:
     * https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Allow-Headers
     */
    accessControlAllowHeaders: string;
    /**
     * The Access-Control-Expose-Headers response header allows a server to indicate which response headers
     * should be made available to scripts running in the browser, in response to a cross-origin request.
     * Only the CORS-safelisted response headers are exposed by default. For clients to be able to access other headers,
     * the server must list them using the Access-Control-Expose-Headers header.
     *
     * Access-Control-Expose-Headers: X-Custom-Header, Content-Encoding
     *
     * For more information refer:
     * https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Expose-Headers
     */
    accessControlExposeHeaders: string;
    /**
     * The Access-Control-Allow-Credentials response header tells browsers whether to expose
     * the response to the frontend JavaScript code when the request's credentials mode (Request.credentials) is include.
     *
     * Credentials are cookies, authorization headers, or TLS client certificates.
     *
     * For more information refer:
     * https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Allow-Credentials
     */
    accessControlAllowCredentials: string;
    /**
     * The Access-Control-Max-Age response header indicates how long the results of a preflight request
     * (that is the information contained in the Access-Control-Allow-Methods and Access-Control-Allow-Headers headers) can be cached.
     * There is cap for different browsers, refer below link
     * https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Max-Age
     */
    accessControlMaxAge: string;
    /**
     *
     * The Vary HTTP response header describes the parts of the request message aside from the method
     * and URL that influenced the content of the response it occurs in. Most often, this is used to create
     * a cache key when content negotiation is in use. The same Vary header value should be used on all responses for a given URL,
     * including 304 Not Modified responses and the "default" response.
     *
     * For more information refer:
     * https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Vary
     */
    vary: string;
};
export declare const HttpMethods: string[];
export declare const DEFAULTS: {
    schemaName: string;
};
