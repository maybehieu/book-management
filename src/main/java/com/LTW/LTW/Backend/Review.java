package com.LTW.LTW.Backend;

public class Review {
	int id;
	String username;
	int bookId;
	String comment;
	float rating;
	public Review(int id, String username, int bookId, String comment, float rating) {
		this.id = id;
		this.username = username;
		this.bookId = bookId;
		this.comment = comment;
		this.rating = rating;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public int getBookId() {
		return bookId;
	}
	public void setBookId(int bookId) {
		this.bookId = bookId;
	}
	public String getComment() {
		return comment;
	}
	public void setComment(String comment) {
		this.comment = comment;
	}
	public float getRating() {
		return rating;
	}
	public void setRating(float rating) {
		this.rating = rating;
	}
	
	
}
