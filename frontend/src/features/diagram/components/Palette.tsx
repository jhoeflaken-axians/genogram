import React from "react";
import type { DragEvent } from 'react';
import {Button, Group, SimpleGrid, Stack, Title, Text} from "@mantine/core";
import {SymbolIcon} from "@/core/ui/icons/SymbolIcons.tsx";
import {SYMBOL_DEFINITIONS} from "@/core/domain/genogram-symbols.ts";
import type {GenogramSymbolType} from "@/core/domain/genogram.ts";

interface PaletteProps {
    onAddPerson: (symbol: GenogramSymbolType) => void;
}

/**
 * The palette of genogram symbols.
 *
 * @constructor
 */
export const Palette: React.FC<PaletteProps> = ({ onAddPerson }) => {

    /**
     * Handles the drag start event for a symbol button.
     *
     * @param event - The drag event.
     * @param symbol - The symbol being dragged.
     */
    const handleDragStart = (event: DragEvent<HTMLButtonElement>, symbol: GenogramSymbolType) => {
        event.dataTransfer.setData('application/genogram-symbol', symbol);
        event.dataTransfer.effectAllowed = 'copy';
    };

    return (
        <Stack p="xs" gap="xs" style={{height: '100%', overflowY: 'auto' }}>
            <Title order={5}>Palette</Title>
            <SimpleGrid cols={1} spacing="xs">
                {SYMBOL_DEFINITIONS.map((item) => (
                    <Button
                        key={item.symbol}
                        variant="light"
                        h={42}
                        fullWidth
                        draggable
                        onDragStart={(event) => handleDragStart(event, item.symbol)}
                        onClick={() => onAddPerson(item.symbol)}
                        styles={{
                            inner: {
                                justifyContent: 'flex-start'
                            }
                        }}
                    >
                        <Group gap="sm" wrap="nowrap" style={{ width: '100%', justifyContent: 'flex-start', alignItems: 'center' }}>
                            <span style={{ width: 28, minWidth: 28, display: 'inline-flex', justifyContent: 'center', alignItems: 'center' }}>
                                <SymbolIcon symbol={item.symbol} size={26} />
                            </span>
                            <Text fw={600} size="sm" ta="left" style={{ whiteSpace: 'nowrap' }}>{item.label}</Text>
                        </Group>
                    </Button>
                ))}
            </SimpleGrid>
        </Stack>
    )

}
