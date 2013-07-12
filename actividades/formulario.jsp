<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Gestionar Actividades</title>
<body>
<h2>GESTIONAR ACTIVIDADES</h2>


<form name="formulario"  method="POST">
	<p>Actividades <input type="text" name="actividad">
	<p>Descripcion <input type="text" name="nombre">
	
	
	
	<p><input type="submit" onclick = "this.form.action = 'agregar.jsp'" value="Agregar">  
 	<input type="submit" onclick = "this.form.action = 'modificar.jsp'" value="Modificar">
	<input type="submit" onclick = "this.form.action = 'eliminar.jsp'" value="Eliminar">
</form> 

</body>
</html>
</head>