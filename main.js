const baseURL = "https://pokeapi.co/api/v2/pokemon/";
const caja = document.getElementById("caja");
const inputPoke = document.getElementById("numero-poke");
const submitPoke = document.getElementById("submit-poke");
const formPoke = document.getElementById("form-poke");


const traerPokemon = async (input) => {
try {
    
    let response = await fetch (`https://pokeapi.co/api/v2/pokemon/${input}`);

    let data = await response.json();
    
    return data;

} 
    
    catch (error) {
        caja.classList.add("borde-blanco");
        caja.innerHTML = `<p class="signo error">!</p>
        <p class="mensaje">No existe Pokemon con ese ID</p>`
    }
}

let ejemplo = traerPokemon(3);

const medirNombre = (nombre) => {

   
    if (nombre.length > 10) {

     
        return `<h2 class="nombre-chico">${nombre}</h2>`;
    }

    else {

        return `<h2>${nombre}</h2>`;
    }
    
}

const renderizarPoke = (data) => {

caja.classList.remove("borde-blanco");
caja.classList.remove("error2");
return  caja.innerHTML = `
<div class="pokemon">
<img class="pokebola" src="/pokeball.png" alt="pokebola">
<img class="imagen-pokemon" src="${data.sprites.other.home.front_default}" alt="imagen del pokemon">
<p class="id-pokemon">#${data.id}</p>


${medirNombre(data.name.toUpperCase())}


<div class="caja-data">
<span class="exp">EXP: ${data.base_experience}</span>

<div class="caja-tipos">
    ${
        data.types.map((tipo) => `<span class="${tipo.type.name} poke-tipo">${tipo.type.name}</span>`).join('')}

        </div>
<div class="datos-detalles">

<p class="height"># ${data.height / 10} mts</p>
<p class="weight"># ${data.weight / 10} kg</p>
</div>
</div>
</div>
`;

}




const inicioRenderizar = async (input) => {


   
    let valoresPoke = await traerPokemon(input);

    if (!valoresPoke) {

        return;
    }
    renderizarPoke(valoresPoke);
    localStorage.setItem("Pokemon", []);
    localStorage.setItem("Pokemon", JSON.stringify(valoresPoke));
    

    }


    const submitForm = (e) => {

        e.preventDefault();

        
        let inputPokemon = inputPoke.value;
        inicioRenderizar(inputPokemon);
    }

    const init = () => {


        formPoke.addEventListener("submit", submitForm);
        
        if (localStorage.getItem("Pokemon")) {

            
            
            let datos = JSON.parse(localStorage.getItem("Pokemon"));
           
            renderizarPoke(datos);
        }
    }

    init ();


    