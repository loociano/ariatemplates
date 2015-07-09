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
require("./ValidatorMessagesCfgBeans");
var ariaCoreEnvironmentEnvironmentBase = require("../../core/environment/EnvironmentBase");


/**
 * Contains getters for the Validator environment.
 * @class aria.utils.validators.ValidatorMessages
 * @extends aria.core.environment.EnvironmentBase
 * @singleton
 */
module.exports = Aria.classDefinition({
    $classpath : "aria.utils.validators.ValidatorMessages",
    $extends : ariaCoreEnvironmentEnvironmentBase,
    $singleton : true,
    $prototype : {
        /**
         * Classpath of the bean which allows to validate the part of the environment managed by this class.
         * @type String
         * @protected
         */
        _cfgPackage : "aria.utils.validators.ValidatorMessagesCfgBeans.AppCfg",

        /**
         * Returns the validator messages
         * @public
         * @return {aria.utils.validators.ValidatorMessagesCfgBeans:AppCfg.ValidatorMessagesCfg}
         */
        getValidatorMessages : function () {
            return this.checkApplicationSettings("validatorMessages");
        }

    }
});
