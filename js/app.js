
//constructor
function seguro(marca, anio, tipo){
    this.marca = marca;
    this.anio = anio;
    this.tipo = tipo;
}




function Interfaz(){

}
Interfaz.prototype.mostrarError = function(mensaje, tipo){
    const div = document.createElement('div');
    if(tipo == 'error'){
        div.classList.add('mensaje', 'error');
    }else{
        div.classList.add('mensaje', 'correcto');
    }
    //pasamos el mensaje al div
    div.innerHTML = `${mensaje}`;
    //agregamos al dom
    formulario.insertBefore(div, document.querySelector('.form-group'));

    //despues de 3 segundo quitar el mensaje
    setTimeout(function(){
        document.querySelector(".mensaje").remove();
    },3000);
}




//llenando el select con los años
const max = new Date().getFullYear(),
      min = max -20;

const selectAnio = document.querySelector("#anio");
//for para llenarlo dinamicamente
for(let i = max; i> min; i--){
    let option = document.createElement('option');
    option.value = i;
    option.innerHTML = i;
    selectAnio.appendChild(option);

}


//pulsar boton de cotizar

const formulario = document.querySelector("#cotizar-seguro");

formulario.addEventListener('submit', function(e){
    e.preventDefault();
    //let datos del select marca
    const marca = document.querySelector("#marca");
    const marcaSeleccionada = marca.options[marca.selectedIndex].value;
    //seleccionamos los datos del año
    const anioSeleccionado = selectAnio.options[selectAnio.selectedIndex].value;
    // leer el radio button
    const tipo = document.querySelector('input[name="tipo"]:checked').value;

    const interfaz = new Interfaz();
    //validamos que no este vacio nada 
    if(marcaSeleccionada === '' || anioSeleccionado ==='' || tipo ===''){
        interfaz.mostrarError('Faltsan datos, revisa el formulario', 'error');
    }else{
        console.log("ahora si");
    }

    
});