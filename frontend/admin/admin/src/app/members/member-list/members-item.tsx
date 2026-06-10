import { Member } from "@/type/members";


type MemberListItemProps = {
    member: Member;
}

export function MemberListItem({member}:MemberListItemProps){
    return (
        <li className="member-item">
            <div className="member-summary">
                <div className="member-item-id">#{member.id}</div>
                <div className="member-item-email">{member.email}</div>
                <div className="member-item-address">{member.address}</div>
                <div className="member-item-postal-code">({member.postalCode})</div>
            </div>
        </li>
        
    );
}