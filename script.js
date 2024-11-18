window.onload = () => {
    // Crear tarjetas
    crearTarjetas(filosofos)

    // Crear handlers para los botones de control
    let botonCrearTarjeta = document.querySelector('.create-btn');
    botonCrearTarjeta.addEventListener('click',crearNuevaTarjeta);

    // Añadir listeners para los botones de ordenación ordenarNombreAZ y ordenarNombreZA
    let botonesOrdenar = document.querySelectorAll('.sort-btn');
    let botonOrdenarNombreAZ = botonesOrdenar[0];
    let botonOrdenarNombreZA = botonesOrdenar[1];

    botonOrdenarNombreAZ.addEventListener('click',ordenarNombreAZ);
    botonOrdenarNombreZA.addEventListener('click',ordenarNombreZA);
}

function crearTarjetas(filosofos) {
    filosofos.forEach((filosofo) => {
        // Creamos tarjeta vacía
        let tarjeta = document.createElement('div');
        tarjeta.classList.add('card');
        // Creamos imagen
        let imagen = document.createElement('img');
        imagen.src = filosofo.imagen;
        imagen.alt = `Foto de ${filosofo.nombre}`;
        imagen.classList.add("photo");
        tarjeta.append(imagen);

        // Creamos caja de informacion
        let info = document.createElement('div');
        info.classList.add('card-info');
        tarjeta.append(info);
        // Creamos título
        let titulo = document.createElement('h3');
        titulo.classList.add('nombre');
        titulo.innerHTML = filosofo.nombre;
        info.append(titulo);
        // Creamos fila de información (info-row)
        let filaInfo = document.createElement('div');
        filaInfo.classList.add('info-row');
        info.append(filaInfo);

        // Añadimos info del país a filaInfo
        let filaPais = document.createElement('div');
        filaPais.classList.add('info-pais');
        filaInfo.appendChild(filaPais);

        let bandera = document.createElement('img');
        bandera.src = filosofo.pais.bandera;
        bandera.alt = `Pais de ${filosofo.nombre}`;
        bandera.classList.add('bandera');
        filaPais.appendChild(bandera);

        let paisTexto = document.createElement('span');
        paisTexto.textContent = filosofo.pais.nombre;
        paisTexto.classList.add('pais');
        filaPais.appendChild(paisTexto);

        // Añadimos info de la corriente a filaInfo
        let filaCorriente = document.createElement('div');
        filaCorriente.classList.add('info-corriente');
        filaInfo.appendChild(filaCorriente);

        let filaCorrienteSpan = document.createElement('span');
        filaCorrienteSpan.classList.add('corriente');
        filaCorrienteSpan.innerHTML = `Corriente: ${filosofo.corriente}`;
        filaCorriente.appendChild(filaCorrienteSpan);
        
        // Añadimos info del arma a filaInfo
        let filaArma = document.createElement('div');
        filaArma.classList.add('info-arma');
        filaInfo.appendChild(filaArma);

        let filaArmaSpan = document.createElement('span');
        filaArmaSpan.classList.add('arma');
        filaArmaSpan.innerHTML = `Arma: ${filosofo.arma}`;
        filaArma.appendChild(filaArmaSpan);

        // Añadimos caja de habilidades
        let habilidades = document.createElement('div');
        habilidades.classList.add('skills');
        info.append(habilidades);

        // Añadimos una a una las habilidades
        for (let infoHabilidad of filosofo.habilidades) {

            // Añadimos una caja de habilidad
            let habilidad = document.createElement('div');
            habilidad.classList.add('skill');
            habilidades.appendChild(habilidad);

            // Añadimos contenido caja de habilidad
            // 1.Icono de habilidad
            let iconoHabilidad = document.createElement('img');
            iconoHabilidad.src = "https://via.placeholder.com/16";
            iconoHabilidad.alt = `Icono de ${infoHabilidad.habilidad}`
            habilidad.appendChild(iconoHabilidad);

            // 2.Etiqueta de habilidad
            let etiquetaHabilidad = document.createElement('span');
            etiquetaHabilidad.classList.add('skill-name');
            etiquetaHabilidad.innerHTML = `${infoHabilidad.habilidad}`;
            habilidad.appendChild(etiquetaHabilidad);
            
            // 2.Barra de habilidad
            let barraHabilidadCont = document.createElement('div');
            barraHabilidadCont.classList.add('skill-bar');
            habilidad.appendChild(barraHabilidadCont);

            let barraHabilidad = document.createElement('div');
            barraHabilidad.classList.add('level');
            barraHabilidad.style.width = `${(infoHabilidad.nivel / 4) * 100}%`;
            barraHabilidadCont.appendChild(barraHabilidad);
        }
        
        borrarTarjeta = document.createElement('div');
        borrarTarjeta.innerHTML = "&#x2716";
        borrarTarjeta.classList.add('botonEliminar');
        borrarTarjeta.addEventListener('click', eliminarTarjeta);
        tarjeta.append(borrarTarjeta)

        // Añadimos tarjeta creada al contenedor de tarjetas
        let contenedor = document.querySelector('.cards-container');
        contenedor.append(tarjeta);
    })
}

