package com.LTW.LTW.ImageHandler;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;

import org.springframework.web.multipart.MultipartFile;

public class ImageService {
	private static final String FOLDER_PATH = "/LTW/images/";
	
	public static String uploadImage(MultipartFile file) throws IOException {
		try {
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
			byte[] image = Files.readAllBytes(new File(filePath).toPath());
			return image;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}
}
