<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>LCMS</title>
</head>
<body>


<%
		String usuario = request.getUserPrincipal().getName();	
		out.println("<b><p>USUARIO: " + usuario + "</b>");	
	
		//out.println("<p>Perfiles: ");		
		if(request.isUserInRole("ADMINISTRADOR")){
			//out.println("<p>Administrador del Sistema");	
%>		
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
		out.println("<p><center><a href='../curso/index.jsp'><img src='../icons/book_open.png'> CURSOS</a>");		
		out.println("<p><a href='../programa/index.jsp'><img src='../icons/book.png'> PROGRAMAS</a>");
		
		out.println("<br/>");
		out.println("<br/>");
		
		out.println("<p><a href='../users/index.jsp'><img src='../icons/group.png'> USUARIOS</a>");
		out.println("<p><a href='../perfil/index.jsp'><img src='../icons/user_red.png'> ASIGNAR PERFIL</a>");
		
		out.println("<br/>");
		out.println("<br/>");
		out.println("<br/>");
			
		out.println("<p><a href='salir.jsp'><img src='../icons/door_out.png'> Cerrar Sesión</a></center>");
%>

		<br/>
		<br/>
		<br/>
		
		<img  align = "left" height = "150" width = "250" src="../imagenes/tds.png"/>
		<img  align = "right" height = "150" width = "250" src="../imagenes/entrada_principal.jpg"/>
		
<%	
	}
	
	if(request.isUserInRole("DOCENTE")){
		//out.println("<p>Docente");
%>	
		<center>
		<a href = "http://www.usco.edu.co/" target=_blank style="FONT-FAMILY: 'AR PL UMing CN';">
			<img  height = "150" width = "250" src="../imagenes/usco.jpg"/></a>
		</center>		
		<br/>
		<br/>	
			
		<h1 align="center"><font face = "verdana" color = "red">BIENVENIDO DOCENTE</font></h1>
		<br/>
		<br/>
<% 
		out.println("<br>");
		out.println("<br>");
		out.println("<p><center><a href='../curso_docente/index.jsp'><img src='../icons/book_open.png'> CURSOS</a>");
		out.println("<p><a href='../estudiantes_curso/index.jsp'><img src='../icons/group.png'> ESTUDIANTES POR CURSO</a>");
		
		out.println("<br/>");
		out.println("<br/>");
		out.println("<br/>");
			
		out.println("<p><a href='salir.jsp'><img src='../icons/door_out.png'> Cerrar Sesión</a></center>");
%>
		<br/>
		<br/>
		<br/>
		
		<img  align = "left" height = "150" width = "250" src="../imagenes/tds.png"/>
		<img  align = "right" height = "150" width = "250" src="../imagenes/entrada_principal.jpg"/>
		
<%	
	}			

	if(request.isUserInRole("ESTUDIANTE")){
		//out.println("<p>Estudiante");	
%>
	<center>
		<a href = "http://www.usco.edu.co/" target=_blank style="FONT-FAMILY: 'AR PL UMing CN';">
			<img  height = "150" width = "250" src="../imagenes/usco.jpg"/></a>
		</center>		
		<br/>
		<br/>	
			
		<h1 align="center"><font face = "verdana" color = "red">BIENVENIDO ESTUDIANTE</font></h1>
		<br/>
		<br/>
<% 
		out.println("<br>");
		out.println("<br>");
		out.println("<p><center><a href=''><img src='../icons/book_open.png'> MIS CURSOS</a>");
		out.println("<p><a href=''><img src='../icons/folder_Table.png'> INSCRIBIR CURSOS</a>");
		
		out.println("<br/>");
		out.println("<br/>");
		out.println("<br/>");
			
		out.println("<p><a href='salir.jsp'><img src='../icons/door_out.png'> Cerrar Sesión</a></center>");
%>
		<br/>
		<br/>
		<br/>
		
		<img  align = "left" height = "150" width = "250" src="../imagenes/tds.png"/>
		<img  align = "right" height = "150" width = "250" src="../imagenes/entrada_principal.jpg"/>
		
<%		
	}
	if(request.isUserInRole("EGRESADO")){
		//out.println("<p>Egresado");	
	}
%>	

</body>
</html>