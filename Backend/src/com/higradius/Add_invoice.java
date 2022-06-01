package com.higradius;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.HashMap;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpServlet;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

/**
 * Servlet implementation class Add_invoice
 */
@SuppressWarnings("unused")
@WebServlet("/Add_invoice")
public class Add_invoice extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public Add_invoice() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		String DB_URI = "jdbc:mysql://localhost:3306/grey_goose";
		String USERNAME = "root";
		String PASSWORD = "abcd1234";
		try {
			HashMap<Object, Object> Response = new HashMap<Object, Object>();
			Class.forName("com.mysql.cj.jdbc.Driver");
			Connection con = DriverManager.getConnection(DB_URI, USERNAME, PASSWORD);
			
			String businessCode = request.getParameter("business_code");
			String customerNumber = request.getParameter("cust_number");
			String clearDate = request.getParameter("clear_date");
			String buisnessYear = request.getParameter("buisness_year");
			String docId = request.getParameter("doc_id");
			String postingDate = request.getParameter("posting_date");
			String documentCreateDate = request.getParameter("document_create_date");
			String dueDate = request.getParameter("due_in_date");
			String invoiceCurrency = request.getParameter("invoice_currency");
			String documentType = request.getParameter("document_type");
			String postingId = request.getParameter("posting_id");
			String openAmount = request.getParameter("total_open_amount");
			String baselineCreateDate = request.getParameter("baseline_create_date");
			String customerPaymentTerms = request.getParameter("cust_payment_terms");
			String invoiceId = request.getParameter("invoice_id");
			
			String sql = "INSERT INTO winter_internship (business_code, cust_number, clear_date, buisness_year, doc_id, posting_date, document_create_date, due_in_date, invoice_currency, document_type, posting_id, total_open_amount, baseline_create_date, cust_payment_terms, invoice_id) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
			
			PreparedStatement ps = con.prepareStatement(sql);
			ps.setString(1, businessCode);
			ps.setString(2, customerNumber);
			ps.setString(3, clearDate);
			ps.setString(4, buisnessYear);
			ps.setString(5,  docId);
			ps.setString(6, postingDate);
			ps.setString(7, documentCreateDate);
			ps.setString(8, dueDate);
			ps.setString(9, invoiceCurrency);
			ps.setString(10, documentType);
			ps.setString(11, postingId);
			ps.setString(12, openAmount);
			ps.setString(13, baselineCreateDate);
			ps.setString(14, customerPaymentTerms);
			ps.setString(15, invoiceId);
			
			if(ps.executeUpdate()>0) {
				Response.put("insert",true);
			}else {
				Response.put("insert", false);
			}
			
			Gson gson = new Gson();
			String JSONresponse = gson.toJson(Response);
			response.setHeader("Access-Control-Allow-Origin", "*");
			
			response.getWriter().append(JSONresponse);
		} catch(Exception e) {
			System.out.println(e);
		}
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}
}
