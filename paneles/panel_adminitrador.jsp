<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Insert title here</title>
</head>
<body>

		<center>
		<a href = "http://www.usco.edu.co/" target=_blank style="FONT-FAMILY: 'AR PL UMing CN';">
			<img  height = "150" width = "250" src="../imagenes/usco.jpg"/></a>
		</center>		
		<br/>
		<br/>	
			
		<h1 align="center"><font face = "verdana" color = "red">BIENVENIDO ADMINISTRADOR</font></h1>
		<br/>
		<br/>
		
		<%			
		out.println("<br>");
		out.println("<br>");
		out.println("<p><center><a><img src='../icons/book_open.png'>CURSOS</a>");
		out.println("<p><a><img src='../icons/group.png'>USUARIOS</a>");
		out.println("<p><a href='../programa/index.jsp'><img src='../icons/book.png'>PROGRAMAS</a>");
		
		out.println("<br/>");
		out.println("<br/>");
		out.println("<br/>");
			
		out.println("<p><a href='salir.jsp'><img src='../icons/door_out.png'>Cerrar Sesión</a></center>");
		%>
		
		<br/>
		<br/>
		<br/>
		
		<img  align = "left" height = "150" width = "250" src="../imagenes/tds.png"/>
		<img  align = "right" height = "150" width = "250" src="../imagenes/entrada_principal.jpg"/>
</body>
</html>