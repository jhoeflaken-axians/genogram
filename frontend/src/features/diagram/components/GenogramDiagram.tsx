import React from "react";
import type { DragEvent } from 'react';
import {Canvas} from "@/features/diagram";

import diagramClasses from '../diagram.module.css';
import {Toolbar} from "@/features/diagram/components/Toolbar.tsx";
import {SYMBOL_DEFINITIONS} from "@/core/domain/genogram-symbols.ts";
import type {GenogramSymbolType} from "@/core/domain/genogram.ts";
import {type Edge, type ReactFlowInstance, useEdgesState, useNodesState} from "@xyflow/react";
import type {GenogramEdge} from "../types/edges.tsx";
import type {GenogramMode, GenogramNode} from "../types/nodes.tsx";
/**
 * The GenogramDiagram component provides a diagram interface for visualizing family relationships. It includes a
 * toolbar with actions for saving, printing, auto-layout, lineage highlighting, undo/redo, and alignment/distribution
 * of selected nodes. The diagram area is where the genogram will be displayed and edited.
 *
 * @constructor
 */
export const GenogramDiagram: React.FC = () => {

    const [reactFlowInstance, setReactFlowInstance] = React.useState<ReactFlowInstance<GenogramMode, Edge<GenogramEdge>> | null>(null);
    const [nodes, setNodes, onNodesChangeOriginal] = useNodesState<GenogramNode>([]);
    const [edges, setEdges, onEdgesChangeOriginal] = useEdgesState<Edge<GenogramEdge>>([]);


    const [selectedNodeIds, setSelectedNodeIds] = React.useState<string[]>([]);
    const [highlightLineage, setHighlightLineage] = React.useState(false);

    /**
     * Handles the drop event on the diagram area. It creates a new node with the symbol type and position of the
     * drop.
     */
    const handleDrop = React.useCallback((event: DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        if (!reactFlowInstance) return;

        const symbolType: string = event.dataTransfer.getData('application/genogram-symbol');
        const isKnownSymbol = SYMBOL_DEFINITIONS.some(symbol => symbol.type === symbolType);
        if (!isKnownSymbol) return;

        const position = reactFlowInstance.screenToFlowPosition({
            x: event.clientX,
            y: event.clientY
        });

        const node = createNewNode(symbolType, position);
        setNodes((prev) => [...prev, node]);
    }, []);

    return (
        <div className={diagramClasses.diagramMain}>
            <Toolbar selectedNodes={selectedNodeIds} highlightLineage={highlightLineage}/>
            <Canvas />
        </div>
    )
}
