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
/**
 * DO NOT FORMAT
 * Aria resource object for dates et-EE (Estonian)
 */
Aria.resourcesDefinition({
    $classpath : 'aria.resources.DateRes',
    $resources : {
        day : [
            "pühapäev",
            "esmaspäev",
            "teisipäev",
            "kolmapäev",
            "neljapäev",
            "reede",
            "laupäev"
        ],
        // a false value for the following items mean: use substring
        // to generate the short versions of days or months
        dayShort : false,
        monthShort : [
            "jaan",
            "veebr",
            "märts",
            "apr",
            "mai",
            "juuni",
            "juuli",
            "aug",
            "sept",
            "okt",
            "nov",
            "dets"],
        month : [
            "jaanuar",
            "veebruar",
            "märts",
            "aprill",
            "mai",
            "juuni",
            "juuli",
            "august",
            "september",
            "oktoober",
            "november",
            "detsember"
        ]
    }
});
