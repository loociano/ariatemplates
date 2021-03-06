/*
 * Aria Templates 1.7.15 - 11 Dec 2015
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
var ariaCoreJsonTypes = require("../../core/JsonTypes");
var ariaWidgetLibsCommonBeans = require("../../widgetLibs/CommonBeans");


module.exports = Aria.beanDefinitions({
    $package : "aria.touch.widgets.SliderCfgBeans",
    $description : "Slider config beans",
    $namespaces : {
        "json" : ariaCoreJsonTypes,
        "common" : ariaWidgetLibsCommonBeans
    },
    $beans : {
        "SliderCfg" : {
            $type : "json:Object",
            $description : "Configuration of the slider widget.",
            $properties : {
                id : {
                    $type : "json:String",
                    $description : "Id of the widget"
                },
                width : {
                    $type : "json:Integer",
                    $description : "Width to use for the widget.",
                    $default : 100
                },
                toggleSwitch : {
                    $type : "json:Boolean",
                    $description : "to enable the Toggle switch.",
                    $default : false
                },
                tapToMove : {
                    $type : "json:Boolean",
                    $description : "Tap on the Slider Rail should moves the thumb to the tap position. If the slider is a switch, it moves the thumb to the closest border (either 0 or 1)",
                    $default : false
                },
                tapToToggle : {
                    $type : "json:Boolean",
                    $description : "Tap on the Slider should toggle the value between 0 or 1, regardless of where the tap happened. Only used if the widget is a switch"
                },
                switchThreshold : {
                    $type : "json:Float",
                    $description : "When using the widget as switch, this is the value above which all value are converted to 1",
                    $default : 0.5
                },
                onLabel : {
                    $type : "json:String",
                    $description : "On label for switch mode",
                    $default : "ON"
                },
                offLabel : {
                    $type : "json:String",
                    $description : "Off label for switch mode",
                    $default : "OFF"
                },
                bind : {
                    $type : "json:Object",
                    $description : "Automatic bindings for the widget properties",
                    $properties : {
                        value : {
                            $type : "json:Object",
                            $description : "Binding for the widget's value",
                            $properties : {
                                inside : {
                                    $type : "json:ObjectRef",
                                    $description : "Reference to the object that holds the property to bind to.",
                                    $mandatory : true
                                },
                                to : {
                                    $type : "json:String",
                                    $description : "Name of the property to bind to.",
                                    $mandatory : true
                                }
                            }
                        }
                    }
                }
            }
        },
        "DoubleSliderCfg" : {
            $type : "json:Object",
            $description : "Configuration of the slider widget with two thumbs.",
            $properties : {
                id : {
                    $type : "json:String",
                    $description : "Id of the widget"
                },
                width : {
                    $type : "json:Integer",
                    $description : "Width to use for the widget.",
                    $default : 100
                },
                bind : {
                    $type : "json:Object",
                    $description : "Automatic bindings for the widget properties",
                    $properties : {
                        value : {
                            $type : "json:Object",
                            $description : "Binding for the widget's value",
                            $properties : {
                                inside : {
                                    $type : "json:ObjectRef",
                                    $description : "Reference to the object that holds the property to bind to.",
                                    $mandatory : true
                                },
                                to : {
                                    $type : "json:String",
                                    $description : "Name of the property to bind to.",
                                    $mandatory : true
                                }
                            }
                        }
                    }
                },
                onchange : {
                    $type : "common:Callback",
                    $description : "Function to be called when at least on the values of the widget changes due to user action (drag)."
                }
            }
        }
    }
});
