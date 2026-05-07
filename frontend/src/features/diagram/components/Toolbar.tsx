import React from "react";
import {ActionIcon, Divider, Group, Tooltip} from "@mantine/core";
import {
    IconArrowBackUp,
    IconArrowForwardUp,
    IconArrowsHorizontal,
    IconArrowsVertical,
    IconDeviceFloppy,
    IconLayout,
    IconLayoutAlignBottom,
    IconLayoutAlignLeft,
    IconLayoutAlignRight,
    IconLayoutAlignTop,
    IconPrinter,
    IconSitemap
} from "@tabler/icons-react";

import diagramClasses from '../diagram.module.css';

interface ToolbarProps {
    selectedNodes: string[];
    highlightLineage: boolean;
}

/**
 * The diagram toolbar
 * @param selectedNodes The nodes selected in the diagram.
 * @param highlightLineage Whether to highlight the lineage of the selected node. This is a toggle state that can be
 * turned on or off by the user.
 * @constructor
 */
export const Toolbar: React.FC<ToolbarProps> = ({selectedNodes, highlightLineage}) => {

    return (
        <Group justify="flex-start" className={diagramClasses.diagramToolbar} gap={4}>
            <Tooltip label="Save">
                <ActionIcon variant="subtle" aria-label="Save">
                    <IconDeviceFloppy size={18}/>
                </ActionIcon>
            </Tooltip>
            <Tooltip label="Print">
                <ActionIcon variant="subtle" aria-label="Print">
                    <IconPrinter size={18}/>
                </ActionIcon>
            </Tooltip>
            <Divider orientation="vertical" mx={4}/>
            <Tooltip label="Auto Layout">
                <ActionIcon variant="subtle" aria-label="Auto Layout">
                    <IconLayout size={18}/>
                </ActionIcon>
            </Tooltip>
            <Tooltip label="Highlight Lineage (toggle)">
                <ActionIcon
                    variant={highlightLineage ? 'filled' : 'subtle'}
                    aria-label="Highlight Lineage"
                >
                    <IconSitemap size={18}/>
                </ActionIcon>
            </Tooltip>
            <Divider orientation="vertical" mx={4}/>
            <Tooltip label="Undo (Ctrl+Z)">
                <ActionIcon variant="subtle" aria-label="Undo">
                    <IconArrowBackUp size={18}/>
                </ActionIcon>
            </Tooltip>
            <Tooltip label="Redo (Ctrl+Y)">
                <ActionIcon variant="subtle" aria-label="Redo">
                    <IconArrowForwardUp size={18}/>
                </ActionIcon>
            </Tooltip>
            <Divider orientation="vertical" mx={4}/>
            <Tooltip label="Align left">
                <ActionIcon variant="subtle" aria-label="Align left" disabled={selectedNodes.length < 2}>
                    <IconLayoutAlignLeft size={18}/>
                </ActionIcon>
            </Tooltip>
            <Tooltip label="Align top">
                <ActionIcon variant="subtle" aria-label="Align top" disabled={selectedNodes.length < 2}>
                    <IconLayoutAlignTop size={18}/>
                </ActionIcon>
            </Tooltip>
            <Tooltip label="Align bottom">
                <ActionIcon variant="subtle" aria-label="Align bottom" disabled={selectedNodes.length < 2}>
                    <IconLayoutAlignBottom size={18}/>
                </ActionIcon>
            </Tooltip>
            <Tooltip label="Align right">
                <ActionIcon variant="subtle" aria-label="Align right" disabled={selectedNodes.length < 2}>
                    <IconLayoutAlignRight size={18}/>
                </ActionIcon>
            </Tooltip>
            <Tooltip label="Distribute horizontally">
                <ActionIcon variant="subtle" aria-label="Distribute horizontally" disabled={selectedNodes.length < 3}>
                    <IconArrowsHorizontal size={18}/>
                </ActionIcon>
            </Tooltip>
            <Tooltip label="Distribute vertically">
                <ActionIcon variant="subtle" aria-label="Distribute vertically" disabled={selectedNodes.length < 3}>
                    <IconArrowsVertical size={18}/>
                </ActionIcon>
            </Tooltip>
        </Group>
    )

}
