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
var Aria = require("../Aria");
var robotClasspath = require("./$RobotSelection").getRobotClasspath();

/**
 * This class is still experimental, its interface may change without notice. This class gives access to a robot
 * implementation, allowing to send low-level mouse and keyboard events to a web page.
 * @private
 */
module.exports = Aria.classDefinition({
    $classpath : 'aria.jsunit.Robot',
    $singleton : true,
    $statics : {
        ROBOT_UNAVAILABLE : "There is no usable implementation of the robot.",

        BUTTON1_MASK : 16,
        BUTTON2_MASK : 8,
        BUTTON3_MASK : 4
    },
    $constructor : function () {
        /**
         * Robot implementation.
         * @type aria.jsunit.IRobot
         */
        this.robot = null;
    },
    $prototype : {

        /**
         * Returns the classpath of the robot implementation to use.
         * @return {String}
         */
        getRobotClasspath : function () {
            return robotClasspath;
        },

        /**
         * Returns true if the robot is most likely usable (the PhantomJS robot is available or Java is enabled).
         * @return {Boolean} true if an implementation of the robot is most likely usable.
         */
        isUsable : function () {
            return !!this.getRobotClasspath();
        },

        /**
         * Initializes the robot.
         * @param {aria.core.CfgBeans:Callback} callback callback to be called when the robot is ready to be used.
         */
        initRobot : function (cb) {
            if (this.robot) {
                this.robot.initRobot(cb);
            } else {
                if (!robotClasspath) {
                    this.$logError(this.ROBOT_UNAVAILABLE);
                    return;
                }
                Aria.load({
                    classes : [robotClasspath],
                    oncomplete : {
                        fn : this._robotLoaded,
                        scope : this,
                        args : {
                            cb : cb
                        }
                    }
                });
            }
        },

        /**
         * Called when the robot implementation has been loaded with Aria.load.
         * @param {Object} args contains the robotClasspath and cb properties.
         */
        _robotLoaded : function (args) {
            if (!this.robot) {
                this.robot = Aria.getClassRef(robotClasspath).$interface("aria.jsunit.IRobot");
            }
            this.robot.initRobot(args.cb);
        }
    }
});
