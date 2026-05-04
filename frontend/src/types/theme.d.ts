import '@mantine/core';

/**
 * Extends the Mantine theme with custom properties, for type safety.
 */
declare module '@mantine/core' {
    export interface MantineThemeOther {
        layout: {
            headerHeight: number;
            navbarWidth: number;
            asideCollapsedWidth: number;
            asideDefaultWidth: number;
            asideMaxWidth: number;
        };
    }
}

export {};
