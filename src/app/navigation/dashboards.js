import DashboardsIcon from 'assets/dualicons/dashboards.svg?react'
import StethoscopeIcon from 'assets/nav-icons/stethoscope.svg?react'

import { NAV_TYPE_ROOT, NAV_TYPE_ITEM } from 'constants/app.constant'

const ROOT_DASHBOARDS = '/dashboards'

const path = (root, item) => `${root}${item}`;

export const dashboards = {
    id: 'dashboards',
    type: NAV_TYPE_ROOT,
    path: '/dashboards',
    title: 'Dashboards',
    transKey: 'nav.dashboards.dashboards',
    Icon: DashboardsIcon,
    childs: [
        {
            id: 'dashboards.doctor',
            path: path(ROOT_DASHBOARDS, '/doctor'),
            type: NAV_TYPE_ITEM,
            title: 'Doctor',
            transKey: 'nav.dashboards.doctor',
            Icon: StethoscopeIcon,
        },
    ]
}
