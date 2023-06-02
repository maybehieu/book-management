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
	private static final String GET_ALL_ORDER_BY_USERNAME = "select c.id, c.bookId, c.status, c.createdAt, c.updatedAt "
			+ "from cart as c "
			+ "inner join book as b on c.bookId = b.bookId "
			+ "where c.username=?";
	private static final String GET_ALL_ORDER_ADMIN = "select c.* from cart as c "
			+ "inner join book b on c.bookId = b.bookId";
	private static final String GET_ALL_PURCHASED_BY_BOOKID = "select COUNT(id) as numSold from cart where bookId=? and status=1";
	private static final String DELETE_USER_ORDER_STRING = "delete from cart where id=?";
	private static final String CHECK_EXIST_ORDER = "select id from cart where username=? and bookId=? and status=0";
	private static final String UPDATE_USER_ORDER = "UPDATE cart SET amount=?, status=? "
			+ "WHERE id=?";
	
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
	
	private boolean isOrderExisted(Cart cart) {
		try (
				Connection connection = getConnection();
				PreparedStatement ps = connection.prepareStatement(CHECK_EXIST_ORDER);
			) {
			
			ps.setString(1, cart.getUsername());
			ps.setInt(2, cart.getBookId());
			
			
			ResultSet rSet = ps.executeQuery();
			while (rSet.next()) {
				return true;
			}
			return false;
		} catch (SQLException e) {
			// TODO: handle exception
			e.printStackTrace();
		}
		return true;
	}
	
	private Map<String, String> makeResponse(String resp) {
		Map<String, String> ret = new HashMap<>();
		ret.put("response", resp);
		return ret;
	}
	
	public Map<String, String> addOrder(Cart cart) {
		System.out.println("called");
		if (isOrderExisted(cart)) {
			return makeResponse("This order already existed!");
		}
		try (
				Connection connection = getConnection();
				PreparedStatement ps = connection.prepareStatement(INSERT_ORDER);
			) {
			
			ps.setString(1, cart.getUsername());
			ps.setInt(2, cart.getBookId());
			
			
			ps.execute();
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
				int amount = 1;
				Timestamp createdAt = rs.getTimestamp("createdAt");
				Timestamp updatedAt = rs.getTimestamp("updatedAt");
				if ((status == purchased && purchased == 0) || (status != 0 && purchased == 1))
					orders.add(new Cart(id, username, bookId, amount, status, createdAt, updatedAt));
				else if (purchased == -1) {
					orders.add(new Cart(id, username, bookId, amount, status, createdAt, updatedAt));
				}
			}
		} catch (SQLException e) {
			// TODO: handle exception
			e.printStackTrace();
		}
		return orders;
	}
	
	public List<Cart> getAllOrderFromAdmin() {
		List<Cart> orders = new ArrayList<>();
		try (
				Connection connection = getConnection();
				PreparedStatement ps = connection.prepareStatement(GET_ALL_ORDER_ADMIN);
			) {
			
			ResultSet rs = ps.executeQuery();
			while (rs.next()) {
				int id = rs.getInt("id");
				String username = rs.getString("username");
				int bookId = rs.getInt("bookId");
				int status = rs.getInt("status");
				int amount = rs.getInt("amount");
				Timestamp createdAt = rs.getTimestamp("createdAt");
				Timestamp updatedAt = rs.getTimestamp("updatedAt");
					orders.add(new Cart(id, username, bookId, amount, status, createdAt, updatedAt));
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
				PreparedStatement ps = connection.prepareStatement(DELETE_USER_ORDER_STRING);
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
	
	public Map<String, String> updateUserOrder(Cart cart) {
		try (
				Connection connection = getConnection();
				PreparedStatement ps = connection.prepareStatement(UPDATE_USER_ORDER);
			) {
			
			ps.setInt(1, cart.getAmount());
			ps.setInt(2, cart.getStatus());
			ps.setInt(3, cart.getId());
			ps.execute();
			
			return makeResponse("Success!");
		} catch (SQLException e) {
			// TODO: handle exception
			e.printStackTrace();
		}
		return makeResponse("Internal error");
	}
}
