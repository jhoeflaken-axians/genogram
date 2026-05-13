import React from "react";
import type {Person} from "@/core/domain/genogram.ts";
import type {Node, NodeProps} from '@xyflow/react';
import {useReactFlow} from '@xyflow/react';
import {IconCake, IconCross} from '@tabler/icons-react';
import {Box, Group, Stack, Text, TextInput, Textarea} from '@mantine/core';
import {SymbolIcon} from "@/core/ui/icons/SymbolIcons.tsx";
import type {GenogramEdge} from "@/features/diagram/types/edges.tsx";
import type {GenogramNode} from "@/features/diagram/types/nodes.ts";

import nodeClasses from './nodes.module.css';

type PersonNode = Node<Person, "person" | "pregnancy" | "loss" | "pet">;

const clampToLines = (value: string, maxLines = 3): string => value.split(/\r?\n/).slice(0, maxLines).join('\n');

const ISO_DATE_RE = /^(\d{4})-(\d{2})-(\d{2})$/;
const DISPLAY_DATE_RE = /^(\d{2})-(\d{2})-(\d{4})$/;

const normalizeDateInput = (value: string): string => {
    const digits = value.replace(/\D/g, '').slice(0, 8);
    if (digits.length <= 2) return digits;
    if (digits.length <= 4) return `${digits.slice(0, 2)}-${digits.slice(2)}`;
    return `${digits.slice(0, 2)}-${digits.slice(2, 4)}-${digits.slice(4)}`;
};

const toDisplayDate = (value?: string): string => {
    if (!value) return '';
    const trimmed = value.trim();
    const display = trimmed.match(DISPLAY_DATE_RE);
    if (display) return trimmed;

    const iso = trimmed.match(ISO_DATE_RE);
    if (!iso) return trimmed;
    return `${iso[3]}-${iso[2]}-${iso[1]}`;
};

const parseDate = (value?: string): Date | null => {
    if (!value) return null;
    const trimmed = value.trim();

    const display = trimmed.match(DISPLAY_DATE_RE);
    if (display) {
        const day = Number(display[1]);
        const month = Number(display[2]);
        const year = Number(display[3]);
        const date = new Date(year, month - 1, day);
        if (date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day) return date;
        return null;
    }

    const iso = trimmed.match(ISO_DATE_RE);
    if (iso) {
        const year = Number(iso[1]);
        const month = Number(iso[2]);
        const day = Number(iso[3]);
        const date = new Date(year, month - 1, day);
        if (date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day) return date;
    }

    return null;
};

const calculateAge = (birthDate?: string, deathDate?: string): string => {
    if (!birthDate) return '-';

    const birth = parseDate(birthDate);
    if (!birth) return '-';

    const end = deathDate ? parseDate(deathDate) : new Date();
    if (!end || end < birth) return '-';

    let years = end.getFullYear() - birth.getFullYear();
    const monthDelta = end.getMonth() - birth.getMonth();
    const dayDelta = end.getDate() - birth.getDate();

    if (monthDelta < 0 || (monthDelta === 0 && dayDelta < 0)) years -= 1;
    return `${Math.max(0, years)}`;
};

export const PersonNode: React.FC<NodeProps<PersonNode>> = ({id, data}) => {
    const {setNodes} = useReactFlow<GenogramNode, GenogramEdge>();
    const [name, setName] = React.useState(data.callSign ?? '');
    const [birthDate, setBirthDate] = React.useState(toDisplayDate(data.birthDate));
    const [deathDate, setDeathDate] = React.useState(toDisplayDate(data.deathDate));

    React.useEffect(() => {
        setName(data.callSign ?? '');
        setBirthDate(toDisplayDate(data.birthDate));
        setDeathDate(toDisplayDate(data.deathDate));
    }, [data.callSign, data.birthDate, data.deathDate]);

    const updateData = React.useCallback((patch: Partial<Person>) => {
        setNodes((currentNodes) => currentNodes.map((node) => {
            if (node.id !== id) return node;
            return {
                ...node,
                data: {
                    ...node.data,
                    ...patch
                }
            } as GenogramNode;
        }));
    }, [id, setNodes]);

    return (
        <div className={nodeClasses.card}>
            <Stack gap={1}>
                <Group wrap="nowrap" align="flex-start" gap={10}>
                    <Box w={42} miw={42} pt={2} style={{display: 'flex', justifyContent: 'center'}}>
                        <SymbolIcon symbol={data.symbol} deceased={data.deceased} size={34}/>
                    </Box>

                    <Textarea
                        value={name}
                        onChange={(event) => {
                            const next = clampToLines(event.target.value, 3);
                            setName(next);
                            updateData({callSign: next});
                        }}
                        placeholder="Name"
                        variant="unstyled"
                        minRows={3}
                        maxRows={3}
                        autosize
                        classNames={{
                            input: 'nodrag nowheel'
                        }}
                        styles={{
                            root: {flex: 1, minWidth: 0},
                            input: {
                                fontSize: '13px',
                                fontWeight: 600,
                                lineHeight: 1.15,
                                color: '#1f2937',
                                padding: 0
                            }
                        }}
                    />
                </Group>

                <Group wrap="nowrap" align="center" gap={10}>
                    <Text size="11px" fw={700} c="#495057" ta="center" w={42} miw={42}>
                        {calculateAge(birthDate, deathDate)}
                    </Text>

                    <Group wrap="nowrap" align="center" gap={4} style={{flex: 1, minWidth: 0}}>
                        <TextInput
                            value={birthDate}
                            placeholder="dd-MM-yyyy"
                            onChange={(event) => {
                                const next = normalizeDateInput(event.target.value);
                                setBirthDate(next);
                                updateData({birthDate: next || undefined});
                            }}
                            variant="unstyled"
                            leftSection={<IconCake size={10} stroke={1.8}/>}
                            leftSectionWidth={14}
                            classNames={{
                                input: 'nodrag nowheel'
                            }}
                            styles={{
                                root: {flex: '0 0 82px', minWidth: 82},
                                input: {fontSize: '10px', color: '#495057', padding: 0, paddingLeft: 16}
                            }}
                        />

                        <TextInput
                            value={deathDate}
                            placeholder="dd-MM-yyyy"
                            onChange={(event) => {
                                const next = normalizeDateInput(event.target.value);
                                setDeathDate(next);
                                updateData({deathDate: next || undefined, deceased: Boolean(next.trim())});
                            }}
                            variant="unstyled"
                            leftSection={<IconCross size={10} stroke={1.8}/>}
                            leftSectionWidth={14}
                            classNames={{
                                input: 'nodrag nowheel'
                            }}
                            styles={{
                                root: {flex: '0 0 82px', minWidth: 82},
                                input: {fontSize: '10px', color: '#495057', padding: 0, paddingLeft: 16}
                            }}
                        />
                    </Group>
                </Group>
            </Stack>
        </div>
    )

}
