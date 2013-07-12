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
	// obtenemos el parametro codigo	
	String codigo = request.getParameter("codigo");

	// declaramos un objeto lista de tipo Vector
	Vector lista;
	
	// obtenemos el objeto lista(el vector)
	lista = (Vector)session.getAttribute("lista");
	
	// si el vector no existe, lo creamos (new)
	if(lista == null){
		lista = new Vector();
	}
	
	// adicionamos el codigo al vector lista
	lista.addElement(codigo);
	
	// adicionamos el vector lista a la session
	session.setAttribute("lista", lista);
	
	response.sendRedirect("index.jsp");
%>

</body>
</html>