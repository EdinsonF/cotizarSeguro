//migrando de prototype a clases

//constructor
class Seguro{
    
    constructor(marca, anio, tipo){
        this.marca = marca;
        this.anio = anio;
        this.tipo = tipo;
    }
    
    //metodos
    cotizarSeguro(){
        /* 1 = americano 1.15
        2= asiatico 1.05
        3 = europeo 1.35 */
    
        let cantidad;
        const base = 2000;
    
        switch(this.marca){
            case'1':
                cantidad = base * 1.15;
                break;
            case '2':
                cantidad = base * 1.05;
                break;
            case '3':
                cantidad = base * 1.35;
                break;
        }
        
    
        //leer año y hacer operacion
        const diferencia = new Date().getFullYear() - this.anio;
    
        cantidad -= (diferencia * 3)* cantidad / 100;
    
        
        
        //comparar con el tipo
        if(this.tipo ==='basico'){
            cantidad *=1.30;
        }else{
            cantidad*= 1.50;
        }
    
      
        return cantidad;
    }


}//fin clase seguro






class Interfaz{

    mostrarMensaje(mensaje, tipo){
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
        },2000);
    }


    motrarResultado(seguro, total){
        let marca;
        const resultado = document.querySelector("#resultado");
    
        const div1 = document.createElement('div');
    
        switch(seguro.marca){
            case '1':
                    marca = "AMERICANO";
                break;
            case '2':
                    marca = "ASIATICO";
                break;
            case '3':
                    marca = "EUROPEO";
                break;
        }
        console.log(marca);
    
        //mostrar spinner
        const spinner = document.querySelector("img");
    
        
    
        div1.innerHTML =`
        <p class="header">Resumen</p>
            <p>Marca:${marca}</p>
            <p>Año:${seguro.anio}</p>
            <p>Tipo:${seguro.tipo}</p>
            <p>Precio: $${total}</p>
        
        `;
        spinner.style.display = 'block';
    
        setTimeout(function(){
            spinner.style.display = 'none';
    
            resultado.appendChild(div1);
        },2000);
    
        
    
        
    }
}//fin de la clase interfaz







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
    //eliminamos el contenido del div del resultado
    let limpiarResult = document.querySelector("#resultado");
    while (limpiarResult.firstChild) {
        limpiarResult.removeChild(limpiarResult.firstChild);
    }

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
        interfaz.mostrarMensaje('Faltsan datos, revisa el formulario', 'error');
    }else{
        const seguro   = new Seguro(marcaSeleccionada, anioSeleccionado, tipo);
        const cantidad = seguro.cotizarSeguro();
        interfaz.mostrarMensaje('Cotizando...', 'correcto');

        //enviamos a la interfaz
        interfaz.motrarResultado(seguro,cantidad);
    }

    
});