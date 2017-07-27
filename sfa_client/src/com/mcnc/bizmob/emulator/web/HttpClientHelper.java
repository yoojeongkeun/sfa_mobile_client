/*
 * HttpHelper.java
 * Copyright 2010, MOBILE C&C LTD. All rights reserved.
 * 2011. 6. 24.
 */

package com.mcnc.bizmob.emulator.web;

import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.ArrayList;
import java.util.List;
import java.util.StringTokenizer;

import org.apache.http.Header;
import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.HttpVersion;
import org.apache.http.client.CookieStore;
import org.apache.http.client.HttpClient;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.client.protocol.ClientContext;
import org.apache.http.impl.client.BasicCookieStore;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.http.message.BasicNameValuePair;
import org.apache.http.params.CoreProtocolPNames;
import org.apache.http.protocol.BasicHttpContext;
import org.apache.http.protocol.HTTP;
import org.apache.http.protocol.HttpContext;
import org.apache.http.util.EntityUtils;

public class HttpClientHelper {
	
	static HttpPost httppost;
	  
    public static HttpClient getHttpClient() {
        HttpClient httpclient = new DefaultHttpClient();
        httpclient.getParams().setParameter(CoreProtocolPNames.PROTOCOL_VERSION, HttpVersion.HTTP_1_1);
        httpclient.getParams().setParameter(HTTP.USER_AGENT, "Mozilla/4.0");
//        httpclient.getParams().setParameter(HTTP.CONTENT_ENCODING, "gzip, deflate");
        httpclient.getParams().setParameter(HTTP.CHARSET_PARAM, HTTP.UTF_8);
        
        return httpclient;
    }

    /**
     * Get local context with cookie store
     * @return HttpContext
     */
    public static HttpContext getLocalContext() {
    	
        CookieStore cookieStore = new BasicCookieStore();
        HttpContext localContext = new BasicHttpContext();
        localContext.setAttribute(ClientContext.COOKIE_STORE, cookieStore);

        return localContext;
    }

    /**
     * POST 방식으로 request를 보낸다.
     * @param destURL 대상 URL
     * @param params POST로 보낼 파라미터
     * @param context Cookie와 같은 부가 정보
     * @return HttpResponse
     */
    @SuppressWarnings({ "rawtypes", "unchecked" })
    public static HttpResponse requestPost(String destURL, List params, HttpContext context) {
        HttpClient httpclient = getHttpClient();
        
        if(httppost == null || destURL.indexOf("LOGIN.json") > 0) {
        	httppost = new HttpPost(destURL);	
        } else {
        	try {
				httppost.setURI(new URI(destURL));
			} catch (URISyntaxException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
        }
        
        long startTime = 0;
        long endTime = 0;

        try {
            UrlEncodedFormEntity reqEntity = new UrlEncodedFormEntity(params, HTTP.UTF_8);
            reqEntity.setContentType("application/x-www-form-urlencoded; charset=UTF-8");
            
            httppost.setEntity(reqEntity);            
            
            startTime = System.currentTimeMillis();
            HttpResponse response = httpclient.execute(httppost);
            
            
            if(httppost.getHeaders("Cookie").length == 0) {
            	Header[] header = response.getHeaders("set-cookie");
            	if(header.length>0)
            	{
            		String cookie = header[0].getValue();
            		httppost.setHeader("Cookie", cookie);	
            	}
            }
            endTime = System.currentTimeMillis();

            return response;
        } catch (Exception e) {
            endTime = System.currentTimeMillis();
            e.printStackTrace();

            return null;
        } finally {
//            httpclient.getConnectionManager().shutdown();
            System.out.println("### Http Running Time : " + (endTime - startTime) + "ms");
        }
    }

    /**
     * String -> Unicode 문자열(16진수)
     * @param str
     * @return
     */
    public static String toUniStr(String str) {
        String uni = "";

        for (int i = 0; i < str.length(); i++) {
            char chr = str.charAt(i);
            String hex = Integer.toHexString(chr);
            uni += "\\u" + hex;
        }

        return uni;
    }

    /**
     * Unicode 문자열(16진수) -> String
     * @param uni
     * @return
     */
    public static String toNonUniStr(String uni) {
        String str = "";

        StringTokenizer str1 = new StringTokenizer(uni, "\\u");

        while (str1.hasMoreTokens()) {
            String str2 = str1.nextToken();
            int i = Integer.parseInt(str2, 16);
            str += (char) i;
        }
        
        return str;
    }
    
    public static void main(String[] args) throws IllegalStateException, IOException {
    	
    	String url = "http://100.100.100.101/dongwon/DW0103.json";
    	List<BasicNameValuePair> params = new ArrayList<BasicNameValuePair>();
    	String message = "{\"header\":{" +
    			"\"result\":true,\"error_code\":\"\",\"error_text\":\"\"," +
    			"\"info_text\":\"\",\"message_version\":\"1.0\"," +
    			"\"login_session_id\":\"\",\"trcode\":\"DW0103\"}," +
    			"\"body\":{\"P_MAKTX\":\"\",\"P_MATNR\":\"12326\",\"P_PRODH\":\"\"}}";
    	params.add(new BasicNameValuePair("message", message));
    	HttpResponse response = HttpClientHelper.requestPost(url, params, HttpClientHelper.getLocalContext());
    	
    	 if(response.getStatusLine().getStatusCode() != 200) {
             System.out.println("Failed to connect " + url);
             System.out.println(" Cause: " + response.getStatusLine().getReasonPhrase());
             
         } else {
        	 HttpEntity entity = response.getEntity();
        	 String str = EntityUtils.toString(entity);
        	 System.out.println(str);
         }
    }
}
