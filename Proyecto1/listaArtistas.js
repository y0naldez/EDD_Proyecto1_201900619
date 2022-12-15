class Nodo {
    constructor(dato) {
        this.dato = dato;
        this.siguiente = null;
        this.anterior = null;
        this.lista = new Lista();
    }
}

class Lista {
    constructor() {
        this.primero = null;
    }

    // método para crear la lista normal
    add(dato) {
        let nuevo = new Nodo(dato);
        if(this.primero == null) {
            // si la lista está vacía agrega el dato al inicio de la cola
            this.primero = nuevo;
        }else {
            let aux = this.primero;
            // mientras el nodo aux no sea null, pasará al siguiente nodo
            while(aux.siguiente != null) {
                aux = aux.siguiente;
            }
            let repetido = this.repetido(dato, this.primero);
            if(repetido) {
                console.log('Dato repetido, no se insertó: ' + dato + ' :(');
                return
            }
            // insertando el nuevo dato y asignando los apuntadores
            aux.siguiente = nuevo;
            nuevo.anterior = aux;
        }
    }


    // método para insertar dentro de una lista 
    add2(nombre, dato) {
        let aux = this.primero;
        while(aux != null) {
            // si el nombre es igual al algún dato de la lista se iscerta otra lista dentro de ese nodo
            if (aux.dato == nombre) {
                let repetido = this.repetido(dato, aux.lista.primero);
                if (repetido) {
                    console.log('Dato repetido, no se insertó: ' + dato);
                }else {
                    aux.lista.add(dato);
                }                
                return
            }
            aux = aux.siguiente;
        }
        // si sale del while quiere decir que no hay tal nombre
        console.log('No existe ese nombre:( intente con otro.');
    }

    // método para verificar si hay algún dato repetido
    repetido(dato, aux) {
        while(aux != null) {
            if(aux.dato == dato) {
                return true;
            }
            aux = aux.siguiente;
        }
        return false;
    }

    // método para mostrar la lista
    mostrar() {
        let aux = this.primero;
        //console.log('=========LISTA=======');
        document.write('=========LISTA======='+"<br>");
        while(aux != null) {
            //console.log('* ' + aux.dato);
            document.write('* ' + aux.dato+"<br>");
            let aux2 = aux.lista.primero;
            while(aux2 != null) {
                //console.log('   -> ' + aux2.dato);
                document.write('   -> ' + aux2.dato+"<br>");
                aux2 = aux2.siguiente;
            }
            aux = aux.siguiente;
        }
    }

    // para buscar la informacion en la lista
    buscar(indice){
        let aux = this.primero 
        while (aux!=null){
            if(aux.dato == indice){
                document.write("Si aparece "+aux.dato)
                
                return aux
                }

            aux = aux.siguiente
            
        }
            
            
            
        return this
    }



    //graficar con graphviz 
    graficarlista(){
        var codigodot = "digraph G{\nlabel=\" Lista de listas \";\nnode [shape=box];\n";
        var temporal = this.primero
        var conexiones ="";
        var conexiones2="";
        var nodos ="";
        var numnodo= 0;
        while (temporal != null) {
            nodos+=  "N" + numnodo + "[label=\"" + temporal.dato + "\" ];\n"

            var numnodo2= 0;
            
            
            
            //para la lista 2
            let temporal2=temporal.lista.primero

            conexiones2 += "N" + numnodo + " -> NN" + temporal.dato + "0;\n"
            while(temporal2!=null){
                nodos+=  "NN" + temporal.dato +numnodo2 + "[label=\"" + temporal2.dato + "\" ];\n"


                if(temporal2.siguiente!=null){
                    var auxnum2 = numnodo2+1
                conexiones2+= "NN" + temporal.dato +numnodo2 + " -> NN" +temporal.dato + auxnum2 + ";\n"
                }

                
                temporal2 = temporal2.siguiente
                numnodo2++; 
            }
            

            if(temporal.siguiente != null){
                var auxnum = numnodo+1
                conexiones += "N" + numnodo + " -> N" + auxnum + ";\n"
            }


            temporal = temporal.siguiente
            numnodo++;            
        }

        codigodot += "//agregando nodos\n"
        codigodot += nodos+"\n"
        codigodot += "//agregando conexiones o flechas\n"
        codigodot += conexiones2+"{rank=same;\n"+conexiones+"\n}\n}"
        console.log(codigodot)
        //var arreglo = [0,2,3,4,5]
        d3.select("#lienzo").graphviz()
            .width(900)
            .height(500)
            .renderDot(codigodot)
    }
}

// probando
/*
l = new Lista();
l.add('Artista_1');
l.add('Artista_2');
l.add('Artista_3');
l.add('Artista_4');

l.add2("Artista_1","cancion x")
l.add2("Artista_2","cancion x")
l.add2("Artista_3","cancion x")
l.add2("Artista_4","cancion x")

l.add2("Artista_1","luna nueva")
//l.mostrar();
l.graficarlista();

l.mostrar()
*/