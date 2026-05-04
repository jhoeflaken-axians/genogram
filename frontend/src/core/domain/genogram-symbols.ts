import type {GenogramSymbolType, SexType} from "@/core/domain/genogram.ts";

/**
 * The definition of a genogram symbol.
 */
export type SymbolDefinition = {
    symbol: GenogramSymbolType;
    label: string;
    sex: SexType;
};

/**
 * The definitions of all genogram symbols.
 */
export const SYMBOL_DEFINITIONS: SymbolDefinition[] = [
    { symbol: 'male', label: 'Male',  sex: 'male' },
    { symbol: 'female', label: 'Female',  sex: 'female' },
    { symbol: 'unknown', label: 'Unknown Sex', sex: 'unknown' },
    { symbol: 'pregnancy', label: 'Pregnancy', sex: 'female' },
    { symbol: 'stillbirth', label: 'Stillbirth', sex: 'unknown' },
    { symbol: 'miscarriage', label: 'Miscarriage', sex: 'unknown' },
    { symbol: 'abortion', label: 'Abortion', sex: 'unknown' },
    { symbol: 'pet', label: 'Pet', sex: 'unknown' }
];

// Map of symbol to sex
const SYMBOL_TO_SEX_MAP: Record<GenogramSymbolType, SexType> =
    Object.fromEntries(SYMBOL_DEFINITIONS.map(item => [item.symbol, item.sex])) as Record<GenogramSymbolType, SexType>;

/**
 * Get the sex associated with a genogram symbol.
 *
 * @param symbol The genogram symbol for which to retrieve the sex.
 * @returns The sex associated with the symbol, or 'unknown' if not found.
 */
export function symbolToSex(symbol: GenogramSymbolType): SexType {
    return SYMBOL_TO_SEX_MAP[symbol] ?? 'unknown';
}
