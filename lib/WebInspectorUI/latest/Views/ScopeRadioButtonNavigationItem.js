var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/*
 * Copyright (C) 2015 Apple Inc. All rights reserved.
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

WebInspector.ScopeRadioButtonNavigationItem = (function (_WebInspector$RadioButtonNavigationItem) {
    _inherits(ScopeRadioButtonNavigationItem, _WebInspector$RadioButtonNavigationItem);

    function ScopeRadioButtonNavigationItem(identifier, toolTip, scopeItems, defaultScopeItem) {
        _classCallCheck(this, ScopeRadioButtonNavigationItem);

        _get(Object.getPrototypeOf(ScopeRadioButtonNavigationItem.prototype), "constructor", this).call(this, identifier, toolTip);

        this._scopeItems = scopeItems || [];

        this._element.classList.add("scope-radio-button-navigation-item");
        this._element.title = defaultScopeItem ? defaultScopeItem.label : this._scopeItems[0].label;

        this._scopeItemSelect = document.createElement("select");
        this._scopeItemSelect.classList.add("scope-radio-button-item-select");

        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
            for (var _iterator = this._scopeItems[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var item = _step.value;

                var option = document.createElement("option");
                option.value = item.identifier;
                option.text = item.label;
                this._scopeItemSelect.appendChild(option);
            }
        } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion && _iterator["return"]) {
                    _iterator["return"]();
                }
            } finally {
                if (_didIteratorError) {
                    throw _iteratorError;
                }
            }
        }

        this.selectedItemIdentifier = defaultScopeItem ? defaultScopeItem.identifier : this._scopeItems[0].identifier;
        this._scopeItemSelect.addEventListener("change", this._handleItemChanged.bind(this));
        this._element.appendChild(this._scopeItemSelect);

        wrappedSVGDocument("Images/UpDownArrows.svg", "arrows", null, (function (element) {
            this._element.appendChild(element);
        }).bind(this));
    }

    // Public

    _createClass(ScopeRadioButtonNavigationItem, [{
        key: "dontPreventDefaultOnNavigationBarMouseDown",
        value: function dontPreventDefaultOnNavigationBarMouseDown() {
            return true;
        }

        // Private

    }, {
        key: "_handleItemChanged",
        value: function _handleItemChanged() {
            var selectedItemIdentifier;
            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                for (var _iterator2 = this._scopeItems[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var item = _step2.value;

                    if (item.identifier !== this.selectedItemIdentifier) continue;

                    selectedItemIdentifier = item;
                    break;
                }
            } catch (err) {
                _didIteratorError2 = true;
                _iteratorError2 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion2 && _iterator2["return"]) {
                        _iterator2["return"]();
                    }
                } finally {
                    if (_didIteratorError2) {
                        throw _iteratorError2;
                    }
                }
            }

            this._element.title = selectedItemIdentifier.label;
            this.dispatchEventToListeners(WebInspector.ScopeRadioButtonNavigationItem.Event.SelectedItemChanged);
        }
    }, {
        key: "selectedItemIdentifier",
        set: function set(identifier) {
            if (!identifier) return;

            this._scopeItemSelect.value = identifier;
        },
        get: function get() {
            return this._scopeItemSelect.value;
        }
    }]);

    return ScopeRadioButtonNavigationItem;
})(WebInspector.RadioButtonNavigationItem);

WebInspector.ScopeRadioButtonNavigationItem.Event = {
    SelectedItemChanged: "scope-radio-button-navigation-item-selected-item-changed"
};
