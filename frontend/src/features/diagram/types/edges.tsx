import type {Edge} from "@xyflow/react";
import type {GenogramRelationType} from "@/core/domain/genogram.ts";

export type GenogramEdgeType = 'lineage' | 'relational';

/**
 * Relation kinds grouped by edge rendering type.
 */
export type LineageRelationType = Extract<GenogramRelationType, 'parent-child' | 'adoption'>;
export type RelationalRelationType = Extract<GenogramRelationType, 'partner' | 'divorce'>;

export const RELATION_EDGE_TYPE_MAP = {
    partner: 'relational',
    divorce: 'relational',
    'parent-child': 'lineage',
    adoption: 'lineage'
} as const satisfies Record<GenogramRelationType, GenogramEdgeType>;

type RelationEdgeTypeMap = typeof RELATION_EDGE_TYPE_MAP;

export type EdgeTypeForRelation<R extends GenogramRelationType> = RelationEdgeTypeMap[R];

export type GenogramEdgeDataByType = {
    lineage: {
        relation: LineageRelationType;
        anchorPositionPercentage: number;
    };
    relational: {
        relation: RelationalRelationType;
    };
};

/**
 * Edge variant for a specific edge rendering type.
 */
export type GenogramEdgeByType<T extends GenogramEdgeType> = Edge<GenogramEdgeDataByType[T], T> & {
    type: T;
};

/**
 * Edge variant for a specific relation kind.
 */
export type GenogramEdgeByRelation<R extends GenogramRelationType> = GenogramEdgeByType<EdgeTypeForRelation<R>> & {
    data: GenogramEdgeDataByType[EdgeTypeForRelation<R>] & { relation: R };
};

export type LineageEdge = GenogramEdgeByType<'lineage'>;

/**
 * Union of all supported genogram edges.
 */
export type RelationalEdge = GenogramEdgeByType<'relational'>;
export type GenogramEdge = LineageEdge | RelationalEdge;
