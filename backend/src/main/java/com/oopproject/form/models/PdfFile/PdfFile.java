package com.oopproject.form.models.PdfFile;


import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;


import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Document(collection = "pdf_files")
public class PdfFile {
   @Id
   private String id;
   private String name;
   private byte[] data;
   // getters and setters

 
}