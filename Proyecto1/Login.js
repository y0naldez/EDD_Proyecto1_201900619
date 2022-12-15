function Login(){

    var user,pass;

    user = document.getElementById("usuario").value;
    pass = document.getElementById("contraseña").value;
    
    if(user == "prueba" && pass == "123"){

        console.alert("CORRECTO");
    }

}
