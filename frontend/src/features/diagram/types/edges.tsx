
export type GenogramEdgeType = 'lineage | relational';
export type LineageRelationType = 'partner' | 'divorce' | 'parent-child' | 'adoption';

/**
 * The base type for all genogram types.
 */
export type GenogramEdge = {
    type: GenogramEdgeType;
};

/**
 * The edge for lineage relationships.
 */
export type LineageEdge = GenogramEdge & {
    type: 'lineage';
    relation: LineageRelationType;
    anchorPositionPercentage: number;
}

/**
 * The edge for relational relationships.
 */
export type RelationalEdge = GenogramEdge & {
    type: 'lineage';
}
