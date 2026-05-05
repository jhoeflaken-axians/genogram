import React from "react";
import {ActionIcon, Divider, Group, Tooltip} from "@mantine/core";
import {
    IconArrowBackUp, IconArrowForwardUp, IconArrowsHorizontal, IconArrowsVertical,
    IconDeviceFloppy, IconLayout,
    IconLayoutAlignBottom,
    IconLayoutAlignLeft, IconLayoutAlignRight, IconLayoutAlignTop,
    IconPrinter, IconSitemap,
} from "@tabler/icons-react";

import diagramClasses from '../diagram.module.css';
import {Canvas} from "@/features/diagram";

/**
 * The GenogramDiagram component provides a diagram interface for visualizing family relationships. It includes a
 * toolbar with actions for saving, printing, auto-layout, lineage highlighting, undo/redo, and alignment/distribution
 * of selected nodes. The diagram area is where the genogram will be displayed and edited.
 *
 * @constructor
 */
export const GenogramDiagram: React.FC = () => {

    const [selectedNodeIds, setSelectedNodeIds] = React.useState<string[]>([]);
    const [highlightLineage, setHighlightLineage] = React.useState(false);

    return (
        <div className={diagramClasses.diagramMain}>
            <Group justify="flex-start" className={diagramClasses.diagramToolbar} gap={4}>
                <Tooltip label="Save">
                    <ActionIcon variant="subtle" aria-label="Save">
                        <IconDeviceFloppy size={18} />
                    </ActionIcon>
                </Tooltip>
                <Tooltip label="Print">
                    <ActionIcon variant="subtle" aria-label="Print">
                        <IconPrinter size={18} />
                    </ActionIcon>
                </Tooltip>
                <Divider orientation="vertical" mx={4} />
                <Tooltip label="Auto Layout">
                    <ActionIcon variant="subtle" aria-label="Auto Layout">
                        <IconLayout size={18} />
                    </ActionIcon>
                </Tooltip>
                <Tooltip label="Highlight Lineage (toggle)">
                    <ActionIcon
                        variant={highlightLineage ? 'filled' : 'subtle'}
                        aria-label="Highlight Lineage"
                    >
                        <IconSitemap size={18} />
                    </ActionIcon>
                </Tooltip>
                <Divider orientation="vertical" mx={4} />
                <Tooltip label="Undo (Ctrl+Z)">
                    <ActionIcon variant="subtle" aria-label="Undo">
                        <IconArrowBackUp size={18} />
                    </ActionIcon>
                </Tooltip>
                <Tooltip label="Redo (Ctrl+Y)">
                    <ActionIcon variant="subtle" aria-label="Redo">
                        <IconArrowForwardUp size={18} />
                    </ActionIcon>
                </Tooltip>
                <Divider orientation="vertical" mx={4} />
                <Tooltip label="Align left">
                    <ActionIcon variant="subtle" aria-label="Align left" disabled={selectedNodeIds.length < 2}>
                        <IconLayoutAlignLeft size={18} />
                    </ActionIcon>
                </Tooltip>
                <Tooltip label="Align top">
                    <ActionIcon variant="subtle" aria-label="Align top" disabled={selectedNodeIds.length < 2}>
                        <IconLayoutAlignTop size={18} />
                    </ActionIcon>
                </Tooltip>
                <Tooltip label="Align bottom">
                    <ActionIcon variant="subtle" aria-label="Align bottom" disabled={selectedNodeIds.length < 2}>
                        <IconLayoutAlignBottom size={18} />
                    </ActionIcon>
                </Tooltip>
                <Tooltip label="Align right">
                    <ActionIcon variant="subtle" aria-label="Align right" disabled={selectedNodeIds.length < 2}>
                        <IconLayoutAlignRight size={18} />
                    </ActionIcon>
                </Tooltip>
                <Tooltip label="Distribute horizontally">
                    <ActionIcon variant="subtle" aria-label="Distribute horizontally" disabled={selectedNodeIds.length < 3}>
                        <IconArrowsHorizontal size={18} />
                    </ActionIcon>
                </Tooltip>
                <Tooltip label="Distribute vertically">
                    <ActionIcon variant="subtle" aria-label="Distribute vertically" disabled={selectedNodeIds.length < 3}>
                        <IconArrowsVertical size={18} />
                    </ActionIcon>
                </Tooltip>
            </Group>

            <Canvas />
        </div>
    )
}
