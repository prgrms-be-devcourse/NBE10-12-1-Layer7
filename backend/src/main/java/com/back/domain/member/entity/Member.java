package com.back.domain.member.entity;

import com.back.global.jpa.entity.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
public class Member extends BaseEntity {

    @Column(unique = true, nullable = false)
    private String email;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private String address;

    @Column(nullable = false)
    private String postalCode;

    public Member(String email, String password, String address, String postalCode) {
        this.email = email;
        this.password = password;
        this.address = address;
        this.postalCode = postalCode;
    }

    public void modify(String address, String postalCode) {
        this.address = address;
        this.postalCode = postalCode;
    }
}