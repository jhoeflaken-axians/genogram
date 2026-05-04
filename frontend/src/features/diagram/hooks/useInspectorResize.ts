import React from "react";
import {useMantineTheme} from "@mantine/core";

/**
 * Custom hook to manage the resizing of the {@link Inspector} panel. It provides the current width of the panel,
 * whether it is collapsed, and functions to set the width and toggle the collapsed state.
 *
 * @Constructor
 * @returns An object containing the width, collapsed state, and functions to set the width and toggle the collapsed
 * state.
 */
export const useInspectorResize = () => {
    const theme = useMantineTheme();

    const {
        asideDefaultWidth,
        asideCollapsedWidth,
        asideMaxWidth,
    } = theme.other.layout;

    const [width, setWidth] = React.useState(asideDefaultWidth);
    const [collapsed, setCollapsed] = React.useState(false);

    /**
     * Initialize width with the default value from the theme.
     */
    React.useEffect(() => {
        setWidth(asideDefaultWidth);
    }, [asideDefaultWidth])

    /**
     * Set the width of the detail panel.
     * @param width The new width of the panel.
     */
    const setPanelWidth = (width: number) => {
        const newWidth = Math.min(Math.max(asideCollapsedWidth, width), asideMaxWidth);
        setWidth(newWidth);
    }

    /**
     * Toggle the collapsed state of the detail panel.
     */
    const toggle = () => {
        setCollapsed((prevState) => !prevState);
    }

    return {
        width: collapsed ? asideCollapsedWidth : width,
        collapsed,
        setWidth: setPanelWidth,
        toggle,
    };

}
