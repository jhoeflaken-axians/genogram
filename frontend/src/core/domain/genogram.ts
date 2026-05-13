import type { Edge, Node } from '@xyflow/react';
import type {GenogramNode} from "@/features/diagram/types/nodes.ts";
import type {GenogramEdge} from "@/features/diagram/types/edges.tsx";

/**
 * Defines the types of sexes in the genogram.
 */
export type SexType = 'male' | 'female' | 'unknown';

/**
 * Defines the types of symbols in the genogram.
 */
export type GenogramSymbolType = 'male' | 'female' | 'unknown' | 'pregnancy' | 'stillbirth' | 'miscarriage' | 'abortion' | 'pet';

/**
 * Defines the types of relations in the genogram.
 */
export type GenogramRelationType = 'partner' | 'divorce' | 'parent-child' | 'adoption';

/**
 * Represents a person in the genogram.
 */
export type Person = {
    uid?: string;
    callSign: string;
    officialNames?: string;
    lastName?: string;
    sex: SexType;
    symbol: GenogramSymbolType;
    birthDate?: string;
    deathDate?: string;
    deceased: boolean;
    notes?: string;
    isAnchor?: boolean;
};

/**
 * Represents a relation in the genogram.
 */
export type Relation = {
    relation: GenogramRelationType;
    anchor?: number; // 0.0 to 1.0 along the horizontal line
};



/**
 * Represents a relation edge in the genogram.
 */
export type RelationEdge = Edge<Relation>;


/**
 * Represents a genogram diagram.
 */
export type Diagram<TNode extends Node = GenogramNode, TEdge extends Edge = GenogramEdge> = {
    id: string;
    title: string;
    nodes: TNode[];
    edges: TEdge[];
    updatedAt?: string;
};

/**
 * Represents the selected element in the genogram.
 */
export type SelectedElement<TNode extends Node = GenogramNode, TEdge extends Edge = GenogramEdge> =
    | { type: 'node', data: TNode }
    | { type: 'edge', data: TEdge }
    | null;

/**
 * Represents a function that updates a node in the genogram.
 *
 * @param id The ID of the node to update.
 * @param newData The new data for the node.
 * @returns A promise that resolves when the update is complete.
 */
export type UpdateNodeFn = (id: string, newData: Partial<Person>) => Promise<void>;

/**
 * Represents a function that updates an edge in the genogram.
 *
 * @param id The ID of the edge to update.
 * @param newData The new data for the edge.
 * @returns A promise that resolves when the update is complete.
 */
export type UpdateEdgeFn = (id: string, newData: Partial<Relation>) => Promise<void>;
