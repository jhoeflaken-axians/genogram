import type {Node} from "@xyflow/react";
import type {GenogramSymbolType, Person} from "@/core/domain/genogram.ts";

export type NodeType = "person" | "pregnancy" | "loss" | "pet";

export const SYMBOL_NODE_TYPE_MAP = {
    male: "person",
    female: "person",
    unknown: "person",
    pregnancy: "pregnancy",
    stillbirth: "loss",
    miscarriage: "loss",
    abortion: "loss",
    pet: "pet"
} as const satisfies Record<GenogramSymbolType, NodeType>;

type SymbolNodeTypeMap = typeof SYMBOL_NODE_TYPE_MAP;

export type NodeTypeForSymbol<S extends GenogramSymbolType> = SymbolNodeTypeMap[S];
export type GenogramNodeData<S extends GenogramSymbolType = GenogramSymbolType> = Person & { symbol: S };

/**
 * The base type for all genogram types.
 */
type BaseNode = {
    type: NodeType;
}

export type GenogramNodeBySymbol<S extends GenogramSymbolType> = S extends GenogramSymbolType
    ? BaseNode & Node<GenogramNodeData<S>, NodeTypeForSymbol<S>> & {
        type: NodeTypeForSymbol<S>;
    }
    : never;

export type PersonNode = GenogramNodeBySymbol<'male' | 'female' | 'unknown'>;

/**
 * Union of all supported genogram node variants.
 */
export type GenogramNode = GenogramNodeBySymbol<GenogramSymbolType>;
