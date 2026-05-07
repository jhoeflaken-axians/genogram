import type {Node} from "@xyflow/react";
import type {Person} from "@/core/domain/genogram.ts";

export type NodeType = "person";

/**
 * The base type for all genogram types.
 */
type BaseNode = {
    type: NodeType;
}

/**
 * The node for person.
 */
export type PersonNode = BaseNode & Node<Person, "person"> & {
    type: "person";
}

/**
 * The base type for all genogram types.
 */
export type GenogramNode = PersonNode;
