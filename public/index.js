


const login =()=>{
  
  let username = document.querySelector('#username').value
  let password = document.querySelector('#password').value
  fetch('/login', {
    method: "post",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username: username,
      password: password
    
    })
  })
  .then(response => response.text()
    )
  .then(plantilla => document.querySelector('body').innerHTML = plantilla)

  .catch(error=>
    error)
  
    initCarrito()
    crearCarrito()
    
}




const initCarrito =()=> localStorage.setItem("idCarrito",0)
const getIdCarrito = () => localStorage.getItem("idCarrito")
const setIdCarrito =(id)=> localStorage.setItem("idCarrito",id)




const registrarse =()=>{
  let username = document.querySelector('#username').value
  let password = document.querySelector('#password').value
  let nombre = document.querySelector('#nombre').value
  let direccion = document.querySelector('#direccion').value
  let edad = document.querySelector('#edad').value
  let telefono = document.querySelector('#telefono').value
  let selection = document.getElementById("comboTipoUsuario");
  let tipoUsuario = selection.selectedOptions[0].value
  let fotoUrl = pathFoto
  let user = {
    username,
    password,
    nombre,
    direccion,
    edad,
    telefono,
    tipoUsuario,
    fotoUrl
  }
 
  fetch('/signup', {
    method: "post",
   headers: {
      'Accept': 'application/json',
     'Content-Type': 'application/json'
   },
    body: JSON.stringify({
      username: username,
      password: password,
      nombre : nombre,
      direccion : direccion,
      edad:edad,
      telefono:telefono,
      tipoUsuario:tipoUsuario,
      fotoUrl:fotoUrl  
    })
  
  })
  .then(response => response.text()
    )
  .then(res => alert(res))
  //.then(plantilla => document.querySelector('body').innerHTML = plantilla)
  .catch(error=>
    error)
}






let pathFoto = ''
const upload =()=>{
  
  let form = document.querySelector('#formFile')
  let formData = new FormData(form)
  console.log(formData)
  debugger

  fetch('/files/uploadfile', {
    method: "post", 
  body: formData
 
  })
  .then(response =>response.text()   
  )
  .then(texto =>{
    let urlFoto = JSON.parse(texto)
    pathFoto = urlFoto.path
    console.log(pathFoto)
    registrarse()
  }) 
  .catch(error=>
    error)
}





const logout =()=>{
  
  fetch('/logout', {
    method: "get",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })
  .then(response => 
    response.text())
  .then(plantilla => {
    setTimeout(()=>{
      init()
    },2000) 
    document.querySelector('body').innerHTML = plantilla     
  })
  .catch(error=>
    error)
}




const init = ()=>{
  fetch('/', {
    method: "get",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })
  .then(response => response.text())
  .then(plantilla => 
    { 
      document.querySelector('body').innerHTML = plantilla})
  .catch(error => alert(error))
}






const getRegisterView = ()=>{
  redireccionar('/registerView');
}



const getLoginView = ()=>{
  redireccionar('/');
}



function redireccionar(pagina) {
  location.href = pagina;
} 


///////////////////////////////////////////


function openTab(evt, name) {
 
  let i, tabcontent, tablinks;

  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

 
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  
  document.getElementById(name).style.display = "block";
  evt.currentTarget.className += " active";

  if(name == "productos"){
    //getProductos()
  }else
    if(name == "carrito"){
      //getProductosCarrito()    
  }
  else
  if(name == "usuario"){
    getUserData()
  }
  
}



//////////////////////////////////////////////////////////


const getProductos = ()=>{
  
  fetch('/api/productos/undefined', {
    method: "get",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })
  .then(response => response.text())
  .then(result =>{
    
     cargarTablaProductos(JSON.parse(result),"tablaProductos")  
  })
  
  .catch(error => alert(error))
 
}





        const cargarTablaProductos = (lista,tablaX)=>{
          
            let productos = lista.productos || lista.chango.productos
            let tabla = document.getElementById(tablaX);
          
            while(tabla.rows.length > 1) { tabla.deleteRow(1); } 
            
            let tablaLlena = "";
            for (var i =0; i< productos.length; i++){
                 
                tablaLlena += '<td style="display:none">' + productos[i]._id + '</td>'
                tablaLlena += '<td style="width:200px">' + productos[i].nombre + '</td>'
                tablaLlena += '<td style="text-align:center;width:200px">' + productos[i].precio +  '</td>'
                tablaLlena += '<td style="text-align:center;width:200px"><img width="50" src=' + productos[i].fotoUrl + ' alt="not found" ></td>'
                if(tablaX == 'tablaProductos'){
                  tablaLlena += `<td><input type="number" class="form-control" style="width:70px;" value="${(productos[i].cantidad != undefined)? productos[i].cantidad : 0 }"/>`+ '</td>'
                  tablaLlena += '<td><button class="btn btn-toolbar" onclick="agregarProductoAlCarrito(this)" style="border-radius: 50%;height:42px;width:42px;margin-left:5px;"><i class="glyphicon glyphicon-shopping-cart" style="color:#337ab7;font-size:18px;margin-left:-3px;"></i></button></td>'
                  tablaLlena += '<td ><button class="btn btn-toolbar" style="border-radius: 50%;height:42px;width:42px;margin-left:5px;" onclick="eliminarProducto(this)"><i class="glyphicon glyphicon-floppy-remove" style="color:orangered;font-size:18px;margin-left:-3px;"></i></button></td>'
                }else{
                  tablaLlena += `<td><input type="number" class="form-control" style="width:70px;" disabled value="${(productos[i].cantidad != undefined)? productos[i].cantidad : 0 }"/>`+ '</td>'
                }
                
                let fila = document.createElement('tr')
                fila.innerHTML= tablaLlena
                tabla.append(fila)
                tablaLlena = "";
          }
          if(lista.chango){
            document.querySelector('#totalGeneral').value = lista.chango.totalGeneral
          }
        }





