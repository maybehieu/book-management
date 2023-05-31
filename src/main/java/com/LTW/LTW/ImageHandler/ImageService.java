package com.LTW.LTW.ImageHandler;

import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import javax.imageio.ImageIO;

import org.springframework.web.multipart.MultipartFile;

public class ImageService {
	private static final String FOLDER_PATH = new File("").getAbsolutePath() + "/frontend/images/";
	
	public static String uploadImage(MultipartFile file) throws IOException {
		try {
			if ( file.getOriginalFilename().equals("null.txt")) return "delete";
			if (file.isEmpty()) return "empty";
			String filePath = FOLDER_PATH + file.getOriginalFilename();
			file.transferTo(new File(filePath));
			return filePath;
		} catch (Exception e) {
			// TODO: handle exception
			System.out.println(e);
		}		
		return null;
	}
	
	public static byte[] getImageData(String filePath) throws IOException {
		try {
			//System.out.println(filePath);
			Path path = new File(filePath).toPath();
			byte[] image = Files.readAllBytes(path);
			return image;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}
}
