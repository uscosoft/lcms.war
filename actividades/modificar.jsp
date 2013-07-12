<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
    
        <%@ page import="java.sql.*"%>
<%@ page import="org.uscosoft.utilidad.BaseDato"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Modificado Correctamente</title>
</head>
<body>


    <%
    BaseDato basedato = new BaseDato();
    Connection conexion1 = null;
    Statement stmt =null;
    %>
    <h1>Modificado Correctamente</h1>
    <%
    
    String codigo = request.getParameter("actividad");
    String nombre = request.getParameter("nombre");
  
   
   
   
    try {
    	
    	
    	//lo hicimos con ADMINISTRADOR_SISTEMA por que con DOCENTE  no quería funcionar :( 
    			
    			
    	 conexion1 = basedato.getConexion("DOCENTE");

		// CREAMOS UNA NUEVA CONEXION
		

   
   
		
//DESIGNAMOS LOS CAMPOS DONDE VAMOS A INSERTAR DATOS
		
 
		String sql = "UPDATE actividad SET act_nombre = '"+nombre+"' WHERE act_codigo = '"+codigo+"';;";

		
		
		
		stmt = conexion1.createStatement();
		stmt.executeUpdate(sql);



	}
    
	catch (SQLException e) {
	
	}
    finally{
   
    	conexion1.close();
    }
%>

</body>
</html>