function eliminarTarjeta() {
    this.closest('.card').remove();
};

function ordenarNombreAZ() {
    let tarjetas = Array.from(document.querySelectorAll('.card'));
    let tarjetasOrdenadas = tarjetas.sort((tarjetaA, tarjetaB) => {
        let nombre1 = tarjetaA.querySelector('h3').innerHTML;
        let nombre2 = tarjetaB.querySelector('h3').innerHTML;
        return nombre1.localeCompare(nombre2);
    });

    let contenedor = document.querySelector('.cards-container');
    contenedor.innerHTML = '';
    tarjetasOrdenadas.forEach(tarjeta => {
        contenedor.appendChild(tarjeta);
    });
}

function ordenarNombreZA() {
    let tarjetas = Array.from(document.querySelectorAll('.card'));
    let tarjetasOrdenadas = tarjetas.sort((tarjetaB, tarjetaA) => {
        let nombre1 = tarjetaA.querySelector('h3').innerHTML;
        let nombre2 = tarjetaB.querySelector('h3').innerHTML;
        return nombre1.localeCompare(nombre2);
    });

    let contenedor = document.querySelector('.cards-container');
    contenedor.innerHTML = '';
    tarjetasOrdenadas.forEach(tarjeta => {
        contenedor.appendChild(tarjeta);
    });
}

function crearNuevaTarjeta(event) {
    event.preventDefault();
    let nuevoFilosofo = {};
    nuevoFilosofo.nombre = document.querySelector('.create-card-form .nombre').value;
    nuevoFilosofo.imagen = document.querySelector('.create-card-form .foto').value;
    nuevoFilosofo.pais = {};
    nuevoFilosofo.pais.nombre = document.querySelector('.create-card-form .pais').value;
    // Completar la función
    nuevoFilosofo.pais.bandera = document.querySelector('.create-card-form .bandera').value;
    nuevoFilosofo.corriente = document.querySelector('.create-card-form .corriente').value;
    nuevoFilosofo.arma = document.querySelector('.create-card-form .arma').value;
    nuevoFilosofo.habilidades = [];
    let habilidadesInputs = document.querySelectorAll('.create-card-form .skills');
    let habilidadesNombres = ["Sabiduría", "Oratoria", "Lógica", "Innovación"];

    habilidadesInputs.forEach((input, index) => {
        nuevoFilosofo.habilidades.push({
            habilidad: habilidadesNombres[index],
            nivel: parseInt(input.value)
        });
    });
    
    crearTarjetas([nuevoFilosofo]); // Enviamos el nuevo filosofo como un array
}

function parsearTarjetas(tarjetas){
    let filosofosParseados = [];
    for (let tarjeta of tarjetas){
        let filosofo = {};
        filosofo.nombre = tarjeta.querySelector('.nombre').innerHTML;
        filosofo.imagen = tarjeta.querySelector('.photo').src;
        filosofo.pais = {};
        // Completar funció
        
        let habilidades = tarjeta.querySelectorAll('.skill');
        for (let habilidad of habilidades){
            let habilidadParaGuardar = {};
            // Completar funció
        }
        filosofosParseados.push(filosofo);
    }
    return filosofosParseados;
}

function guardarTarjetas(){
    let tarjetas = Array.from(document.querySelectorAll('.card'));
    localStorage.setItem('tarjetas',JSON.stringify(parsearTarjetas(tarjetas)));
}


function cargarTarjetas() {
}

