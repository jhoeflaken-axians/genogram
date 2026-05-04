import type { Edge, Node } from '@xyflow/react';

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
 * Represents a person node in the genogram.
 */
export type PersonNode = Node<Person, 'person'>;

/**
 * Represents a relation edge in the genogram.
 */
export type RelationEdge = Edge<Relation>;


/**
 * Represents a genogram diagram.
 */
export type Diagram = {
    id: string;
    title: string;
    nodes: PersonNode[];
    edges: RelationEdge[];
    updatedAt?: string;
};

/**
 * Represents the selected element in the genogram.
 */
export type SelectedElement =
    | { type: 'node', data: Node<PersonNode> }
    | { type: 'edge', data: Node<RelationEdge> }
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
