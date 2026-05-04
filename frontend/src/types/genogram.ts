import type { Edge, Node } from '@xyflow/react';

export type Sex = 'male' | 'female' | 'unknown';
export type PersonSymbol = 'male' | 'female' | 'unknown' | 'pregnancy' | 'stillbirth' | 'miscarriage' | 'abortion' | 'pet';
export type RelationType = 'partner' | 'divorce' | 'parent-child' | 'adoption';

export type PersonNodeData = {
    uid?: string;
    name: string;
    firstName?: string;
    lastName?: string;
    sex: Sex;
    symbol: PersonSymbol;
    birthDate?: string;
    deathDate?: string;
    deceased: boolean;
    notes?: string;
    isAnchor?: boolean;
};

export type RelationEdgeData = {
    relation: RelationType;
    anchor?: number; // 0.0 to 1.0 along the horizontal line
};

export type PersonNode = Node<PersonNodeData, 'person'>;
export type RelationEdge = Edge<RelationEdgeData>;
export type PersonFlowNode = PersonNode;

export type Diagram = {
    id: string;
    name: string;
    nodes: PersonNode[];
    edges: RelationEdge[];
    updatedAt?: string;
};

export type SelectedElement =
    | { type: 'node', data: Node<PersonNode> }
    | { type: 'edge', data: Node<RelationEdge> }
    | null;

export type UpdateNodeFn = (id: string, newData: Partial<PersonNodeData>) => Promise<void>;
export type UpdateEdgeFn = (id: string, newData: Partial<RelationEdgeData>) => Promise<void>;
