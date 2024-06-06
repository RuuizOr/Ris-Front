<html>
	<head>
	<title>Dioses De La Mitologia Azteca</title>		
		<link rel="shortcut icon"type="image/x-icon"href="imagenes/favicon2.png">
		<link href="css/bootstrap.min.css" rel="stylesheet">
		<script src="js/bootstrap.bundle.min.js"></script>
		<link rel="stylesheet" href="css/styles.css">
		<meta http-equiv="Content-Type" content="text/html" charset="UTF-8" />
		<script src="https://cdn.jsdelivr.net/npm/sweetalert2@11.4.17/dist/sweetalert2.min.js"></script>
		<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/sweetalert2@11.4.17/dist/sweetalert2.min.css">
	</head>
	<body>
		<div class="row rowMenu">
			<div class="col-md-1">
				<img src="imagenes/logo.png" width="90px">
			</div>
			<div class="col-md-3 text-center"><br>
				<h4><i><b>"Un mundo nuevo, el cual, desconocias"</b></i></h4>
			</div>
			<div class="col-md-8" id="menu"><br>
				<ul class="nav justify-content-center menu">
					<li class="nav-item"><a class="nav-link" href="DiosesAztecas.html"><b>Inicio</b></a></li>
					<li class="nav-item"><a class="nav-link" href="Proposito.html"><b>Propósito</b></a></li>
					<li class="nav-item"><a class="nav-link" href="Galeria.html"><b>Galería</b></a></li>
					<li class="nav-item"><a class="nav-link" href="Videos.html"><b>Videos</b></a></li>
					<li class="nav-item"><a class="nav-link" href="Comentarios.html"><b>Encuesta</b></a></li>
					<li class="nav-item"><a class="nav-link" href="Cuenta.html"><b>Iniciar Sesión</b></a></li>
				</ul>
			</div>
		</div>

		<div class="row rowMargin bor">
			<div class="col-md-4">
				<marquee direction="up" scrollamount=4>
					<img src="imagenes/17dios.png" width="170" height="250" align="left">
				</marquee>	
			</div>
			<div class="col-md-4"><br><br><br><br>
				<h1><b>Datos enviados</b></h1>
			</div>
			<div class="col-md-4">
				<marquee direction="up" scrollamount=4>
					<img src="imagenes/22diosal.png" width="180" height="255" align="right">
				</marquee>
			</div>	
		</div>
		<hr size="4px" align="center" color="black"/>

		<div class="row rowMargin">
			<div class="col-md-3"><br><br><br><br><br><br><br><br><br><br>
				<p class="tex bor">
					<b>Datos enviados por el usuario:</b>
				</p>
			</div>
			<div class="col-md-6">
				<section class="form-register2">
					<?php
						$nomEncu=$_POST["nomEncu"];
						$edadEncu=$_POST["edadEncu"];
						$paisEncu=$_POST["paisEncu"];
						$infoEncu=$_POST["infoEncu"];
						$imgEncu=$_POST["imgEncu"];
						$encontrado=$_POST["encontrado"];
						$estancia=$_POST["estancia"];
						$recomendar=$_POST["recomendar"];
						$comentario=$_POST["comentario"];
						
						echo "Hola, me presento, mi nombre es $nomEncu y tengo $edadEncu años. Soy del país de $paisEncu."; 
						echo "<br/> Considero que la información que presentaste en tu página es muy $infoEncu y por otra parte, las imagenes son muy: $imgEncu.";
						echo "<br/> A demás, te quiero decir que encontre la página $encontrado, así que espero que mucha gente entre a tu sitio web.";
						echo "<br/> Mi estancia en tu página fue $estancia , asi que si me preguntas si yo recomendaria tu pagina
						te diria: $recomendar";
						echo "<br/> Un comentario que te hago para el bien de tu página es que, puedes agregar más: $comentario";
						echo "<br/>Atentamente $nomEncu.";
					?>						
				</section>
			</div>
			<div class="col-md-3">
				<p align="center"><br><br><br><br><br><br>
				<img src="imagenes/resusu.png" width="190" height="270">
			</div>
		</div><br><br>
		
		<br><br>
		<footer> 
			<div class="row pie rowMargin">		
				<div class="col-md-12">
					
						<p>
							<i><b>Redes Sociales Del Autor:</i></b>	
							<img onclick='saludar("Ruiz","Santos","Orlando")' src="imagenes/logopersonal.png" width="50" height="50" align="right">
							<a href="https://wa.me/qr/LCT4LOO3VOMAK1" target="_blank"><img align="right" src="imagenes/whats.png" width="50" height="50">
							<a href="https://www.facebook.com/RuizSantos02/" target="_blank"><img align="right" src="imagenes/face.png" width="45" height="45">
							<a href="mailto:orlandoruizsantos@hotmail.com" target="_blank"><img align="right" src="imagenes/correo.png" width="50" height="50">
						</p>	
					
				</div>	
			</div>
		</footer>

		<script> 
			function saludar (apellido1,apellido,nom){
				console.log ("Hola" + apellido1 +" "+ apellido +" "+ nom);
				
				Swal.fire({
					title: 'Autor de la página:',
					text: apellido1+" "+apellido+" "+nom,
					imageUrl: 'imagenes/alerta.png',
					imageWidth: 265,
					imageHeight: 250,
					imageAlt: 'Img',
					background: '#3498DB',
					color: 'white',
					width: 450,
					confirmButtonColor: 'orange',
				})
			}
		</script>
		
	</body>
</html>