import React from "react";
import type {Person} from "@/core/domain/genogram.ts";
import type {Node, NodeProps} from '@xyflow/react';

import nodeClasses from './nodes.module.css';

type PersonNode = Node<Person, "person" | "pregnancy" | "loss" | "pet">;

export const PersonNode: React.FC<NodeProps<PersonNode>> = () => {

    return (
        <div className={nodeClasses.card}>
        </div>
    )

}
