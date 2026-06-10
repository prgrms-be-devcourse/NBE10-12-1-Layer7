import { Member } from "@/type/members";
import { MemberListItem } from "./members-item";


type MemberListProps = {
  members: Member[];
};

export function MemberList({members}:MemberListProps){
    return (
        <ul className="member-list">
            {members.map((member, index) => (
                <MemberListItem key={index} member={member}/>
            ))}
        </ul>
    );
}