import React from 'react'
import {AppLayout} from "./AppLayout.tsx";
import {MantineProvider} from "@mantine/core";
import {Notifications} from "@mantine/notifications";
import {theme} from "@/theme/theme.ts";

import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import '@xyflow/react/dist/style.css';

/**
 * The main application part. It wraps the entire application with the MantineProvider and the Notifications.
 *
 * @constructor
 */
export const App: React.FC = () => {

    return (
        <MantineProvider theme={theme}>
            <Notifications/>
            <AppLayout/>
        </MantineProvider>
    )

}

export default App
