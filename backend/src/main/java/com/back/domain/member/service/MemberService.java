package com.back.domain.member.service;

import com.back.domain.member.entity.Member;
import com.back.domain.member.repository.MemberRepository;
import com.back.global.globalExceptionHandler.MemberNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;

    @Transactional(readOnly = true)
    public long count() {
        return memberRepository.count();
    }

    // 회원가입
    @Transactional
    public Member join(String email, String password, String address, String postalCode) {
        String encodedPassword = passwordEncoder.encode(password);
        Member member = new Member(email, encodedPassword, address, postalCode);
        return memberRepository.save(member);
    }

    // 로그인
    @Transactional(readOnly = true)
    public Optional<Member> login(String email, String password) {
        return memberRepository.findByEmail(email)
                .filter(m -> passwordEncoder.matches(password, m.getPassword()));
    }

    // 이메일로 회원 조회
    @Transactional(readOnly = true)
    public Member findByEmail(String email) {
        return memberRepository.findByEmail(email)
                .orElseThrow(() -> new MemberNotFoundException("회원을 찾을 수 없습니다."));
    }

    // id로 회원 조회
    @Transactional(readOnly = true)
    public Member findById(Long id) {
        return memberRepository.findById(id)
                .orElseThrow(() -> new MemberNotFoundException("회원을 찾을 수 없습니다."));
    }
}