class Node {
    constructor(username,name,dpi,phone,password,admin) {
        this.username = username;
        this.name = name;
        this.dpi = dpi;
        this.phone = phone;
        this.password = password;
        this.admin = admin;
        this.next = null;
    }
}


class ListaSimple{

constructor() {
    this.head = null;
    this.size = 0;
}

/* Inserta un nodo al frente de la lista */
push(username,name,dpi,phone,password,admin) {
var new_node = new Node(username,name,dpi,phone,password,admin);
new_node.next = this.head;
this.head = new_node;
this.size++;
}

/* Inserta un nodo en la posisión siguiente */
append(username,name,dpi,phone,password,admin) {

var new_node = new Node(username,name,dpi,phone,password,admin=false);

if (this.head == null) {
    this.head = new Node(username,name,dpi,phone,password,admin=false);
    this.size++;
    return;
}


 new_node.next = null;

var last = this.head;
while (last.next != null)
    last = last.next;
    last.next = new_node;
    this.size++;
    return;
}

deleteNode(key) {
    var temp = this.head, prev = null;

    // Si el propio nodo de cabecera tiene la clave que hay que borrar
    if (temp != null && temp.username == key) {
        this.head = temp.next; // Cambiando la cabeza
        return;
    }

    // Buscar la clave que se va a eliminar, mantener la pista de el nodo anterior ya que necesitamos cambiar temp.next
    while (temp != null && temp.username != key) {
        prev = temp;
        temp = temp.next;
    }

    // Si la clave no está en la lista
    if (temp == null)
        return;

    // Quitando el nodo de la lista
    prev.next = temp.next;
}

getCount() {
    var temp = this.head;
    var count = 0;
    while (temp != null) {
        count++;
        temp = temp.next;
    }
    return count;
}

// para buscar la informacion en la lista
buscar(indice){
    let aux = this.head 
    while (aux!=null){
        if(aux.username == indice){
            document.write("Si aparece "+aux.username)
            
            return aux
        }
        aux = aux.next
    }
    document.write("No aparece ")      
    return this
}

printList() {
var tnode = this.head;
    while (tnode != null) {
        document.write(tnode.username + " " + tnode.name + " " + tnode.dpi + " " + tnode.phone + " " + tnode.password + " " + tnode.admin + "<br>");
        tnode = tnode.next;
    }
}

//graficar con graphviz 
graficarlista(){
        var codigodot = "digraph G{\nlabel=\" Lista Simple \";\nnode [shape=box];\n";
        var temporal = this.head
        var conexiones ="";
        var nodos ="";
        var numnodo= 0;
        while (temporal != null) {
            nodos+=  "N" + numnodo + "[label=\"" +"Usuario: "+ temporal.username+"\n Nombre: " +temporal.name+"\n DPI: "+temporal.dpi+ "\n Telefono: " +temporal.phone + "\n Contraseña: " +temporal.password +  "\n Admin: " +temporal.admin + "\" ];\n"
            if(temporal.next != null){
                var auxnum = numnodo+1
                conexiones += "N" + numnodo + " -> N" + auxnum + ";\n"
            }
            temporal = temporal.next
            numnodo++;            
        }
        codigodot += "//agregando nodos\n"
        codigodot += nodos+"\n"
        codigodot += "//agregando conexiones o flechas\n"
        codigodot += "{rank=same;\n"+conexiones+"\n}\n}"
        console.log(codigodot)
        //var arreglo = [0,2,3,4,5]
        d3.select("#lienzo").graphviz()
            .width(900)
            .height(500)
            .renderDot(codigodot)
}



}