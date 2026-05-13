import React from "react";
import type { DragEvent } from 'react';
import {Canvas} from "@/features/diagram";

import diagramClasses from '../diagram.module.css';
import {Toolbar} from "@/features/diagram/components/Toolbar.tsx";
import {SYMBOL_DEFINITIONS} from "@/core/domain/genogram-symbols.ts";
import {type ReactFlowInstance, useEdgesState, useNodesState} from "@xyflow/react";
import type {GenogramEdge} from "../types/edges.tsx";
import type {GenogramNode} from "../types/nodes.ts";
import {createNewNode} from "@/features/diagram/diagram.ts";
import type {GenogramSymbolType} from "@/core/domain/genogram.ts";
/**
 * The GenogramDiagram component provides a diagram interface for visualizing family relationships. It includes a
 * toolbar with actions for saving, printing, auto-layout, lineage highlighting, undo/redo, and alignment/distribution
 * of selected nodes. The diagram area is where the genogram will be displayed and edited.
 *
 * @constructor
 */
export const GenogramDiagram: React.FC = () => {

    const [reactFlowInstance, setReactFlowInstance] = React.useState<ReactFlowInstance<GenogramNode, GenogramEdge> | null>(null);
    const [nodes, setNodes] = useNodesState<GenogramNode>([]);
    const [edges] = useEdgesState<GenogramEdge>([]);


    const [selectedNodeIds] = React.useState<string[]>([]);
    const [highlightLineage] = React.useState(false);

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

        const node = createNewNode(symbolType as GenogramSymbolType, position);
        setNodes((prev) => [...prev, node]);
    }, [reactFlowInstance, setNodes]);

    const handleDragOver = React.useCallback((event: DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'copy';
    }, []);

    return (
        <div className={diagramClasses.diagramMain}>
            <Toolbar selectedNodes={selectedNodeIds} highlightLineage={highlightLineage}/>
            <Canvas
                nodes={nodes}
                edges={edges}
                onInit={setReactFlowInstance}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
            />
        </div>
    )
}
