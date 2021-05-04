import React from 'react';
import shortid from 'shortid'

function App() {
  
  const [tarea, setTarea] = React.useState('')
  const [tareas, setTareas] = React.useState([])
  const [edicion, setEdicion] = React.useState(false)
  const [idAux,setIdAux] = React.useState('')
  const [errorTarea,setErrorTarea] = React.useState(null)

  const agregarTarea = e => {
    e.preventDefault()
    if(!tarea.trim()){//si tarea tiene algo escrito es true
      console.log("no puede crear una tarea vacia")
      setErrorTarea("no puede crear una tarea vacia")
      return
    }
    setTareas([
      ...tareas,
      {id: shortid.generate(), nombreTarea: tarea}
    ])

    setTarea('')
    setErrorTarea(null)
  }

  const eliminarTarea = id =>{
    //console.log(id)
    setTareas(tareas.filter(unaTarea=> unaTarea.id !== id))

  }
  
  const editarTarea = unaTarea =>{
    //console.log(unaTarea)
    setEdicion(true)
    setTarea(unaTarea.nombreTarea)
    setIdAux(unaTarea.id)

  }

  const editarPropiedadesDeTarea = e=>{
    e.preventDefault()
    if(!tarea.trim()){
      console.log("no se puede asignar un nombre vacio a la tarea")
      setErrorTarea("no se puede asignar un nombre vacio a la tarea")
      return
    }
    setTareas([...(tareas.map(
      unaTarea=> unaTarea.id === idAux? {idAux,nombreTarea:tarea} : unaTarea
    ))])
    setEdicion(false)
    setTarea('')
    setIdAux('')
    setErrorTarea(null)
  }
  
  return (
    <div className="container mt-5">
      <h1 className="text-center">CRUD simple</h1>
      <hr/>
      <div className="row">
        <div className="col-8">
          <h4 className="text-center">Lista de tareas</h4>
          <ul className="list-group">
            {
              tareas.length === 0 ? 
              (<li className="list-group-item">No Hay Tareas</li>) 
              :
              (
                tareas.map(unaTarea => (
                <li className="list-group-item" key={unaTarea.id}>
                  <span className="lead">{unaTarea.nombreTarea}</span>
                  <button 
                  className="btn btn-danger btn-sm float-sm-end mx-2"
                  onClick={()=>eliminarTarea(unaTarea.id)}
                  >
                    Eliminar
                  </button>
  
  
                  <button 
                  className="btn btn-success btn-sm float-sm-end"
                  onClick={()=>editarTarea(unaTarea)}
                  >
                    Editar
                    </button>
                </li>
                ))
                )


            }
          </ul>
        </div>
        <div className="col-4">
        <h4 className="text-center">
          {
            edicion? "Editar Tarea" : "Crear Tarea"
          }
        </h4>
        <form onSubmit={edicion? editarPropiedadesDeTarea : agregarTarea}>
          {
            errorTarea ? <span className="text-danger">{errorTarea}</span>:null
          }
          <input 
          type="text" 
          className="form-control mb-2"
          placeholder="Ingrese una nueva Tarea"
          onChange={e => setTarea(e.target.value)}
          value={tarea}
          />
          {
            edicion?
            (<button className="btn btn-success">EditarTarea</button>):
            (<button className="btn btn-dark btn-block" type="submit">Agregar</button>) // el boton tiene que ser de tipo submit para que no funcione con enter 
            
          }
        </form>
        </div>
      </div>
      
    </div>
  );
}

export default App;
