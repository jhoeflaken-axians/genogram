import {createTheme} from "@mantine/core";

/**
 * Custom theme for the application.
 */
export const theme = createTheme({
    other: {
        layout: {
            headerHeight: 48,
            navbarWidth: 210,
            asideCollapsedWidth: 0,
            asideDefaultWidth: 340,
            asideMaxWidth: 400,
        }
    }
});
