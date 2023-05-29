package com.LTW.LTW.Backend;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class UserDAO {
	private String jdbcURL = "jdbc:mysql://localhost:3306/LTWBook";
	private String jdbcUsername = "root";
	private String jdbcPassword = "1234";
	
	private static final String GET_ALL_USERNAME = "select username from user";
	private static final String CHECK_USER_BY_UN = "select password, role from user where username = ?";
	private static final String INSERT_NEW_USER = "insert into user (username, email, password) "
			+ "values(?,?,?)";
	
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
	
	private boolean existed(User user) {
		List<String> existedName = new ArrayList<>();
		try (
				Connection connection = getConnection();
				PreparedStatement ps = connection.prepareStatement(GET_ALL_USERNAME);
			) {
			
			ResultSet rs = ps.executeQuery();
			while (rs.next()) {
				existedName.add(rs.getString("username"));
			}
			if (existedName.contains(user.getUsername())) {
				return true;
			}
		} catch (SQLException e) {
			// TODO: handle exception
			e.printStackTrace();
		}
		return false;
	}
	
	public List<String> getUsername() {
		List<String> usernames = new ArrayList<>();
		try (
				Connection connection = getConnection();
				PreparedStatement ps = connection.prepareStatement(GET_ALL_USERNAME);
			) {
			
			ResultSet rs = ps.executeQuery();
			while (rs.next()) {
				usernames.add(rs.getString("username"));
			}
		} catch (SQLException e) {
			// TODO: handle exception
			e.printStackTrace();
		}
		return usernames;
	}
	
	public Map<String, String> registerUser(User user) {
		if (existed(user)) {
			return makeResponse("User already existed!");
		}
		try (
				Connection connection = getConnection();
				PreparedStatement ps = connection.prepareStatement(INSERT_NEW_USER);
			) {
			
			ps.setString(1, user.getUsername());
			ps.setString(2, user.getEmail());
			ps.setString(3, user.getPassword());

			ps.execute();
			return makeResponse("Success!");
		} catch (SQLException e) {
			// TODO: handle exception
			e.printStackTrace();
		}
		return makeResponse("Internal error");
	}
	
	public Map<String, String> userLogin(User user) {
		try (
				Connection connection = getConnection();
				PreparedStatement ps = connection.prepareStatement(CHECK_USER_BY_UN);
			) {
			ps.setString(1, user.getUsername());
			ResultSet rs = ps.executeQuery();
			String role = "";
			while (rs.next()) {
				if (!user.getPassword().equals(rs.getString("password"))) {
					return makeResponse("Wrong password!");
				}
				role = rs.getString("role");
			}
			
			// check admin
			if (role.equals("admin")) {
				return makeResponse("valid0");				
			} else if (role.equals("user")) {
				return makeResponse("valid1");				
			}
			return makeResponse("null");
		} catch (SQLException e) {
			// TODO: handle exception
			e.printStackTrace();
		}
		return makeResponse("Internal error");
	}
}
