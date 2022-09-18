import {
  VsCorsOption,
  VsCorsOptions,
  VsCorsOptionsBase
} from "./types/VsCors.types";
import { isString } from "./utils/validations";

/**
 * Simple data structure for storing CORS configuration.
 * This is signleton class and object will be alive with application.
 */
class VsCorsRulesStore {
  private store: VsCorsOptions = [];
  private wildCardRouteCorsRules!: VsCorsOptionsBase;

  /**
   * This method will return corrosponding `corsRules` for the route
   * Note if current request route is not present and wildCardRouteCorsRules were configured then with fallback `wildCardRouteCorsRules` will be returned
   * @param route {string} - current request route
   * @returns - {VsCorsOptionsBase | null} - if current request was configured in CORS then VsCorsOptionsBase will be returned or else null
   */
  getRule(route: string): VsCorsOptionsBase | null {
    const corsOption = this.store.find(_corsRuleObject => {
      const { routes = [] } = _corsRuleObject;
      if (isString(routes)) {
        return routes.includes(route);
      }
      if (Array.isArray(routes)) {
        return !!routes.find(_route => {
          if (isString(_route)) {
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
    } else if (this.wildCardRouteCorsRules) {
      return this.wildCardRouteCorsRules;
    }
    return null;
  }

  /**
   *
   * @param corsRuleObject {VsCorsOption} - user configured CORS options for route
   * @returns {void}
   */
  addRule(corsRuleObject: VsCorsOption) {
    if (corsRuleObject.routes.includes("*")) {
      this.wildCardRouteCorsRules = corsRuleObject.corsRules;
      return;
    }
    this.store.push(corsRuleObject);
  }
}

export default new VsCorsRulesStore();
