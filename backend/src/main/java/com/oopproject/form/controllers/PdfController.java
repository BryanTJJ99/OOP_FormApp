package com.oopproject.form.controllers;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.nio.charset.Charset;

import org.springframework.http.ContentDisposition;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.itextpdf.text.Document;
import com.itextpdf.text.DocumentException;
import com.itextpdf.text.PageSize;
import com.itextpdf.text.pdf.PdfWriter;
import com.itextpdf.tool.xml.XMLWorkerHelper;

@RestController
public class PdfController {

    @GetMapping("/generate-pdf")
    public ResponseEntity<byte[]> generatePdf() throws Exception {
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        Document document = new Document(PageSize.A4);
        PdfWriter writer = PdfWriter.getInstance(document, baos);
        document.open();

        // MAKE THE FORM HERE AND STORE AS A HTML STRING
        String htmlContent = "<html><body><h1>Hello World</h1><h2>OOP</h2></body></html>";
        ByteArrayInputStream inputStream = new ByteArrayInputStream(htmlContent.getBytes(Charset.forName("UTF-8")));

        XMLWorkerHelper.getInstance().parseXHtml(writer, document, inputStream, Charset.forName("UTF-8"));

        document.close();
        byte[] pdfBytes = baos.toByteArray();
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_PDF);
        headers.setContentDisposition(ContentDisposition.attachment().filename("output.pdf").build());
        headers.setContentLength(pdfBytes.length);
        return new ResponseEntity<>(pdfBytes, headers, HttpStatus.OK);
    }
}

