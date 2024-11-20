import { ArrowFatLinesUp, CaretDown, CircleDashed, ProhibitInset, TagChevron } from "phosphor-react";

export const priorityArr = [
    { name: 'blocker', icon: <ProhibitInset size={20} color="#ff0000" weight="fill" /> },
    { name: 'critical', icon: <TagChevron className="tag-chev" size={20} color="#ff0000" weight="fill" />},
    { name: 'high', icon: <ArrowFatLinesUp size={20} color="#c77e00" weight="fill" /> },
    { name: 'medium', icon: <CircleDashed size={20} color="#45dd03" weight="fill" /> },
    { name: 'trivial', icon: <CaretDown size={22} color="#0328dd" weight="fill" /> },
]