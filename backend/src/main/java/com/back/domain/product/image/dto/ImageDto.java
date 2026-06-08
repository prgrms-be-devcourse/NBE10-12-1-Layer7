package com.back.domain.product.image.dto;

import com.back.domain.product.image.entity.Image;

public record ImageDto(
        Long id,
        String url
) {
    public ImageDto(Image image) {
        this(
                image.getId(),
                image.getUrl()
        );
    }
}
