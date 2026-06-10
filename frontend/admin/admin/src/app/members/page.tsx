'use client';
import { apiFetch } from "@/lib/backend/client";
import { Member } from "@/type/members";
import { useEffect, useState } from "react";
import BasePage from "@/app/BasePage";
import { MemberList } from "./member-list/member-list";

export default function MembersPage(){
    ///api/v1/admin/members
    const [members, setMembers] = useState<Member[]>();

    useEffect(()=>{
        
        apiFetch(`/api/v1/admin/members`,{
            method: "GET",
            credentials: "include"
           }
           ).then((data)=>{
            setMembers(data.data);
           }).catch((err)=>{
            alert("목록 조회에 실패했습니다.");
           });
    });

    return (
    <BasePage>
        <div className="members-page">
                    <div className="members-block">
                        <div className="members-owner">
                            회원 목록입니다. ({members && members.length})
                        </div>
                        <div className="members-list-block">
                        {members && members.length > 0 && (
                            <MemberList members={members}></MemberList>
                        )}
                    </div>
                </div>
            </div>
    </BasePage>
    )
}