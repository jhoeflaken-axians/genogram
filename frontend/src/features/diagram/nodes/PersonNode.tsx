import React from "react";
import type {Person} from "@/core/domain/genogram.ts";
import type {Node, NodeProps} from '@xyflow/react';
import {useReactFlow} from '@xyflow/react';
import {IconCake, IconCross} from '@tabler/icons-react';
import {SymbolIcon} from "@/core/ui/icons/SymbolIcons.tsx";
import type {GenogramEdge} from "@/features/diagram/types/edges.tsx";
import type {GenogramNode} from "@/features/diagram/types/nodes.ts";

import nodeClasses from './nodes.module.css';

type PersonNode = Node<Person, "person" | "pregnancy" | "loss" | "pet">;

const clampToLines = (value: string, maxLines = 3): string => value.split(/\r?\n/).slice(0, maxLines).join('\n');

const toDateInputValue = (value?: string): string => {
    if (!value) return '';
    const match = value.match(/^\d{4}-\d{2}-\d{2}$/);
    return match ? value : '';
};

const calculateAge = (birthDate?: string, deathDate?: string): string => {
    if (!birthDate) return 'Age -';

    const birth = new Date(birthDate);
    if (Number.isNaN(birth.getTime())) return 'Age -';

    const end = deathDate ? new Date(deathDate) : new Date();
    if (Number.isNaN(end.getTime()) || end < birth) return 'Age -';

    let years = end.getFullYear() - birth.getFullYear();
    const monthDelta = end.getMonth() - birth.getMonth();
    const dayDelta = end.getDate() - birth.getDate();

    if (monthDelta < 0 || (monthDelta === 0 && dayDelta < 0)) years -= 1;
    return `Age ${Math.max(0, years)}`;
};

export const PersonNode: React.FC<NodeProps<PersonNode>> = ({id, data}) => {
    const {setNodes} = useReactFlow<GenogramNode, GenogramEdge>();
    const [name, setName] = React.useState(data.callSign ?? '');
    const [birthDate, setBirthDate] = React.useState(toDateInputValue(data.birthDate));
    const [deathDate, setDeathDate] = React.useState(toDateInputValue(data.deathDate));

    React.useEffect(() => {
        setName(data.callSign ?? '');
        setBirthDate(toDateInputValue(data.birthDate));
        setDeathDate(toDateInputValue(data.deathDate));
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
            <div className={nodeClasses.leftColumn}>
                <SymbolIcon symbol={data.symbol} deceased={data.deceased} size={34}/>
                <span className={nodeClasses.ageText}>{calculateAge(birthDate, deathDate)}</span>
            </div>

            <div className={nodeClasses.rightColumn}>
                <textarea
                    className={`${nodeClasses.nameInput} nodrag nowheel`}
                    value={name}
                    onChange={(event) => {
                        const next = clampToLines(event.target.value, 3);
                        setName(next);
                        updateData({callSign: next});
                    }}
                    rows={3}
                    placeholder="Name"
                />

                <label className={nodeClasses.dateRow}>
                    <IconCake size={14} stroke={1.8}/>
                    <input
                        className={`${nodeClasses.dateInput} nodrag nowheel`}
                        type="date"
                        value={birthDate}
                        onChange={(event) => {
                            const next = event.target.value;
                            setBirthDate(next);
                            updateData({birthDate: next || undefined});
                        }}
                    />
                </label>

                <label className={nodeClasses.dateRow}>
                    <IconCross size={14} stroke={1.8}/>
                    <input
                        className={`${nodeClasses.dateInput} nodrag nowheel`}
                        type="date"
                        value={deathDate}
                        onChange={(event) => {
                            const next = event.target.value;
                            setDeathDate(next);
                            updateData({deathDate: next || undefined, deceased: Boolean(next)});
                        }}
                    />
                </label>
            </div>
        </div>
    )

}
