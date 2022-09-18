import { VsCorsOption, VsCorsOptionsBase } from "./types/VsCors.types";
/**
 * Simple data structure for storing CORS configuration.
 * This is signleton class and object will be alive with application.
 */
declare class VsCorsRulesStore {
    private store;
    private wildCardRouteCorsRules;
    /**
     * This method will return corrosponding `corsRules` for the route
     * Note if current request route is not present and wildCardRouteCorsRules were configured then with fallback `wildCardRouteCorsRules` will be returned
     * @param route {string} - current request route
     * @returns - {VsCorsOptionsBase | null} - if current request was configured in CORS then VsCorsOptionsBase will be returned or else null
     */
    getRule(route: string): VsCorsOptionsBase | null;
    /**
     *
     * @param corsRuleObject {VsCorsOption} - user configured CORS options for route
     * @returns {void}
     */
    addRule(corsRuleObject: VsCorsOption): void;
}
declare const _default: VsCorsRulesStore;
export default _default;
