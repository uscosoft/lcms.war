<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1" %>
<!-- charset=UTF-8"
    pageEncoding="UTF-8" -->
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1">
<title>PROGRAMAS</title>

<% 
	out.println("<p><a href='../usuario/index.jsp'><img src='../icons/action_back.gif'>	Volver</a>");
%>	
	<link rel="stylesheet" type="text/css" href="../extjs/shared/example.css" />

	<style>
		.icon-adicionar{
			background-image: url('../icons/add.png') !important;
		}
		.icon-modificar {
			background-image: url('../icons/disk.png') !important;
		}
		.icon-eliminar {
			background-image: url('../icons/delete.png') !important;
		}
	</style>
	
	<!-- GC -->

    <script type="text/javascript" src="../extjs/shared/include-ext.js"></script>
    <script type="text/javascript" src="../extjs/shared/options-toolbar.js"></script>

    <!-- page specific -->
	<script type="text/javascript" src="forma-programa.js"></script>
    <script type="text/javascript" src="grid-programa.js"></script>
    
</head>
<body>
	<h1 align="center"><font face = "verdana" color = "dark">PROGRAMAS ACADÉMICOS OFRECIDOS </font></h1>
    <br/>
    <br/>
    
    <!-- a place holder for the grid. requires the unique id to be passed in the javascript function, and width and height ! -->
   
    <center><div id="example-grid"></div></center>
   
    
</body>
</html>