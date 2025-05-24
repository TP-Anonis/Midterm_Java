package vn.tdtu.shop.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import vn.tdtu.shop.service.FileStorageService;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@RestController
@RequestMapping("/api/upload")
@RequiredArgsConstructor
public class FileUploadController {

    private final FileStorageService storageService;
    private static final List<String> ALLOWED_IMAGE_TYPES = List.of(
            "image/jpeg", "image/png", "image/gif", "image/webp",
            "image/bmp", "image/tiff", "image/heic", "image/avif", "image/apng");
    private static final long MAX_FILE_SIZE = 50 * 1024 * 1024;

    @PostMapping("/file")
    public ResponseEntity<List<String>> handleFileUpload(@RequestParam("files") List<MultipartFile> files) {
        if (files.isEmpty()) {
            return ResponseEntity.badRequest().body(List.of("No files uploaded!"));
        }
        return ResponseEntity.status(HttpStatus.CREATED).body(processFiles(files));
    }

    @PostMapping("/img")
    public ResponseEntity<?> handleImageUpload(@RequestParam("files") List<MultipartFile> files) {
        if (files.isEmpty()) {
            return ResponseEntity.badRequest().body(Collections.singletonMap("error", "No files uploaded!"));
        }

        List<String> uploadedFiles = new ArrayList<>();
        List<String> errors = new ArrayList<>();

        for (MultipartFile file : files) {
            if (!isValidImage(file, errors)) {
                continue;
            }
            uploadedFiles.add(storageService.storeFile(file));
        }

        return errors.isEmpty()
                ? ResponseEntity.status(HttpStatus.CREATED).body(Collections.singletonMap("uploaded", uploadedFiles))
                : ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Collections.singletonMap("errors", errors));
    }

    private List<String> processFiles(List<MultipartFile> files) {
        List<String> fileNames = new ArrayList<>();
        for (MultipartFile file : files) {
            fileNames.add(storageService.storeFile(file));
        }
        return fileNames;
    }

    private boolean isValidImage(MultipartFile file, List<String> errors) {
        if (file.getSize() > MAX_FILE_SIZE) {
            errors.add(file.getOriginalFilename() + " exceeds 50MB limit");
            return false;
        }
        if (!ALLOWED_IMAGE_TYPES.contains(file.getContentType())) {
            errors.add(file.getOriginalFilename() + " is not a valid image file");
            return false;
        }
        return true;
    }
}