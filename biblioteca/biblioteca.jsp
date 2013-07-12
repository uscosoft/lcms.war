<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
    
<%@ page import="java.util.*" %>
    
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Insert title here</title>
</head>
<body>

<%

	try{
		//session.invalidate();
		session.removeValue("nombre");
	}
	catch(Exception e){
		System.out.println("Error: " + e.toString());	
	}
	
	String nombre = (String)session.getAttribute("nombre");
	out.println(nombre);

	out.println("Mi Biblioteca");
	
	out.println("<a href='index.jsp'>Ver Recursos</a>");

	// declaramos un objeto lista de tipo Vector
	Vector lista;
	
	// obtenemos el objeto lista(el vector)
	lista = (Vector)session.getAttribute("lista");
	
	// si el vector no existe, lo creamos (new)
	if(lista != null){
		
		for(int i=0; i<lista.size(); i=i+1){
			String codigo = (String)lista.elementAt(i);
			out.println("<p>" + codigo + "</p>");
		}
		
	}
%>

</body>
</html>