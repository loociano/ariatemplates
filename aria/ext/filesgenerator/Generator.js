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
var ariaCoreJsonValidator = require("../../core/JsonValidator");
require("./GeneratorBeans");
var ariaExtFilesgeneratorTplClass = require("./tpl/Class.tpl.txt");
var ariaExtFilesgeneratorTplInterface = require("./tpl/Interface.tpl.txt");
var ariaExtFilesgeneratorTplHtmlTemplate = require("./tpl/HtmlTemplate.tpl.txt");
var ariaExtFilesgeneratorTplCssTemplate = require("./tpl/CssTemplate.tpl.txt");
var ariaExtFilesgeneratorTplTemplateScript = require("./tpl/TemplateScript.tpl.txt");
var ariaExtFilesgeneratorTplMacroLibrary = require("./tpl/MacroLibrary.tpl.txt");
var ariaExtFilesgeneratorTplCssLibrary = require("./tpl/CssLibrary.tpl.txt");
var ariaExtFilesgeneratorTplFlowController = require("./tpl/FlowController.tpl.txt");
var ariaExtFilesgeneratorTplModuleController = require("./tpl/ModuleController.tpl.txt");
var ariaExtFilesgeneratorTplModuleControllerInterface = require("./tpl/ModuleControllerInterface.tpl.txt");
var ariaExtFilesgeneratorTplFlowControllerInterface = require("./tpl/FlowControllerInterface.tpl.txt");
var ariaExtFilesgeneratorTplBootstrap = require("./tpl/Bootstrap.tpl.txt");
var ariaCoreJsObject = require("../../core/JsObject");
var ariaUtilsJson = require("../../utils/Json");


/**
 * File skeleton generator utility class to be used to get the text content of any type of Aria Templates file. A class,
 * a module controller, a template, a template script, a CSS template, a flow, an interface, ...
 */
