// (C) Copyright 2015 Moodle Pty Ltd.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import { Injectable } from '@angular/core';
import { CorePluginFileHandler } from '@services/plugin-file-delegate';
import { makeSingleton } from '@singletons';

/**
 * Handler to treat links to IMSCP.
 */
@Injectable( { providedIn: 'root' })
export class AddonModImscpPluginFileHandlerService implements CorePluginFileHandler {

    name = 'AddonModImscpPluginFileHandler';
    component = 'mod_imscp';

    /**
     * @inheritdoc
     */
    getComponentRevisionRegExp(args: string[]): RegExp | undefined {
        // Check filearea.
        if (args[2] == 'content') {
            // Component + Filearea + Revision
            return new RegExp('/mod_imscp/content/([0-9]+)/');
        }

        if (args[2] == 'backup') {
            // Component + Filearea + Revision
            return new RegExp('/mod_imscp/backup/([0-9]+)/');
        }

        return;
    }

    /**
     * @inheritdoc
     */
    getComponentRevisionReplace(args: string[]): string {
        // Component + Filearea + Revision
        return `/mod_imscp/${args[2]}/0/`;
    }

    /**
     * @inheritdoc
     */
    async isEnabled(): Promise<boolean> {
        return true;
    }

}
export const AddonModImscpPluginFileHandler = makeSingleton(AddonModImscpPluginFileHandlerService);
