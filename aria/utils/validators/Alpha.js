/*
 * Aria Templates 1.7.8 - 08 Jun 2015
 *
 * Copyright 2009-2015 Amadeus s.a.s.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var Aria = require("../../Aria");
var ariaUtilsValidatorsRegExp = require("./RegExp");


/**
 * Validates that a string is an Alpha type
 * @class aria.utils.validators.Alpha
 * @extends aria.utils.validators.RegExp
 */
module.exports = Aria.classDefinition({
    $classpath : "aria.utils.validators.Alpha",
    $extends : ariaUtilsValidatorsRegExp,
    $constructor : function (message) {
        this.$RegExp.constructor.call(this, this.ALPHA_REGEXP, message);
    },
    $statics : {
        ALPHA_REGEXP : /^[A-Za-z]+$/,
        DEFAULT_LOCALIZED_MESSAGE : "Invalid ALPHA string."
    },
    $prototype : {}
});
