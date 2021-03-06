package com.mcnc.bizmob.emulator.web;

import java.io.IOException;
import java.io.PrintWriter;
import java.net.URLDecoder;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.message.BasicNameValuePair;
import org.apache.http.util.EntityUtils;

/**
 * Servlet implementation class EmulatorServlet
 */
public class EmulatorServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
    
	private static final String SERVER_URL =  "http://127.0.0.1:8288/sfa"; //http://112.169.182.145:8877/ipm   
	//private static final String SERVER_URL =  "http://112.169.182.144:8876/sfa";
    /**
     * @see HttpServlet#HttpServlet()
     */
    public EmulatorServlet() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String jsonData = process(request);
		String callback = request.getParameter("jsonpcallback");
		String output = callback + "(" + jsonData + ");";
		
		response.setContentType("text/javascript");
		response.setCharacterEncoding("utf-8");
		PrintWriter out = response.getWriter();
		out.println(output);
	}

	private String process(HttpServletRequest request) throws IOException {
		
		String path = request.getPathInfo();
		String url = SERVER_URL.concat(path);
		
		String message = request.getParameter("message");
		System.out.println("##Request##");
		System.out.println("url : " + url);
		message = URLDecoder.decode(message, "UTF-8");
		System.out.println(message);
		
		List<BasicNameValuePair> params = new ArrayList<BasicNameValuePair>();
		params.add(new BasicNameValuePair("message", message));
    	HttpResponse response = HttpClientHelper.requestPost(url, params, HttpClientHelper.getLocalContext());
    	
    	HttpEntity entity = response.getEntity();
    	String str = EntityUtils.toString(entity);
    	System.out.println("##Response##");
    	System.out.println(str);
    	 
    	return str;
	}

	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
		String jsonData = process(req);
		resp.setContentType("application/json");
		resp.setCharacterEncoding("utf-8");
		PrintWriter out = resp.getWriter();
		out.println(jsonData);
	}
}
