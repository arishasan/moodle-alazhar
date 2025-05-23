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

import { Injector, NgModule } from '@angular/core';
import { ROUTES, Routes } from '@angular/router';

import { buildTabMainRoutes } from '@features/mainmenu/mainmenu-tab-routing.module';
import { ADDON_CALENDAR_PAGE_NAME } from './constants';
import { canLeaveGuard } from '@guards/can-leave';

/**
 * Build module routes.
 *
 * @param injector Injector.
 * @returns Routes.
 */
function buildRoutes(injector: Injector): Routes {
    return [
        {
            path: 'index',
            data: { mainMenuTabRoot: ADDON_CALENDAR_PAGE_NAME },
            loadComponent: () => import('@addons/calendar/pages/index'),
        },
        {
            path: 'calendar-settings',
            loadComponent: () => import('@addons/calendar/pages/settings/settings'),
        },
        {
            path: 'day',
            loadComponent: () => import('@addons/calendar/pages/day/day'),
        },
        {
            path: 'event/:id',
            loadComponent: () => import('@addons/calendar/pages/event/event'),
        },
        {
            path: 'edit/:eventId',
            loadComponent: () => import('@addons/calendar/pages/edit-event/edit-event'),
            canDeactivate: [canLeaveGuard],
        },
        ...buildTabMainRoutes(injector, {
            redirectTo: 'index',
            pathMatch: 'full',
        }),
    ];
}

@NgModule({
    providers: [
        {
            provide: ROUTES,
            multi: true,
            deps: [Injector],
            useFactory: buildRoutes,
        },
    ],
})
export default class AddonCalendarLazyModule {}
