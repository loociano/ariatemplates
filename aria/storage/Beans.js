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
var Aria = require("../Aria");
var ariaCoreJsonTypes = require("../core/JsonTypes");


/**
 * Beans definition for the objects used by classes inside aria.storage
 */
module.exports = Aria.beanDefinitions({
    $package : "aria.storage.Beans",
    $namespaces : {
        "json" : ariaCoreJsonTypes
    },
    $description : "Structure of the objects used by the aria.storage package",
    $beans : {
        "ConstructorArgs" : {
            $type : "json:Object",
            $description : "Argument object for the constructor of storage classes.",
            $properties : {
                "namespace" : {
                    $type : "json:String",
                    $description : "Optional prefix used for any key in order to avoid collisions."
                },
                "serializer" : {
                    $type : "json:ObjectRef",
                    $description : "Seriliazer class used to convert values into strings."
                }
            }
        }
    }
});
