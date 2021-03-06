/*
 * Copyright (C) 2014 Apple Inc. All rights reserved.
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

WebInspector.IndexedDatabaseObjectStoreIndex = function (name, keyPath, unique, multiEntry) {
    WebInspector.Object.call(this);

    this._name = name;
    this._keyPath = keyPath;
    this._unique = unique || false;
    this._multiEntry = multiEntry || false;
    this._parentObjectStore = null;
};

WebInspector.IndexedDatabaseObjectStoreIndex.TypeIdentifier = "indexed-database-object-store-index";
WebInspector.IndexedDatabaseObjectStoreIndex.NameCookieKey = "indexed-database-object-store-index-name";
WebInspector.IndexedDatabaseObjectStoreIndex.KeyPathCookieKey = "indexed-database-object-store-index-key-path";

WebInspector.IndexedDatabaseObjectStoreIndex.prototype = Object.defineProperties({
    constructor: WebInspector.IndexedDatabaseObjectStoreIndex,
    __proto__: WebInspector.Object.prototype,

    saveIdentityToCookie: function saveIdentityToCookie(cookie) {
        cookie[WebInspector.IndexedDatabaseObjectStoreIndex.NameCookieKey] = this._name;
        cookie[WebInspector.IndexedDatabaseObjectStoreIndex.KeyPathCookieKey] = this._keyPath;
    },

    // Protected

    establishRelationship: function establishRelationship(parentObjectStore) {
        this._parentObjectStore = parentObjectStore || null;
    }
}, {
    name: { // Public

        get: function get() {
            return this._name;
        },
        configurable: true,
        enumerable: true
    },
    keyPath: {
        get: function get() {
            return this._keyPath;
        },
        configurable: true,
        enumerable: true
    },
    unique: {
        get: function get() {
            return this._unique;
        },
        configurable: true,
        enumerable: true
    },
    multiEntry: {
        get: function get() {
            return this._multiEntry;
        },
        configurable: true,
        enumerable: true
    },
    parentObjectStore: {
        get: function get() {
            return this._parentObjectStore;
        },
        configurable: true,
        enumerable: true
    }
});
