package com.LTW.LTW.Objects;

import java.sql.Date;

import org.springframework.web.multipart.MultipartFile;

public class Book {
	private int bookId = 0;
	private String title = "";
	private String author = "";
	private String description = "";
	private Date releaseDate;
	private int categoryId = 0;
	private int price = 0;
	private int numPage = 0;
	private MultipartFile imageFile;
	private String imgPath = "";
	
	
	public Book() {
		// TODO Auto-generated constructor stub
	}

	public Book(int bookcode, String title, String author, String descriptionString, Date releaseDate, int categoryId,
			int price, int numPage, MultipartFile imageFile) {
		super();
		this.bookId = bookcode;
		this.title = title;
		this.author = author;
		this.description = descriptionString;
		this.releaseDate = releaseDate;
		this.categoryId = categoryId;
		this.price = price;
		this.numPage = numPage;
		this.imageFile = imageFile;
	}

	public Book(int bookcode, String title, String author, String descriptionString, Date releaseDate, int categoryId,
			int price, int numPage, String imagePath) {
		super();
		this.bookId = bookcode;
		this.title = title;
		this.author = author;
		this.description = descriptionString;
		this.releaseDate = releaseDate;
		this.categoryId = categoryId;
		this.price = price;
		this.numPage = numPage;
		this.imgPath = imagePath;
	}

	public MultipartFile getImageFile() {
		return imageFile;
	}

	public void setImageFile(MultipartFile imageFile) {
		this.imageFile = imageFile;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String descriptionString) {
		this.description = descriptionString;
	}

	public Date getReleaseDate() {
		return releaseDate;
	}

	public void setReleaseDate(Date releaseDate) {
		this.releaseDate = releaseDate;
	}

	public int getNumPage() {
		return numPage;
	}

	public void setNumPage(int numPage) {
		this.numPage = numPage;
	}

	public String getImgPath() {
		return imgPath;
	}

	public void setImgPath(String imgPath) {
		this.imgPath = imgPath;
	}

	public int getBookId() {
		return bookId;
	}

	public void setBookId(int bookcode) {
		this.bookId = bookcode;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getAuthor() {
		return author;
	}

	public void setAuthor(String author) {
		this.author = author;
	}
	
	public int getCategoryId() {
		return categoryId;
	}

	public void setCategoryId(int categoryId) {
		this.categoryId = categoryId;
	}

	public int getPrice() {
		return price;
	}

	public void setPrice(int price) {
		this.price = price;
	}

	public int compareBook(Book b1) {
		if (b1.getBookId() == bookId) {
			if (b1.getTitle().equals(title)) {
				if (b1.getAuthor().equals(author)) {
					return -1;
				}
			}
		}
		return 1;
	}
}