module.exports = Aria.classDefinition({
    $classpath : "aria.ext.filesgenerator.Generator",
    $extends : ariaCoreJsObject,
    $singleton : true,
    $texts : {
        classTxtTplHandle : ariaExtFilesgeneratorTplClass,
        interfaceTxtTplHandle : ariaExtFilesgeneratorTplInterface,
        htmlTemplateTxtTplHandle : ariaExtFilesgeneratorTplHtmlTemplate,
        cssTemplateTxtTplHandle : ariaExtFilesgeneratorTplCssTemplate,
        templateScriptTxtTplHandle : ariaExtFilesgeneratorTplTemplateScript,
        macroLibraryTxtTplHandle : ariaExtFilesgeneratorTplMacroLibrary,
        cssLibraryTxtTplHandle : ariaExtFilesgeneratorTplCssLibrary,
        flowControllerTxtTplHandle : ariaExtFilesgeneratorTplFlowController,
        moduleControllerTxtTplHandle : ariaExtFilesgeneratorTplModuleController,
        moduleControllerInterfaceTxtTplHandle : ariaExtFilesgeneratorTplModuleControllerInterface,
        flowControllerInterfaceTxtTplHandle : ariaExtFilesgeneratorTplFlowControllerInterface,
        bootstrapTxtTplHandle : ariaExtFilesgeneratorTplBootstrap
    },
    $statics : {
        TYPE_CLASS : "class",
        TYPE_INTERFACE : "interface",
        TYPE_HTMLTEMPLATE : "htmlTemplate",
        TYPE_CSSTEMPLATE : "cssTemplate",
        TYPE_TEMPLATESCRIPT : "templateScript",
        TYPE_MACROLIBRARY : "macroLibrary",
        TYPE_CSSLIBRARY : "cssLibrary",
        TYPE_FLOWCONTROLLER : "flowController",
        TYPE_MODULECONTROLLER : "moduleController",
        TYPE_MODULECONTROLLERINTERFACE : "moduleControllerInterface",
        TYPE_FLOWCONTROLLERINTERFACE : "flowControllerInterface",
        TYPE_BOOTSTRAP : "bootstrap"
    },
    $constructor : function () {
        /**
         * Counter used to generate unique classpath
         * @private
         * @type Number
         */
        this.__classNameCounter = 0;
    },
    $prototype : {
        /**
         * Get a file skeleton string for any AT resource: class, interface, module, flow, ... This is the low-level
         * expert service that generate a single file, given a configuration bean that corresponds to all possible
         * configuration of that file. For simpler generation of templates and modules with or without script, css,
         * flows, etc ... please refer to the other public methods of this class.
         * @param {String} type Must be one of class, interface, htmltemplate, csstemplate, templatescript,
         * macrolibrary, flowcontroller, modulecontroller, texttemplate
         * @param {Object} cfg The optional configuration to be used to generate the file.
         * @return {Object} Unless the provided type is null or incorrect, in which case this method returns null, it
         * returns an object of the following format: {type: <typeString>, classpath: <classpathString>, content:
         * <contentString>}
         */
        generateFile : function (type, cfg) {
            if (type) {
                type = this.__isAllowedType("TYPE_" + type.toUpperCase());
                if (type) {
                    var skeletonData = this.__getSkeleton(this[type + "TxtTplHandle"], "aria.ext.filesgenerator.GeneratorBeans."
                            + type + "SkeletonTemplate", cfg);

                    return {
                        type : type,
                        classpath : skeletonData.cfg.$classpath,
                        content : skeletonData.content
                    };
                }
            }
            return null;
        },

        /**
         * Simple shortcut method that creates an HTML templates only given a classpath.
         * @param {Boolean} hasScript Will also generate a template script if set to true
         * @param {Boolean} hasCss Will also generate a CSS template if set to true
         * @param {String} content Will add an optional content to the template
         * @return {Array} An array of objects of the following format: {type: <typeString>, classpath:
         * <classpathString>, content: <contentString>} Even if only one file is generated, an array will be produced.
         */
        generateHtmlTemplate : function (classpath, hasScript, hasCss, content) {
            var skeletonArray = [];

            var tplCfg = {
                $classpath : classpath
            };

            if (hasScript) {
                // Naming convention for the template script
                var tplScriptClasspath = classpath + "Script";
                tplCfg.$hasScript = true;
                skeletonArray.push(this.generateFile(this.TYPE_TEMPLATESCRIPT, {
                    $classpath : tplScriptClasspath
                }));
            }
            if (hasCss) {
                // Naming convention for the CSS file name
                var cssClasspath = classpath + "Style";
                tplCfg.$css = [cssClasspath];
                skeletonArray.push(this.generateFile(this.TYPE_CSSTEMPLATE, {
                    $classpath : cssClasspath
                }));
            }
            if (content) {
                tplCfg.content = content;
            }

            skeletonArray.push(this.generateFile(this.TYPE_HTMLTEMPLATE, tplCfg));

            return skeletonArray;
        },

        /**
         * Simple shortcut method that creates a module controller only given its classpath.
         * @param {Boolean} hasFlow Will also generate a flow controller if set to true
         * @return {Array} An array of objects of the following format: {type: <typeString>, classpath:
         * <classpathString>, content: <contentString>} Even if only one file is generated, an array will be produced.
         */
        generateModuleCtrl : function (classpath, hasFlow) {
            var skeletonArray = [];

            // Naming convention for the public interface
            var index = classpath.lastIndexOf(".");
            var path = classpath.substring(0, index);
            var name = classpath.substring(index + 1);

            var iModuleCtrlClasspath = path + ".I" + name;
            skeletonArray.push(this.generateFile(this.TYPE_MODULECONTROLLERINTERFACE, {
                $classpath : iModuleCtrlClasspath,
                $description : classpath + " public interface definition"
            }));

            skeletonArray.push(this.generateFile(this.TYPE_MODULECONTROLLER, {
                $classpath : classpath,
                $description : "My module controller",
                $publicInterface : iModuleCtrlClasspath,
                $hasFlowCtrl : hasFlow
            }));

            if (hasFlow) {
                // Naming convention for the flow controller and its interface
                var iFlowCtrlClasspath = path + ".I" + name + "Flow";
                var flowCtrlClasspath = classpath + "Flow";

                skeletonArray.push(this.generateFile(this.TYPE_FLOWCONTROLLERINTERFACE, {
                    $classpath : iFlowCtrlClasspath,
                    $description : flowCtrlClasspath + " public interface definition"
                }));

                skeletonArray.push(this.generateFile(this.TYPE_FLOWCONTROLLER, {
                    $classpath : flowCtrlClasspath,
                    $publicInterface : iFlowCtrlClasspath,
                    $description : "My flow controller"
                }));
            }

            return skeletonArray;
        },

        /**
         * Returns a unique classpath in this package.
         * @param {String} packageName like "my.package"
         * @return {String} classpath
         */
        getUniqueClasspathIn : function (packageName) {
            return packageName + "." + "Class" + this.__classNameCounter++;
        },

        /**
         * Check if a type given as a string actually corresponds to one of the allowed types
         * @param {String} type The type to be checked
         * @return {Boolean} True if the given type is part of the list of allowed types
         * @private
         */
        __isAllowedType : function (type) {
            return ariaUtilsJson.getValue(this, type);
        },

        /**
         * Get the actual skeleton content given a text-template handle, the name of the bean to validate the given
         * config against
         * @param {Object} textTplHandle The handle to the text template object on which the processTextTemplate method
         * can be called
         * @param {String} beanName The name of the bean to normalze input data against
         * @param {Object} data The input data for the skeleton to be generated
         * @return {Object} An object containing 2 properties: 'cfg' being the normalized data and 'content' being the
         * text result
         * @private
         */
        __getSkeleton : function (textTplHandle, beanName, cfg) {
            if (!cfg) {
                cfg = {};
            }
            ariaCoreJsonValidator.normalize({
                json : cfg,
                beanName : beanName
            });
            return {
                cfg : cfg,
                content : textTplHandle.processTextTemplate(cfg)
            };
        }
    }
});
