package com.LTW.LTW.Backend;

import java.io.IOException;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/server")
public class APIController {
	BookDAO dao = new BookDAO();
	
	@CrossOrigin
	@GetMapping("/image")
	public byte[] getImage(@PathVariable int bookId) throws IOException {
		return dao.getBookCover(bookId);
	}
	
	
}
