<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Acceso al sistema</title>
</head>
<% 
	out.println("<p><a href='../'><img src='../icons/action_back.gif'>	Volver</a>");
%>
<body>

	<table align="center" bgcolor="maroon" cellpadding="2" cellspacing="5" border="10" id="table">
	
	<tr>
	<td bgcolor="black">
	
	<table cellpadding="8" cellspacing="3" border="5">
	
	<tr>
	<td bgcolor="olive" align="center">
		
		<b><font size="4" color="black" face="verdana"> INGRESAR </font></b>	
	</tr>
	
	<tr>
	<td bgcolor="silver"><br>
	
	<form action="j_security_check" method="POST">
	
	<table>
	
	<tr>
	<td><font face="verdana" size="2"><img src="../login/User.gif"> Usuario:</font></td>
	<td><input type="text" name="j_username"></td>
	</tr>
	
	<tr>
	<td><font face="verdana" size="2"><img src="../login/Key.gif"> Clave:</font></td>
	<td><input type="password" name="j_password"></td>
	</tr>
	
	<tr>	
	<td align="center" colspan="2">	<input type="submit" value="Ingresar">
					<input type="reset" value="Limpiar"></td>
	</tr>
	
	</form> 
	
	<center>
	<img src="../imagenes/logos_uscosoft/USCOSOFT25.jpg">
	</center>
</body>
</html>
