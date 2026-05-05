import React from 'react';
import {Background, Controls, MiniMap, ReactFlow} from "@xyflow/react";

import diagramClasses from '../diagram.module.css';

/**
 * The canvas where the genogram is drawn.
 *
 * @constructor
 */
export const Canvas: React.FC = () => {

    return (
        <div className={diagramClasses.flowWrapper}>
            <ReactFlow
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
