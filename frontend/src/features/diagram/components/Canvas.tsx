import React from 'react';
import type {DragEvent} from 'react';
import {Background, Controls, MiniMap, ReactFlow, type ReactFlowInstance} from "@xyflow/react";

import diagramClasses from '../diagram.module.css';
import type {GenogramNode} from "@/features/diagram/types/nodes.ts";
import type {GenogramEdge} from "@/features/diagram/types/edges.tsx";
import {PersonNode} from "@/features/diagram/nodes/PersonNode.tsx";

const nodeTypes = {
    person: PersonNode,
    pregnancy: PersonNode,
    loss: PersonNode,
    pet: PersonNode
};

interface CanvasProps {
    nodes: GenogramNode[];
    edges: GenogramEdge[];
    onInit?: (instance: ReactFlowInstance<GenogramNode, GenogramEdge>) => void;
    onDrop?: (event: DragEvent<HTMLDivElement>) => void;
    onDragOver?: (event: DragEvent<HTMLDivElement>) => void;
}

/**
 * The canvas where the genogram is drawn.
 *
 * @constructor
 */
export const Canvas: React.FC<CanvasProps> = ({nodes, edges, onInit, onDrop, onDragOver}) => {

    return (
        <div className={diagramClasses.flowWrapper}>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                nodeTypes={nodeTypes}
                onInit={onInit}
                onDrop={onDrop}
                onDragOver={onDragOver}
                fitView
                elementsSelectable
            >
                <MiniMap />
                <Controls />
                <Background />
            </ReactFlow>
        </div>
    )

}
