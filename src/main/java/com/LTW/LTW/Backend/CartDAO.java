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

public class CartDAO {
	private String jdbcURL = "jdbc:mysql://localhost:3306/LTWBook";
	private String jdbcUsername = "root";
	private String jdbcPassword = "1234";
	
	private static final String INSERT_ORDER = "insert into cart(username, bookId) values (?,?)";
	private static final String GET_ALL_ORDER_BY_USERNAME = "select id, bookId, status, createdAt, updatedAt "
			+ "from cart where username=?";
	private static final String GET_ALL_PURCHASED_BY_BOOKID = "select COUNT(id) as numSold from cart where bookId=? and status=1";
	private static final String DELETE_USER_ORDER_STRING = "delete from cart where and id=?";
	
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
	
	public Map<String, String> addOrder(Cart cart) {
		try (
				Connection connection = getConnection();
				PreparedStatement ps = connection.prepareStatement(INSERT_ORDER);
			) {
			
			ps.setString(1, cart.getUsername());
			ps.setInt(2, cart.getBookId());
			
			
			ps.executeQuery();
			return makeResponse("Success!");
		} catch (SQLException e) {
			// TODO: handle exception
			e.printStackTrace();
		}
		return makeResponse("Internal error");
	}
	
	public List<Cart> getAllOrderFromUser(String username, int purchased) {
		List<Cart> orders = new ArrayList<>();
		try (
				Connection connection = getConnection();
				PreparedStatement ps = connection.prepareStatement(GET_ALL_ORDER_BY_USERNAME);
			) {
			
			ps.setString(1, username);
			ResultSet rs = ps.executeQuery();
			while (rs.next()) {
				int id = rs.getInt("id");
				int bookId = rs.getInt("bookId");
				int status = rs.getInt("status");
				Timestamp createdAt = rs.getTimestamp("createdAt");
				Timestamp updatedAt = rs.getTimestamp("updatedAt");
				if (status == purchased)
					orders.add(new Cart(id, username, bookId, status, createdAt, updatedAt));
			}
		} catch (SQLException e) {
			// TODO: handle exception
			e.printStackTrace();
		}
		return orders;
	}
	
	public Map<String, String> getNumSold(int bookId) {
		int numSold = -1;
		try (
				Connection connection = getConnection();
				PreparedStatement ps = connection.prepareStatement(GET_ALL_PURCHASED_BY_BOOKID);
			) {
			
			ps.setInt(1, bookId);
			ResultSet rs = ps.executeQuery();
			while (rs.next()) {
				numSold = rs.getInt("numSold");
			}
			
			Map<String, String> ret = new HashMap<>();
			ret.put("numSold", Integer.toString(numSold));
			return ret;
		} catch (SQLException e) {
			// TODO: handle exception
			e.printStackTrace();
		}
		return makeResponse("Internal error");
	}
	
	public Map<String, String> deleteUserOrder(int id) {
		try (
				Connection connection = getConnection();
				PreparedStatement ps = connection.prepareStatement(GET_ALL_PURCHASED_BY_BOOKID);
			) {
			
			ps.setInt(1, id);
			ps.executeQuery();
			
			return makeResponse("Success!");
		} catch (SQLException e) {
			// TODO: handle exception
			e.printStackTrace();
		}
		return makeResponse("Internal error");
	}
}
