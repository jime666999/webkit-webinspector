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

WebInspector.SourceCodeTimeline = (function (_WebInspector$Timeline) {
    _inherits(SourceCodeTimeline, _WebInspector$Timeline);

    function SourceCodeTimeline(sourceCode, sourceCodeLocation, recordType, recordEventType) {
        _classCallCheck(this, SourceCodeTimeline);

        _get(Object.getPrototypeOf(SourceCodeTimeline.prototype), "constructor", this).call(this);

        console.assert(sourceCode);
        console.assert(!sourceCodeLocation || sourceCodeLocation.sourceCode === sourceCode);
        console.assert(recordType);

        this._sourceCode = sourceCode;
        this._sourceCodeLocation = sourceCodeLocation || null;
        this._recordType = recordType;
        this._recordEventType = recordEventType || null;
    }

    // Public

    _createClass(SourceCodeTimeline, [{
        key: "saveIdentityToCookie",
        value: function saveIdentityToCookie(cookie) {
            cookie[WebInspector.SourceCodeTimeline.SourceCodeURLCookieKey] = this._sourceCode.url ? this._sourceCode.url.hash : null;
            cookie[WebInspector.SourceCodeTimeline.SourceCodeLocationLineCookieKey] = this._sourceCodeLocation ? this._sourceCodeLocation.lineNumber : null;
            cookie[WebInspector.SourceCodeTimeline.SourceCodeLocationColumnCookieKey] = this._sourceCodeLocation ? this._sourceCodeLocation.columnNumber : null;
            cookie[WebInspector.SourceCodeTimeline.RecordTypeCookieKey] = this._recordType || null;
            cookie[WebInspector.SourceCodeTimeline.RecordEventTypeCookieKey] = this._recordEventType || null;
        }
    }, {
        key: "sourceCode",
        get: function get() {
            return this._sourceCode;
        }
    }, {
        key: "sourceCodeLocation",
        get: function get() {
            return this._sourceCodeLocation;
        }
    }, {
        key: "recordType",
        get: function get() {
            return this._recordType;
        }
    }, {
        key: "recordEventType",
        get: function get() {
            return this._recordEventType;
        }
    }]);

    return SourceCodeTimeline;
})(WebInspector.Timeline);

WebInspector.SourceCodeTimeline.TypeIdentifier = "source-code-timeline";
WebInspector.SourceCodeTimeline.SourceCodeURLCookieKey = "source-code-timeline-source-code-url";
WebInspector.SourceCodeTimeline.SourceCodeLocationLineCookieKey = "source-code-timeline-source-code-location-line";
WebInspector.SourceCodeTimeline.SourceCodeLocationColumnCookieKey = "source-code-timeline-source-code-location-column";
WebInspector.SourceCodeTimeline.SourceCodeURLCookieKey = "source-code-timeline-source-code-url";
WebInspector.SourceCodeTimeline.RecordTypeCookieKey = "source-code-timeline-record-type";
WebInspector.SourceCodeTimeline.RecordEventTypeCookieKey = "source-code-timeline-record-event-type";