const getProductosCarrito = ()=>{
  let idCarrito = getIdCarrito()
  fetch('/api/carrito/' + idCarrito + '/productos', {
    method: "get",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
    
  })
  .then(response => response.text())
  .then(result => 
    {
    console.log(result)
    console.log(typeof(result))
    let res = JSON.parse(result)
    console.log(`res: ${res.chango}`)
     cargarTablaProductos(JSON.parse(result),"tablaProductosCarrito")
      
    })
  .catch(error => alert(error))
 
}





const getUserData = ()=>{
  
  fetch('/api/usuarios/getUserData', {
    method: "get",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })
  .then(response => response.text())
  .then(plantilla => 
    { 
      document.querySelector('#usuario').innerHTML = plantilla
    })
  .catch(error => alert(error))
 
  }


/////////////////////////////////

const crearProducto = ()=>{
  let nombre = document.querySelector('#nombre').value
  let precio = document.querySelector('#precio').value
  let fotoUrl = document.querySelector('#fotoUrl').value

  let valores = {
  nombre: nombre,
  precio: precio,
  fotoUrl: fotoUrl
  }
  ocultarDivAgregar()
  fetch('/api/productos', {
    method: "post",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(valores)
    })
    .then(response => alert(response.text())
      )
    .then(plantilla => 
      { 
        document.querySelector('#productos').innerHTML = plantilla
        alert('Producto creado exitosamete')
      })
    .catch(error=>
      error
      .then(e=>
        alert(e)
      ))
  
}


const eliminarProducto = (elem)=>{
 
  let id = getIdFromRow(elem)
  fetch('/api/productos/'+ id, {
    method: "DELETE",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
    })
    .then(response => response.text()
      )
    .then(msg => 
      { 
        alert(msg)
      })
    .catch(error=>   
        alert(error)
      )
  
}



 const verDivAgregar = ()=>{
  document.querySelector('#divFormAgregar').style.display = 'block'
  document.querySelector('#tableContainer').style.display = 'none'
 }



const ocultarDivAgregar = ()=>{
  document.querySelector('#divFormAgregar').style.display = 'none'
  document.querySelector('#tableContainer').style.display = 'block'
 }



 


 

const crearCarrito = ()=>{
  
  fetch('/api/carrito', {
    method: "post",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })
  .then(response => response.text())
  .then(result => 
    { 
      console.log(`carrito id from server : ${result}`)
      console.log(typeof result)
      setIdCarrito(result)
      let id = JSON.parse(result).idCarrito
      localStorage.setItem("idCarritoString",id)
     
    })
  .catch(error => alert(error))
 
}



const eliminarCarrito = ()=>{
  let id = getIdCarrito()
  fetch('/api/carrito/' + id, {
    method: "delete",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })
  .then(response => response.text())
  .then(carrito => 
    { 
      let tabla = document.getElementById('tablaProductosCarrito');          
      while(tabla.rows.length > 1) { tabla.deleteRow(1); } 
      initCarrito();
      crearCarrito();
      alert('El carrito ha sido eliminado')
      document.querySelector('#totalGeneral').value= 0
     
    })
  .catch(error => alert(error))
 
}




const crearPedido = ()=>{

  id = localStorage.getItem("idCarritoString")
  
  fetch('/api/pedidos/crearPedido', {
    method: "post",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body:JSON.stringify({    
      id
    })
  })
  .then(response => response.text())
  .then(msg => 
    { 
     alert(msg)    
    })
  .catch(error => alert(error))
 
}



let cantidadProducto = 0
const getIdFromRow = (element)=>{
  let td = element.parentNode
  let fila = td.parentNode
  let id = fila.children[0].textContent
  cantidadProducto = fila.children[4].children[0].value
  //debugger
  return id
 }





const agregarProductoAlCarrito =(element)=>{
  
  let idProducto = getIdFromRow(element)
    
     if(cantidadProducto > 0){
       
        if(getIdCarrito() == 0){             
          crearCarrito(`idProducto : ${idProducto}`)
        }
          let id = getIdCarrito()
   
            fetch('/api/carrito/' + id + '/productos', {
              method: "post",
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                id: idProducto,
                cantidad: cantidadProducto
              
              })
            })
            .then(response => response.text()
              )
            .then(result => {
              
            console.log(`result agregar producto ${result}`) 
            getProductosCarrito()
            alert('Producto agregado al carrito')
            })

            .catch(error=>
              error)
            
        }else{
          alert('Debe seleccionar la cantidad')
        }
    }


