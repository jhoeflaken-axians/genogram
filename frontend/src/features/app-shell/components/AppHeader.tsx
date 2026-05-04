import React from 'react';
import {Group, Text} from "@mantine/core";
import {IconSitemap} from "@tabler/icons-react";

/**
 * The header of the application. It contains the title, main menu, language toggle, login, and settings. The
 * justification is "space-between" so the first element is aligned to the left, and the last element is aligned to the
 * right. The remaining elements are distributed evenly in between.
 *
 * @constructor
 */
export const AppHeader: React.FC = () => {

    return (
        <>
            <Group
                justify="space-between"
                align="center"
                h="100%"
                px="md"
                wrap="nowrap"
            >
                {/* Left part of the header with the icon, title and main menu */}
                <Group
                    gap="md"
                    wrap="nowrap"
                >
                    <Group gap="sm" wrap="nowrap">
                        <IconSitemap size={24} stroke={1.5}/>
                        <Text fw={600} size="lg">Genogram</Text>
                    </Group>
                </Group>

                {/* Right part of the header with the language toggle, login, and settings */}
                <Group
                    gap="xs"
                    wrap="nowrap"
                >
                </Group>
            </Group>
        </>
    )

}
