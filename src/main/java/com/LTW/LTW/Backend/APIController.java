package com.LTW.LTW.Backend;

import java.io.IOException;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.LTW.LTW.Objects.Book;

@RestController
@RequestMapping("/server")
@CrossOrigin
public class APIController {
	BookDAO dao = new BookDAO();
	
	@GetMapping("/image/{bookId}")
	public byte[] getImage(@PathVariable int bookId) throws IOException {
		return dao.getBookCover(bookId);
	}
	
	@PostMapping("/save")
	public String saveBook(@RequestBody Book book) throws IOException {
		return dao.save(book);
	}
	
	@PostMapping("/update")
	public String updateBook(@RequestBody Book book) throws IOException {
		return dao.edit(book);
	}
	
	@PostMapping("/delete/{id}")
	public String deleteBook(@PathVariable int bookId) throws IOException {
		return dao.delete(bookId);
	}
}
