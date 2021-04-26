//Variables
const nombre = document.getElementById('nombre');
const id = document.getElementById('id');
const id2 = document.getElementById('id2');
const regBtn = document.getElementById('regBtn');
const votBtn = document.getElementById('votBtn');
const candBtn = document.getElementById('candBtn');
const votosBtn = document.getElementById('votosBtn');

//Lo de firebase, se llama luego de pegar lo de la pag de firebase
const database = firebase.database();

//Metodo ya que no es function se declara antes
registrar=()=>{
    let n = nombre.value;
    let i = id.value;

    if(n === ''){
        alert('No digitó un nombre');
        return;
    }
    if(i === ''){
        alert('No digitó un ID');
        return;
    }

    //Armar los objetos
    let objetoUsuario = {
        nombre: n,
        id: i
    };

    let json = JSON.stringify(objetoUsuario);

    console.log(objetoUsuario);
    console.log(json);

    database.ref('candidatos').push().set(objetoUsuario);
    nombre.value = '';
    id.value = '';

}


//Acciones
regBtn.addEventListener('click',registrar);

//Método de votar
var voto = [];
votar=()=>{

    let v = id2.value;

    if(v === ''){
        alert('No digitó un ID');
        return;
    }

    database.ref('candidatos').on('value', function(data){
        data.forEach(
            function(p){
            let val = p.val().id;
            //Para que se vea por quien votó
            if(v == val){
                alert(val+ " ");
                voto[p] = voto[p]+1;
            }    
        })
    });
}

//Acciones
votBtn.addEventListener('click', votar);

//Método de ver candidatos por los que han votado
vercand = ()=>{
    var candidatov = [];
    database.ref('candidatos').on('value', function(data){
        data.forEach(
            function(p){
               candidatov.push(p.val().nombre);
                alert(candidatov);
            }
        )
    })
}

//Accion
candBtn.addEventListener('click',vercand);

//Metodo de ver votos
verVotos = () => {
    database.ref('candidatos').on('value', function(data){
        data.forEach(
            function(p){
                let candn = p.val().nombre;
                alert(candn + voto[p]);
            }
            
        );
});

}

//Accion ver votos
votosBtn.addEventListener('click',verVotos);


//Leer(2)

/*const beta = ()=>{

    console.log("Iniciamos el proceso")
    var output = "";
    database.ref('candidatos').once('value', (data)=>{
        data.forEach(child => {
            console.log(child.key);
            console.log(child.val());
            database.ref('votos/'+child.key).once('value', (votos)=>{
                votos.forEach(voto=>{
                    console.log(child.key+"=>"+voto.val());
                    output += child.key+"=>"+voto.val();
                });
                
            });

    
        });
        console.log(output);
    });
}*/

//beta();
