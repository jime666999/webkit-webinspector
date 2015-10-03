var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/*
 * Copyright (C) 2013 Apple Inc. All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions
 * are met:
 * 1. Redistributions of source code must retain the above copyright
 *    notice, this list of conditions and the following disclaimer.
 * 2. Redistributions in binary form must reproduce the above copyright
 *    notice, this list of conditions and the following disclaimer in the
 *    documentation and/or other materials provided with the distribution.
 *
 * THIS SOFTWARE IS PROVIDED BY APPLE INC. AND ITS CONTRIBUTORS ``AS IS''
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO,
 * THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
 * PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL APPLE INC. OR ITS CONTRIBUTORS
 * BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
 * CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
 * SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
 * INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
 * CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 * ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF
 * THE POSSIBILITY OF SUCH DAMAGE.
 */

Object.defineProperty(WebInspector, "javaScriptRuntimeCompletionProvider", {
    get: function get() {
        if (!WebInspector.JavaScriptRuntimeCompletionProvider._instance) WebInspector.JavaScriptRuntimeCompletionProvider._instance = new WebInspector.JavaScriptRuntimeCompletionProvider();
        return WebInspector.JavaScriptRuntimeCompletionProvider._instance;
    }
});

WebInspector.JavaScriptRuntimeCompletionProvider = (function (_WebInspector$Object) {
    _inherits(JavaScriptRuntimeCompletionProvider, _WebInspector$Object);

    function JavaScriptRuntimeCompletionProvider() {
        _classCallCheck(this, JavaScriptRuntimeCompletionProvider);

        _get(Object.getPrototypeOf(JavaScriptRuntimeCompletionProvider.prototype), "constructor", this).call(this);

        console.assert(!WebInspector.JavaScriptRuntimeCompletionProvider._instance);

        WebInspector.debuggerManager.addEventListener(WebInspector.DebuggerManager.Event.ActiveCallFrameDidChange, this._clearLastProperties, this);
    }

    // Protected

    _createClass(JavaScriptRuntimeCompletionProvider, [{
        key: "completionControllerCompletionsNeeded",
        value: function completionControllerCompletionsNeeded(completionController, defaultCompletions, base, prefix, suffix, forced) {
            // Don't allow non-forced empty prefix completions unless the base is that start of property access.
            if (!forced && !prefix && !/[.[]$/.test(base)) {
                completionController.updateCompletions(null);
                return;
            }

            // If the base ends with an open parentheses or open curly bracket then treat it like there is
            // no base so we get global object completions.
            if (/[({]$/.test(base)) base = "";

            var lastBaseIndex = base.length - 1;
            var dotNotation = base[lastBaseIndex] === ".";
            var bracketNotation = base[lastBaseIndex] === "[";

            if (dotNotation || bracketNotation) {
                base = base.substring(0, lastBaseIndex);

                // Don't suggest anything for an empty base that is using dot notation.
                // Bracket notation with an empty base will be treated as an array.
                if (!base && dotNotation) {
                    completionController.updateCompletions(defaultCompletions);
                    return;
                }

                // Don't allow non-forced empty prefix completions if the user is entering a number, since it might be a float.
                // But allow number completions if the base already has a decimal, so "10.0." will suggest Number properties.
                if (!forced && !prefix && dotNotation && base.indexOf(".") === -1 && parseInt(base, 10) == base) {
                    completionController.updateCompletions(null);
                    return;
                }

                // An empty base with bracket notation is not property access, it is an array.
                // Clear the bracketNotation flag so completions are not quoted.
                if (!base && bracketNotation) bracketNotation = false;
            }

            // If the base is the same as the last time, we can reuse the property names we have already gathered.
            // Doing this eliminates delay caused by the async nature of the code below and it only calls getters
            // and functions once instead of repetitively. Sure, there can be difference each time the base is evaluated,
            // but this optimization gives us more of a win. We clear the cache after 30 seconds or when stepping in the
            // debugger to make sure we don't use stale properties in most cases.
            if (this._lastBase === base && this._lastPropertyNames) {
                receivedPropertyNames.call(this, this._lastPropertyNames);
                return;
            }

            this._lastBase = base;
            this._lastPropertyNames = null;

            var activeCallFrame = WebInspector.debuggerManager.activeCallFrame;
            if (!base && activeCallFrame && !this._alwaysEvaluateInWindowContext) activeCallFrame.collectScopeChainVariableNames(receivedPropertyNames.bind(this));else WebInspector.runtimeManager.evaluateInInspectedWindow(base, "completion", true, true, false, false, false, evaluated.bind(this));

            function updateLastPropertyNames(propertyNames) {
                if (this._clearLastPropertiesTimeout) clearTimeout(this._clearLastPropertiesTimeout);
                this._clearLastPropertiesTimeout = setTimeout(this._clearLastProperties.bind(this), WebInspector.JavaScriptLogViewController.CachedPropertiesDuration);

                this._lastPropertyNames = propertyNames || {};
            }

            function evaluated(result, wasThrown) {
                if (wasThrown || !result || result.type === "undefined" || result.type === "object" && result.subtype === "null") {
                    RuntimeAgent.releaseObjectGroup("completion");

                    updateLastPropertyNames.call(this, {});
                    completionController.updateCompletions(defaultCompletions);

                    return;
                }

                function getArrayCompletions(primitiveType) {
                    var array = this;
                    var arrayLength;

                    var resultSet = {};
                    for (var o = array; o; o = o.__proto__) {
                        try {
                            if (o === array && o.length) {
                                // If the array type has a length, don't include a list of all the indexes.
                                // Include it at the end and the frontend can build the list.
                                arrayLength = o.length;
                            } else {
                                var names = Object.getOwnPropertyNames(o);
                                for (var i = 0; i < names.length; ++i) resultSet[names[i]] = true;
                            }
                        } catch (e) {
                            // Ignore
                        }
                    }

                    if (arrayLength) resultSet["length"] = arrayLength;

                    return resultSet;
                }

                function getCompletions(primitiveType) {
                    var object;
                    if (primitiveType === "string") object = new String("");else if (primitiveType === "number") object = new Number(0);else if (primitiveType === "boolean") object = new Boolean(false);else object = this;

                    var resultSet = {};
                    for (var o = object; o; o = o.__proto__) {
                        try {
                            var names = Object.getOwnPropertyNames(o);
                            for (var i = 0; i < names.length; ++i) resultSet[names[i]] = true;
                        } catch (e) {
                            // Ignore
                        }
                    }

                    return resultSet;
                }

                if (result.subtype === "array") result.callFunctionJSON(getArrayCompletions, undefined, receivedArrayPropertyNames.bind(this));else if (result.type === "object" || result.type === "function") result.callFunctionJSON(getCompletions, undefined, receivedPropertyNames.bind(this));else if (result.type === "string" || result.type === "number" || result.type === "boolean") WebInspector.runtimeManager.evaluateInInspectedWindow("(" + getCompletions + ")(\"" + result.type + "\")", "completion", false, true, true, false, false, receivedPropertyNamesFromEvaluate.bind(this));else console.error("Unknown result type: " + result.type);
            }

            function receivedPropertyNamesFromEvaluate(object, wasThrown, result) {
                receivedPropertyNames.call(this, result && !wasThrown ? result.value : null);
            }

            function receivedArrayPropertyNames(propertyNames) {
                // FIXME: <https://webkit.org/b/143589> Web Inspector: Better handling for large collections in Object Trees
                // If there was an array like object, we generate autocompletion up to 1000 indexes, but this should
                // handle a list with arbitrary length.
                if (propertyNames && typeof propertyNames.length === "number") {
                    var max = Math.min(propertyNames.length, 1000);
                    for (var i = 0; i < max; ++i) propertyNames[i] = true;
                }

                receivedPropertyNames.call(this, propertyNames);
            }

            function receivedPropertyNames(propertyNames) {
                propertyNames = propertyNames || {};

                updateLastPropertyNames.call(this, propertyNames);

                RuntimeAgent.releaseObjectGroup("completion");

                if (!base) {
                    var commandLineAPI = ["$", "$$", "$x", "dir", "dirxml", "keys", "values", "profile", "profileEnd", "monitorEvents", "unmonitorEvents", "inspect", "copy", "clear", "getEventListeners", "$0", "$_"];
                    if (WebInspector.debuggerManager.paused && WebInspector.debuggerManager.pauseReason === WebInspector.DebuggerManager.PauseReason.Exception) commandLineAPI.push("$exception");
                    for (var i = 0; i < commandLineAPI.length; ++i) propertyNames[commandLineAPI[i]] = true;

                    // FIXME: Due to caching, sometimes old $n values show up as completion results even though they are not available. We should clear that proactively.
                    for (var i = 1; i <= WebInspector.ConsoleCommandResultMessage.maximumSavedResultIndex; ++i) propertyNames["$" + i] = true;
                }

                propertyNames = Object.keys(propertyNames);

                var implicitSuffix = "";
                if (bracketNotation) {
                    var quoteUsed = prefix[0] === "'" ? "'" : "\"";
                    if (suffix !== "]" && suffix !== quoteUsed) implicitSuffix = "]";
                }

                var completions = defaultCompletions;
                var knownCompletions = completions.keySet();

                for (var i = 0; i < propertyNames.length; ++i) {
                    var property = propertyNames[i];

                    if (dotNotation && !/^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(property)) continue;

                    if (bracketNotation) {
                        if (parseInt(property) != property) property = quoteUsed + property.escapeCharacters(quoteUsed + "\\") + (suffix !== quoteUsed ? quoteUsed : "");
                    }

                    if (!property.startsWith(prefix) || property in knownCompletions) continue;

                    completions.push(property);
                    knownCompletions[property] = true;
                }

                function compare(a, b) {
                    // Try to sort in numerical order first.
                    var numericCompareResult = a - b;
                    if (!isNaN(numericCompareResult)) return numericCompareResult;

                    // Not numbers, sort as strings.
                    return a.localeCompare(b);
                }

                completions.sort(compare);

                completionController.updateCompletions(completions, implicitSuffix);
            }
        }

        // Private

    }, {
        key: "_clearLastProperties",
        value: function _clearLastProperties() {
            if (this._clearLastPropertiesTimeout) {
                clearTimeout(this._clearLastPropertiesTimeout);
                delete this._clearLastPropertiesTimeout;
            }

            // Clear the cache of property names so any changes while stepping or sitting idle get picked up if the same
            // expression is evaluated again.
            this._lastPropertyNames = null;
        }
    }]);

    return JavaScriptRuntimeCompletionProvider;
})(WebInspector.Object);