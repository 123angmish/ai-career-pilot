package com.careerpilot.ai.util;

import java.io.File;
import java.io.IOException;

import org.apache.pdfbox.Loader;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.text.PDFTextStripper;
import org.springframework.stereotype.Component;

@Component
public class PdfExtractor {

    public String extractText(String filePath) {

        try (PDDocument document = Loader.loadPDF(new File(filePath))) {

            PDFTextStripper stripper = new PDFTextStripper();

            return stripper.getText(document);

        } catch (IOException e) {
            throw new RuntimeException("Unable to read PDF", e);
        }
    }
}