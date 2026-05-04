import React from "react";
import {IconChevronLeft, IconChevronRight} from "@tabler/icons-react";

import diagramClasses from '../diagram.module.css';

/**
 * The inspector properties.
 */
interface InspectorProps {
    collapsed: boolean;
    toggle: () => void;
}

/**
 * The panel for displaying details of selected genogram elements.
 */
export const Inspector: React.FC<InspectorProps> = ({collapsed, toggle}) => {
    return (
        <div className={diagramClasses.inspectorRoot}>
            <button
                type="button"
                className={diagramClasses.toggleButton}
                onClick={toggle}
                aria-label={collapsed ? 'Show inspector' : 'Hide inspector'}
                title={collapsed ? 'Show inspector' : 'Hide inspector'}
            >
                {collapsed ? <IconChevronLeft size={20} /> : <IconChevronRight size={20} />}
            </button>

            {!collapsed && (
                <div className={diagramClasses.inspectorPanel}></div>
            )}
        </div>
    )

}
