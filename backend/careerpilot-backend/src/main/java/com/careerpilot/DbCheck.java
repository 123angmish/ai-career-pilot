package com.careerpilot;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;

public class DbCheck {
    public static void main(String[] args) {
        String url = "jdbc:mysql://localhost:3306/careerpilot";
        String user = "root";
        String password = "devmanoj@3010";

        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
            Connection conn = DriverManager.getConnection(url, user, password);
            Statement stmt = conn.createStatement();
            ResultSet rs = stmt.executeQuery("SELECT id, email, full_name FROM users");

            System.out.println("Users in db:");
            while (rs.next()) {
                System.out.println("ID: " + rs.getLong("id") + ", Email: " + rs.getString("email") + ", Name: " + rs.getString("full_name"));
            }

            rs.close();
            stmt.close();
            conn.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
