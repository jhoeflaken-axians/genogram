import React from 'react';
import {AppShell, useMantineTheme} from "@mantine/core";
import {AppHeader} from "@/features/app-shell";
import {Canvas, Inspector, Palette} from "@/features/diagram";

import appClasses from './App.module.css';

/**
 * The main layout of the app. The application has:
 *
 * - a header with the title, main menu, language, login, and settings.
 * - a fixed width navbar at the left with the palette that holds all Genogram symbols.
 * - a main area where the genogram is displayed and edited, with a toolbar with additional tools.
 * - a collapsable/expandable/resizeable side area, which shows the information of the selected person of relation.
 * @constructor
 */
export const AppLayout: React.FC = () => {
    const theme = useMantineTheme();

    return (
        <React.Fragment>
            <AppShell
                header={{ height: theme.other.layout.headerHeight }}
                navbar={{ width: theme.other.layout.navbarWidth, breakpoint: 'sm' }}
                aside={{ width: theme.other.layout.asideDefaultWidth, breakpoint: 'sm' }}
                padding={0}
                className={appClasses.shell}
            >
                <AppShell.Header p="sm" className={appClasses.header}>
                    <AppHeader />
                </AppShell.Header>

                <AppShell.Navbar>
                    <Palette />
                </AppShell.Navbar>

                <AppShell.Main>
                    <Canvas />
                </AppShell.Main>

                <AppShell.Aside className={appClasses.aside}>
                    <Inspector />
                </AppShell.Aside>
            </AppShell>
        </React.Fragment>
    )

}
