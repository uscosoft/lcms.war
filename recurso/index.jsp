<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1">
<title>XML Grid Example</title>
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
	<script type="text/javascript" src="forma-recurso.js"></script>
    <script type="text/javascript" src="grid-recurso.js"></script>
</head>
<body>
    <h1>XML Grid Example</h1>
    
    <!-- a place holder for the grid. requires the unique id to be passed in the javascript function, and width and height ! -->
    <div id="example-grid"></div>
</body>
</html>
