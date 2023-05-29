package com.LTW.LTW.Backend;

import java.io.IOException;
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
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.LTW.LTW.Objects.Book;
import com.LTW.LTW.Objects.Category;

@RestController
@RequestMapping("/server")
@CrossOrigin
public class APIController {
	BookDAO bDao = new BookDAO();
	UserDAO uDao = new UserDAO();
	ReviewDAO rDao = new ReviewDAO();
	CartDAO cDao = new CartDAO();
	
	@GetMapping("/image/{bookId}")
	public ResponseEntity<?> getImage(@PathVariable int bookId) throws IOException {
		byte[] imageData = bDao.getBookCover(bookId);
		return ResponseEntity.status(HttpStatus.OK)
				.contentType(MediaType.valueOf("image/png"))
				.body(imageData);
	}
	
	@GetMapping("/books")
	public List<Book> getAll() throws IOException {
		return bDao.selectAll();
	}
	
	@CrossOrigin
	@GetMapping("/categories")
	public List<Category> getCategories() throws IOException {
		return bDao.getAllCategory();
	}
	
	@CrossOrigin
	@PostMapping("/save")
	public Map<String, String> saveBook(@ModelAttribute Book book) throws IOException {
		return bDao.save(book);
	}
	
	@GetMapping("/select/{bookId}")
	public Book getById(@PathVariable int bookId) throws IOException {
		return bDao.selectById(bookId);
	}
	
	
	@PostMapping("/update")
	public Map<String, String> updateBook(@ModelAttribute Book book) throws IOException {
		return bDao.edit(book);
	}
	
	@DeleteMapping("/delete/{bookId}")
	public Map<String, String> deleteBook(@PathVariable int bookId) throws IOException {
		return bDao.delete(bookId);
	}
	
	@GetMapping("/users")
	public List<String> getUsernames() throws IOException {
		return uDao.getUsername();
	}
	
	@PostMapping("/user-register")
	public Map<String, String> userRegister(@ModelAttribute User user) throws IOException {
		System.out.println("registering");
		return uDao.registerUser(user);
	}
	
	@PostMapping("/user-login")
	public Map<String, String> userLogin(@ModelAttribute User user) throws IOException {
		return uDao.userLogin(user);
	}
	
	@PostMapping("/add-review")
	public Map<String, String> addReview(@ModelAttribute Review review) throws IOException {
		return rDao.addReview(review);
	}
	
	@GetMapping("/review/{bookId}")
	public List<Review> getReviews(@PathVariable int bookId) throws IOException {
		return rDao.getAllReview(bookId);
	}
	
	@GetMapping("/rating/{bookId}")
	public float getRating(@PathVariable int bookId) throws IOException {
		return rDao.getBookRating(bookId);
	}
	
	@PostMapping("/add-order")
	public Map<String, String> addOrder(@ModelAttribute Cart cart) throws IOException {
		return cDao.addOrder(cart);
	}
	
	@GetMapping("/ordered/{username}")
	public List<Cart> getOrder(@PathVariable String username) throws IOException {
		return cDao.getAllOrderFromUser(username, 0);
	}
	
	@GetMapping("/purchased/{username}")
	public List<Cart> getPurchased(@PathVariable String username) throws IOException {
		return cDao.getAllOrderFromUser(username, 1);
	}
	
	@GetMapping("/sold/{bookId}")
	public Map<String, String> getBookNumSold(@PathVariable int bookId) throws IOException {
		return cDao.getNumSold(bookId);
	}
	
	@DeleteMapping("/delete-order/{id}")
	public Map<String, String> deleteOrder(@PathVariable int id) throws IOException {
		return cDao.deleteUserOrder(id);
	}
}