const filosofos = [
    {
        nombre: "Platón",
        imagen: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/da/Plato_Pio-Clemetino_Inv305.jpg/1200px-Plato_Pio-Clemetino_Inv305.jpg",
        pais: {
            nombre: "Grecia",
            bandera: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Flag_of_Greece.svg/640px-Flag_of_Greece.svg.png"
        },
        corriente: "Idealismo",
        arma: "Dialéctica",
        habilidades: [{
            habilidad: "Sabiduría",
            nivel: 4
        },
        {
            habilidad: "Oratoria",
            nivel: 4
        },
        {
            habilidad: "Lógica",
            nivel: 3
        },
        {
            habilidad: "Innovación",
            nivel: 4
        }
        ]
    },
    {
        nombre: "Aristóteles",
        imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdXUwy_fFGOJ2vwOMpwtJPyXc9HVb06HSRsbembn7IPKq6D1YitIra2WFM4Gu2rm6yHRs&usqp=CAU",
        pais: {
            nombre: "Grecia",
            bandera: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Flag_of_Greece.svg/640px-Flag_of_Greece.svg.png"
        },
        corriente: "Naturalismo",
        arma: "Lógica",
        habilidades: [{
            habilidad: "Sabiduría",
            nivel: 4
        },
        {
            habilidad: "Oratoria",
            nivel: 3
        },
        {
            habilidad: "Lógica",
            nivel: 4
        },
        {
            habilidad: "Innovación",
            nivel: 3
        }
        ]
    },
    {
        nombre: "Descartes",
        imagen: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Frans_Hals_-_Portret_van_Ren%C3%A9_Descartes.jpg/800px-Frans_Hals_-_Portret_van_Ren%C3%A9_Descartes.jpg",
        pais: {
            nombre: "Francia",
            bandera: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Flag_of_France.svg/1280px-Flag_of_France.svg.png"
        },
        corriente: "Racionalismo",
        arma: "Meditación",
        habilidades: [{
            habilidad: "Sabiduría",
            nivel: 3
        },
        {
            habilidad: "Oratoria",
            nivel: 3
        },
        {
            habilidad: "Lógica",
            nivel: 2
        },
        {
            habilidad: "Innovación",
            nivel: 3
        }
        ]
    },
    {
        nombre: "Kant",
        imagen: "https://i.pinimg.com/736x/20/89/7f/20897f915acb5124893a278c395382ed.jpg",
        pais: {
            nombre: "Alemania",
            bandera: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Flag_of_Germany.svg/255px-Flag_of_Germany.svg.png"
        },
        corriente: "Trascendentalismo",
        arma: "Crítica",
        habilidades: [{
            habilidad: "Sabiduría",
            nivel: 3
        },
        {
            habilidad: "Oratoria",
            nivel: 2
        },
        {
            habilidad: "Lógica",
            nivel: 3
        },
        {
            habilidad: "Innovación",
            nivel: 3
        }
        ]
    },
    {
        nombre: "Hume",
        imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSiFZYg2MiOQSXbkBvFP-T3vW9pnhLW5qDioA&s",
        pais: {
            nombre: "Escocia",
            bandera: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Flag_of_Scotland.svg/640px-Flag_of_Scotland.svg.png"
        },
        corriente: "Empirismo",
        arma: "Escepticismo",
        habilidades: [{
            habilidad: "Sabiduría",
            nivel: 3
        },
        {
            habilidad: "Oratoria",
            nivel: 3
        },
        {
            habilidad: "Lógica",
            nivel: 3
        },
        {
            habilidad: "Innovación",
            nivel: 3
        }
        ]
    },
    {
        nombre: "Arendt",
        imagen: "https://efeminista.com/wp-content/uploads/2021/09/Arendt-Hannah-1-e1576158475623.jpg",
        pais: {
            nombre: "Alemania",
            bandera: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Flag_of_Germany.svg/255px-Flag_of_Germany.svg.png"
        },
        corriente: "Fenomenología",
        arma: "Parresía",
        habilidades: [{
            habilidad: "Sabiduría",
            nivel: 3
        },
        {
            habilidad: "Oratoria",
            nivel: 2
        },
        {
            habilidad: "Lógica",
            nivel: 2
        },
        {
            habilidad: "Innovación",
            nivel: 3
        }
        ]
    }
]