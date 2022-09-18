"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var validations_1 = require("./utils/validations");
/**
 * Simple data structure for storing CORS configuration.
 * This is signleton class and object will be alive with application.
 */
var VsCorsRulesStore = /** @class */ (function () {
    function VsCorsRulesStore() {
        this.store = [];
    }
    /**
     * This method will return corrosponding `corsRules` for the route
     * Note if current request route is not present and wildCardRouteCorsRules were configured then with fallback `wildCardRouteCorsRules` will be returned
     * @param route {string} - current request route
     * @returns - {VsCorsOptionsBase | null} - if current request was configured in CORS then VsCorsOptionsBase will be returned or else null
     */
    VsCorsRulesStore.prototype.getRule = function (route) {
        var corsOption = this.store.find(function (_corsRuleObject) {
            var _a = _corsRuleObject.routes, routes = _a === void 0 ? [] : _a;
            if ((0, validations_1.isString)(routes)) {
                return routes.includes(route);
            }
            if (Array.isArray(routes)) {
                return !!routes.find(function (_route) {
                    if ((0, validations_1.isString)(_route)) {
                        return _route === route;
                    }
                    if (_route instanceof RegExp) {
                        return _route.test(route);
                    }
                });
            }
        });
        if (corsOption) {
            return corsOption.corsRules;
        }
        else if (this.wildCardRouteCorsRules) {
            return this.wildCardRouteCorsRules;
        }
        return null;
    };
    /**
     *
     * @param corsRuleObject {VsCorsOption} - user configured CORS options for route
     * @returns {void}
     */
    VsCorsRulesStore.prototype.addRule = function (corsRuleObject) {
        if (corsRuleObject.routes.includes("*")) {
            this.wildCardRouteCorsRules = corsRuleObject.corsRules;
            return;
        }
        this.store.push(corsRuleObject);
    };
    return VsCorsRulesStore;
}());
exports.default = new VsCorsRulesStore();
