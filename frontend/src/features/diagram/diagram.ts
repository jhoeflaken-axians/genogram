import type {GenogramSymbolType} from "@/core/domain/genogram.ts";
import {symbolToSex} from "@/core/domain/genogram-symbols.ts";
import type {XYPosition} from "@xyflow/react";
import { v4 as uuid } from 'uuid';
import {SYMBOL_NODE_TYPE_MAP, type GenogramNodeBySymbol, type NodeTypeForSymbol} from "@/features/diagram/types/nodes.ts";

type NodeFactory<S extends GenogramSymbolType> = (position: XYPosition) => GenogramNodeBySymbol<S>;

export const createNodeFactory = <S extends GenogramSymbolType>(symbol: S): NodeFactory<S> => {
    return (position: XYPosition) => {
        const id = uuid();
        const type = SYMBOL_NODE_TYPE_MAP[symbol] as NodeTypeForSymbol<S>;

        return {
            id,
            type,
            position,
            data: {
                uid: id,
                callSign: '',
                sex: symbolToSex(symbol),
                symbol,
                deceased: false
            }
        } as GenogramNodeBySymbol<S>;
    };
};

export const createNewNode = <S extends GenogramSymbolType>(symbol: S, position: XYPosition): GenogramNodeBySymbol<S> => {
    return createNodeFactory(symbol)(position);
};