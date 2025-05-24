package vn.tdtu.shop.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import vn.tdtu.shop.domain.Image;

public interface ImageRepository extends JpaRepository<Image, Long> {
}
