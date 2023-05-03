package com.LTW.LTW.Backend;

import java.io.IOException;
import java.sql.Connection;
import java.sql.Date;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import com.LTW.LTW.ImageHandler.ImageService;
import com.LTW.LTW.Objects.Book;

public class BookDAO {
	private String jdbcURL = "jdbc:mysql://localhost:3306/LTWBook";
	private String jdbcUsername = "root";
	private String jdbcPassword = "1234";
	
	private static final String SELECT_ALL_BOOK = "select * from book";
	private static final String SELECT_BOOK_BY_ID = "select * from book where bookId=?";
	private static final String SELECT_BOOKCOVER_BY_ID_STRING = "select coverPath from book where bookId=?";
	private static final String CHECK_BOOK_EXISTENCE = "select * from book where bookId!=? and title=? and author=?";
	private static final String INSERT_BOOKS_SQL = 
			"insert into book (title, author, description, releaseDate, categoryId, price, pageNum, coverPath) "
			+ "values(?,?,?,?,?,?,?,?)";
	private static final String UPDATE_BOOKS_SQL = "update book set title=?,author=?,description=?,releaseDate=?,"
			+ "categoryId=?,price=?,pageNum=?,coverPath=?"
			+ " where bookId=?";
	private static final String DELETE_BOOK_SQL_STRING = "delete from book where bookId=?";
	
	public BookDAO() {
		
	}
	
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
	
	public List<Book> selectAll() {
		List<Book> books = new ArrayList<>();
		try (
			Connection connection = getConnection();
			PreparedStatement ps = connection.prepareStatement(SELECT_ALL_BOOK);
		) {
			ResultSet resultSet = ps.executeQuery();
			while (resultSet.next()) {
				int id = resultSet.getInt("bookId");
				String title = resultSet.getString("title");
				String author = resultSet.getString("author");
				String description = resultSet.getString("description");
				Date date = resultSet.getDate("releaseDate");
				int categoryId = resultSet.getInt("categoryId");
				int price = resultSet.getInt("price");
				int pageNum = resultSet.getInt("pageNum");
				String coverPath = resultSet.getString("coverPath");
				
				books.add(new Book(id, title, author, description, date, categoryId, price, pageNum, coverPath));
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return books;
	}
	
	public Book selectById(int id) {
		Book book = new Book();
		try (
				Connection connection = getConnection();
				PreparedStatement ps = connection.prepareStatement(SELECT_BOOK_BY_ID);
			) {
				ps.setInt(1, id);
				ResultSet resultSet = ps.executeQuery();
				while (resultSet.next()) {
					int bookId = resultSet.getInt("bookId");
					String title = resultSet.getString("title");
					String author = resultSet.getString("author");
					String description = resultSet.getString("description");
					Date date = resultSet.getDate("releaseDate");
					int categoryId = resultSet.getInt("categoryId");
					int price = resultSet.getInt("price");
					int pageNum = resultSet.getInt("pageNum");
					String coverPath = resultSet.getString("coverPath");
					
					book = new Book(bookId, title, author, description, date, categoryId, price, pageNum, coverPath);
				}
			} catch (SQLException e) {
				e.printStackTrace();
			}
		return book;
	}
	
	private boolean existed(Book book) {
		try (
				Connection connection = getConnection();
				PreparedStatement ps = connection.prepareStatement(CHECK_BOOK_EXISTENCE);
			) {
			
			ps.setInt(1, book.getBookId());
			ps.setString(2, book.getTitle());
			ps.setString(3, book.getAuthor());
			ResultSet rs = ps.executeQuery();
			while (rs.next()) {
				return true;
			}
		} catch (SQLException e) {
			// TODO: handle exception
			e.printStackTrace();
		}
		return false;
	}
	
	public byte[] getBookCover(int bookId) throws IOException {
		String filePath = "";
		try (
			Connection connection = getConnection();
			PreparedStatement ps = connection.prepareStatement(SELECT_BOOKCOVER_BY_ID_STRING);
		) {
			ps.setInt(1, bookId);
			ResultSet resultSet = ps.executeQuery();
			while (resultSet.next()) {
				filePath = resultSet.getString("coverPath");
			}
		} catch (SQLException e) {
			e.printStackTrace();
			return null;
		}
		return ImageService.getImageData(filePath);
	}
	
	public String save(Book book) {
		if (existed(book)) {
			return "Book already existed!";
		}
		if (book.getTitle().trim().equals("")) {
			return "Book title musn't be empty!";
		}
		//save and get image path
		String imgPath = "";
		try {
			imgPath = ImageService.uploadImage(book.getImageFile());
			//check if saving image successful or not
			if (imgPath.equals(null)) {
				return "Can't save image to local storage, operation aborted!";
			}
		} catch (IOException e) {
			e.printStackTrace();
			return "Can't save image to local storage, operation aborted!";
		}
		try (
				Connection connection = getConnection();
				PreparedStatement ps = connection.prepareStatement(INSERT_BOOKS_SQL);
			)
		{

			ps.setString(1, book.getTitle());
			ps.setString(2, book.getAuthor());
			ps.setString(3, book.getDescription());
			ps.setDate(4, book.getReleaseDate());
			ps.setInt(5, book.getCategoryId());
			ps.setInt(6, book.getPrice());
			ps.setInt(7, book.getNumPage());
			ps.setString(8, imgPath);

			ps.execute();

			return "Save book successful!";
		} catch (Exception e) {
			e.printStackTrace();
		}
		return "Internal error!";
	}
	
	public String edit(Book book) {
		if (existed(book)) {
			return "Book already existed!";
		}
		if (book.getTitle().trim().equals("")) {
			return "Book title musn't be empty!";
		}
		//save and get image path
		String imgPath = "";
		try {
			imgPath = ImageService.uploadImage(book.getImageFile());
			//check if saving image successful or not
			if (imgPath.equals(null)) {
				return "Can't save image to local storage, operation aborted!";
			}
		} catch (IOException e) {
			e.printStackTrace();
			return "Can't save image to local storage, operation aborted!";
		}
		try (
				Connection connection = getConnection();
				PreparedStatement ps = connection.prepareStatement(UPDATE_BOOKS_SQL);
			)
		{

			ps.setString(1, book.getTitle());
			ps.setString(2, book.getAuthor());
			ps.setString(3, book.getDescription());
			ps.setDate(4, book.getReleaseDate());
			ps.setInt(5, book.getCategoryId());
			ps.setInt(6, book.getPrice());
			ps.setInt(7, book.getNumPage());
			ps.setString(8, imgPath);

			ps.execute();

			return "Save book successful!";
		} catch (Exception e) {
			e.printStackTrace();
		}
		return "Internal error!";
	}
	
	public String delete(int id) {
		try (
				Connection connection = getConnection();
				PreparedStatement ps = connection.prepareStatement(DELETE_BOOK_SQL_STRING);
		) {
			ps.setInt(1, id);
			ps.execute();
			
			return "Delete book successfully!";
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return "Internal error!";
	}
}
