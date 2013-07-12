
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<%@ page import="java.sql.*"%>
<%@ page import="org.uscosoft.utilidad.BaseDato"%>


<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Insert title here</title>
</head>
<body>

	<h1>Gestion de actividades1</h1>
	
<%
BaseDato basedato = new BaseDato();
Connection conexion1 = null;
Statement sentencia1= null;
ResultSet rs1 = null;
String sql= "";
%>



			<%
			
			
			try{
				
			conexion1 = basedato.getConexion("DOCENTE");	
			sentencia1 = conexion1.createStatement(); 
			
			sql = "select * from actividad";
			rs1 = sentencia1.executeQuery(sql);
%>
			
			<TABLE BORDER="1"> 
			 <TR> 
          <TH>Codigo </TH> <TH> Actividad </TH>
     </TR> 
			<%
			while(rs1.next()){
			String nombre = rs1.getString("act_nombre");
		 int codigo = rs1.getInt("act_codigo");
			
			
			%>
  	 	<TR>
        <TD><%=codigo %> </TD> <TD><%=nombre %></TD> 
		</TR> 

			
			<% 
}
}
 
catch (Exception e) {
	
	e.printStackTrace();
}
			finally{
				
				conexion1.close();
			}
			
%>
</TABLE>
<br>


	

	<a href="formulario.jsp">AGREGAR</a>
	<a href="formulario.jsp">ELIMINAR</a>
	<a href="formulario.jsp">MODIFICAR</a>
	<br>
	<br>





</body>
</html>