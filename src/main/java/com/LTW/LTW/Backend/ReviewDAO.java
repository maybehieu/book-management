package com.LTW.LTW.Backend;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class ReviewDAO {
	private String jdbcURL = "jdbc:mysql://localhost:3306/LTWBook";
	private String jdbcUsername = "root";
	private String jdbcPassword = "1234";
	
	private static final String INSERT_REVIEW = "insert into review(username, bookId, comment, rating) values (?,?,?,?)";
	private static final String GET_ALL_REVIEW_BY_BOOK = "select id, username, comment, rating, createdAt from review where bookId=?";
	private static final String GET_RATING_OF_BOOK = "select AVG(rating) as avgRating from review where bookId=?";
	private static final String DELETE_REVIEW = "delete from review where id=?";
	
	protected Connection getConnection() {
		Connection connection = null;
		try {
			Class.forName("com.mysql.cj.jdbc.Driver");
			connection = DriverManager.getConnection(jdbcURL, jdbcUsername, jdbcPassword);
		} catch (SQLException e) {
			// TODO: handle exception
			e.printStackTrace();
		} catch (ClassNotFoundException e) {
			// TODO: handle exception
			e.printStackTrace();
		}
		return connection;
	}
	
	private Map<String, String> makeResponse(String resp) {
		Map<String, String> ret = new HashMap<>();
		ret.put("response", resp);
		return ret;
	}
	
	public Map<String, String> addReview(Review review) {
		try (
				Connection connection = getConnection();
				PreparedStatement ps = connection.prepareStatement(INSERT_REVIEW);
			) {
			
			ps.setString(1, review.getUsername());
			ps.setInt(2, review.getBookId());
			ps.setString(3, review.getComment());
			ps.setFloat(4, review.getRating());

			ps.execute();
			System.out.println("success add review");
			return makeResponse("Success!");
		} catch (SQLException e) {
			// TODO: handle exception
			e.printStackTrace();
		}
		return makeResponse("Internal error");
	}
	
	public List<Review> getAllReview(int bookId) {
		List<Review> reviews = new ArrayList<>();
		try (
				Connection connection = getConnection();
				PreparedStatement ps = connection.prepareStatement(GET_ALL_REVIEW_BY_BOOK);
			) {
			ps.setInt(1, bookId);
			ResultSet rs = ps.executeQuery();
			while (rs.next()) {
				int id = rs.getInt("id");
				String username = rs.getString("username");
				String comment = rs.getString("comment");
				float rating = rs.getFloat("rating");
				Timestamp createdAt = rs.getTimestamp("createdAt");
				reviews.add(new Review(id, username, bookId, comment, rating, createdAt));
			}
		} catch (SQLException e) {
			// TODO: handle exception
			e.printStackTrace();
		}
		return reviews;
	}
	
	public float getBookRating(int bookId) {
		float rating = (float) -1.0;
		try (
				Connection connection = getConnection();
				PreparedStatement ps = connection.prepareStatement(GET_RATING_OF_BOOK);
			) {
			ps.setInt(1, bookId);
			ResultSet rs = ps.executeQuery();
			while (rs.next()) {
				rating = rs.getFloat("avgRating");
			}
			
		} catch (SQLException e) {
			// TODO: handle exception
			e.printStackTrace();
		}
		return rating;
	}
	
	public Map<String, String> deleteReview(int id) {
		try (
				Connection connection = getConnection();
				PreparedStatement ps = connection.prepareStatement(DELETE_REVIEW);
			) {
			ps.setInt(1, id);
			ps.execute();
			return makeResponse("Success!");
		} catch (SQLException e) {
			// TODO: handle exception
			e.printStackTrace();
		}
		return makeResponse("Internal error");
	}
}
