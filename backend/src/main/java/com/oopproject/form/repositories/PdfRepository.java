package com.oopproject.form.repositories;
import org.springframework.data.mongodb.repository.MongoRepository;


import com.oopproject.form.models.PdfFile.PdfFile;

public interface PdfRepository extends MongoRepository<PdfFile, String> {
}
