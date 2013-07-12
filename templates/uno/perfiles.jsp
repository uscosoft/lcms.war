<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">

<div class="perfiles">
			
			<a href="../../index.jsp">Home</a>
			<a href="../../usuario/">Ingresar</a>
			
            <!-- Main hero unit for a primary marketing message or call to action -->
            <div class="hero-unit">
                <h1 align="center"><font face = "verdana" color = "black">PERFILES DE ACCESO AL SISTEMA</h1>
				<center>
				<img src="../../imagenes/perfil.jpg" vspace="6" hspace="6"/>
				</center>
				<br/>				
                <p><font face = "verdana" color = "black">Al LCMS dependiendo del rol que le asigne el administrador del sistema, usted tendra acceso
				a diferentes paneles principales dependiendo de dicho rol. A continuacion se listan los perfiles 
				del sistema.</p>
                <!--<p><a class="btn btn-primary btn-large">Learn more &raquo;</a></p>-->
            </div>
			<br/>
			
            <!-- Example row of columns -->
            <div class="row">
                <div class="span4">
                    <h2><font face = "verdana" color = "black">ADMINISTRADOR</h2>
                    <p><font face = "verdana" color = "black"><img src="../../imagenes/perfil_administrador.jpg" vspace="4" hspace="4" align="right"/>Este perfil es el que tendra todos los privilegiso del sistema. Podra gestionar cursos, es decir, 
					crear cursos, asignarle el nombre, el docente y lo demas; eliminar cursos existentes asi como modificar
					la informacion de estos. Gestionar programas, crear nuevos programas, modificar la informacion de los
					ya existente y eliminarlos. Gestionar usuarios y asiganrle los perfiles a estos.</p>
                    <!--<p><a class="btn" href="formulario.html">Solicitar registro &raquo;</a></p>-->
                </div>
				
				<br/>
				<br/>
				<br/>
				<br/>
				
				<div class="span4">
                    <h2><font face = "verdana" color = "black">DOCENTE</h2>
                    <p><font face = "verdana" color = "black"><img src="../../imagenes/perfil_docente.jpg" vspace="4" hspace="4" align="left"/>Este perfil es el que tendran todas las personas que dicten algun curso en el sistema. Este
					usuario podra crear cursos que él dictará, asi como modificar y elminar cursos dicatdos por este mismo.
					Tambien solo podra observar todos los cursos registrados en el sistema sin privilegio alguno.</p>
                    <!--<p><a class="btn" href="#">View details &raquo;</a></p>-->
               </div>
			   
			   <br/>
			   <br/>
			   <br/>
			   <br/>
			   <br/>
			   <br/>
			   <br/>
			   
                <div class="span4">
                    <h2><font face = "verdana" color = "black">ESTUDIANTE</h2>
                    <p><font face = "verdana" color = "black"><img src="../../imagenes/perfil_estudiante.jpg" vspace="4" hspace="4" align="right"/>Este perfil es el que tendran las personas que esten tomando algun curso del sistema. Este 
					usuario podrá registrar los cursos que desea aprender, puede listar los cursos que está tomando
					en la actualidad, puede mirar las notas obtenidads en cada curso asi como las actividades de cada 
					uno de ellos.</p>
                    <!--<p><a class="btn" href="#">View details &raquo;</a></p>-->
                </div>
				
            </div>

            
			<br/>
			<br/>
			<br/>
			<br/>
			<br/>
			<br/>
			<br/>
			<br/>
			<br/>
			
			<hr>
			
            <jsp:include page="footer.jsp"></jsp:include>

    </div> <!-- /container -->