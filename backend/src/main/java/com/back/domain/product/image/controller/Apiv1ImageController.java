package com.back.domain.product.image.controller;

import com.back.domain.product.image.dto.ImageDto;
import com.back.domain.product.image.entity.Image;
import com.back.domain.product.image.service.ImageService;
import com.back.global.rsData.RsData;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/images")
public class Apiv1ImageController {

    private final ImageService imageService;

    @GetMapping("/{id}")
    public RsData<ImageDto> getImage(
            @PathVariable("id") Long id
    ) {
        Image image = imageService.findById(id);

        return new RsData<>(
                "200-1",
                "이미지 조회 성공",
                new ImageDto(image)
        );
    }
}