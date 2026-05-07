import type {Person} from "@/core/domain/genogram.ts";
import type {Node, NodeProps} from '@xyflow/react';

type PersonMode = Node<Person, "person">

export const PersonNode: React.FC<NodeProps<PersonMode>> = ({data}) => {

    return (
        <div>
            {data.lastName}
        </div>
    )

}
