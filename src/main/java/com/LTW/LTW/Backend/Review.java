package com.LTW.LTW.Backend;

import java.sql.Timestamp;

public class Review {
	int id;
	String username;
	int bookId;
	String comment;
	float rating;
	Timestamp createdAt;
	public Review(int id, String username, int bookId, String comment, float rating, Timestamp createdAt) {
		this.id = id;
		this.username = username;
		this.bookId = bookId;
		this.comment = comment;
		this.rating = rating;
		this.createdAt = createdAt;
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
	public Timestamp getCreatedAt() {
		return createdAt;
	}
	public void setCreatedAt(Timestamp createdAt) {
		this.createdAt = createdAt;
	}
	
	
}
