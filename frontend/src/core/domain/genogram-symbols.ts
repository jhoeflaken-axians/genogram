import type {GenogramSymbolType, SexType} from "@/core/domain/genogram.ts";

/**
 * The definition of a genogram symbol.
 */
export type SymbolDefinition = {
    type: GenogramSymbolType;
    label: string;
    sex: SexType;
};

/**
 * The definitions of all genogram symbols.
 */
export const SYMBOL_DEFINITIONS: SymbolDefinition[] = [
    { type: 'male', label: 'Male',  sex: 'male' },
    { type: 'female', label: 'Female',  sex: 'female' },
    { type: 'unknown', label: 'Unknown Sex', sex: 'unknown' },
    { type: 'pregnancy', label: 'Pregnancy', sex: 'female' },
    { type: 'stillbirth', label: 'Stillbirth', sex: 'unknown' },
    { type: 'miscarriage', label: 'Miscarriage', sex: 'unknown' },
    { type: 'abortion', label: 'Abortion', sex: 'unknown' },
    { type: 'pet', label: 'Pet', sex: 'unknown' }
];

// Map of symbol to sex
const SYMBOL_TO_SEX_MAP: Record<GenogramSymbolType, SexType> =
    Object.fromEntries(SYMBOL_DEFINITIONS.map(item => [item.type, item.sex])) as Record<GenogramSymbolType, SexType>;

/**
 * Get the sex associated with a genogram symbol.
 *
 * @param symbol The genogram symbol for which to retrieve the sex.
 * @returns The sex associated with the symbol, or 'unknown' if not found.
 */
export function symbolToSex(symbol: GenogramSymbolType): SexType {
    return SYMBOL_TO_SEX_MAP[symbol] ?? 'unknown';
}
