<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>

<%@ page import="org.uscosoft.recurso.*" %>    
<%@ page import="java.util.*" %>
    
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Insert title here</title>
</head>
<body>

<%
	Recurso recurso = new Recurso();
	ArrayList listaRecursos = recurso.getRecursos();
	
	String nombre1 = "Maria";
	session.setAttribute("nombre", nombre1);
	
	
	String id = session.getId();
	out.println("Id de la session = " + id);
	
	out.println("<br/><a href='biblioteca.jsp'>Ver Biblioteca</a>");
	
	out.println("<table border='1'>");
	
	for (int i=0; i<listaRecursos.size(); i++){ 
		String [] datos = (String [])listaRecursos.get(i);
		
		String codigo = datos[0];
		String nombre = datos[1];
		String descripcion = datos[2];
		String tipo = datos[3];
		String url = datos[4];
		
		out.println("<tr>");
		//out.println("<td><img width='100' height='100' src='../imagenes/" + dato[1] + "'></td>");
		out.println("<td valign='top'>" + nombre);
		out.println("<p>" + descripcion + "</p>");
		out.println("<p>URL: <a href='" + url + "'>" + url + "</a></p>");
		out.println("<p><a href='adicionar.jsp?codigo=" + codigo + "'>Adicionar</a></p>");
		out.println("</td>");
		out.println("</tr>");
	} 
	
	out.println("</table>");
%>

</body>
</html>