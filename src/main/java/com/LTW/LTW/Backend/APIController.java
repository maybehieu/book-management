package com.LTW.LTW.Backend;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.LTW.LTW.Objects.Book;
import com.LTW.LTW.Objects.Category;

@RestController
@RequestMapping("/server")
@CrossOrigin
public class APIController {
	BookDAO dao = new BookDAO();
	
	@GetMapping("/image/{bookId}")
	public ResponseEntity<?> getImage(@PathVariable int bookId) throws IOException {
		byte[] imageData = dao.getBookCover(bookId);
		return ResponseEntity.status(HttpStatus.OK)
				.contentType(MediaType.valueOf("image/png"))
				.body(imageData);
	}
	
	@GetMapping("/books")
	public List<Book> getAll() throws IOException {
		return dao.selectAll();
	}
	
	@CrossOrigin
	@GetMapping("/categories")
	public List<Category> getCategories() throws IOException {
		return dao.getAllCategory();
	}
	
	@CrossOrigin
	@PostMapping("/save")
	public Map<String, String> saveBook(@ModelAttribute Book book) throws IOException {
		return dao.save(book);
	}
	
	@GetMapping("/select/{bookId}")
	public Book getById(@PathVariable int bookId) throws IOException {
		return dao.selectById(bookId);
	}
	
	
	@PostMapping("/update")
	public Map<String, String> updateBook(@ModelAttribute Book book) throws IOException {
		return dao.edit(book);
	}
	
	@DeleteMapping("/delete/{bookId}")
	public Map<String, String> deleteBook(@PathVariable int bookId) throws IOException {
		return dao.delete(bookId);
	}
}
