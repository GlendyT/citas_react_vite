


import { useState, useEffect } from "react";
import Error from "./Error";

const Formulario = ({pacientes, setPacientes, paciente, setPaciente }) => {

    const [nombre, setNombre ] = useState("");
    const [propietario, setPropietario ] = useState("");
    const [email, setEmail ] = useState("");
    const [fecha, setFecha ] = useState("");
    const [sintomas, setSintomas ] = useState("");

    const [ error, setError] = useState(false)

    useEffect(() => {
        if(Object.keys(paciente).length > 0) {
            setNombre(paciente.nombre)
            setPropietario(paciente.propietario)
            setEmail(paciente.email)
            setFecha(paciente.fecha)
            setSintomas(paciente.sintomas)
        
        }
     }, [paciente])  


     const generarId = () => {
        const random = Math.random().toString(36).substr(2);
        const fecha = Date.now().toString(36);

        return random + fecha
     }

     const handleSubmit = (e) => {
        e.preventDefault ();

        //calidacion del formulario 

        if([ nombre, propietario, email, fecha, sintomas].includes ("")){
            console.log("Hay al menos un campo vacio")

            setError(true)
            return; 
        }
        setError(false) 


        //objet6o de paciente
        const objetoPaciente = {
            nombre, 
            propietario, 
            email, 
            fecha, 
            sintomas
        }

         if(paciente.id) {
            //Editando el registro 
            objetoPaciente.id = paciente.id

            const pacientesActualizados = pacientes.map( pacienteState => pacienteState.id ===
            paciente.id ? objetoPaciente : pacienteState )

            setPacientes(pacientesActualizados)
            setPaciente({})

         } else {
            //Nuevo registro
            objetoPaciente.id = generarId();
            setPacientes([...pacientes, objetoPaciente]);
         }

         //reiniciar el form
         setNombre("")
         setPropietario("")
         setEmail("")
         setFecha("")
         setSintomas("")
        
    }

     return (
        <div className="md:w-1/2 lg:w-2/5 mx-5 ">
            <h1 className="font-black text-3xl text-ce">Segumiento 
            Pacientes </h1>

            <p className="text-lg mt-5 text-center mb-10">
                Añade Pacientes y {""}
                <span className=" text-indigo-600 font-bold 
            "> Administralos </span>
            </p>

            <form 
            onSubmit={handleSubmit}
            className=" bg-white shadow-md rounded-lg py-10 px-5 mb-10">

                {error && <Error> <p> Todos los campos son requeridos </p> </Error>}

                <div className="mb-5">
                    <label htmlFor="mascota" className=" block text-gray-700 uppercase font-bold ">
                         Nombre Mascota 
                         </label>
                    <input 
                    id="mascota"
                    type="text" 
                    placeholder="Nombre de la Mascota "
                    className=" border-2 w-full p-2 mt-2 placeholder-grey-400 rounded-lg"
                    value={ nombre }
                    onChange={ (e) => setNombre (e.target.value)}
                    />
                </div>


                <div className="mb-5">
                    <label htmlFor="Propietario" className=" block text-gray-700 uppercase font-bold ">
                         Nombre Propietario 
                         </label>
                    <input 
                    id="propietario"
                    type="text" 
                    placeholder="Nombre del Propietario "
                    className=" border-2 w-full p-2 mt-2 placeholder-grey-400 rounded-lg"
                    value={ propietario }
                    onChange={ (e) => setPropietario (e.target.value)}
                    />
                </div>

                <div className="mb-5">
                    <label htmlFor="email" className=" block text-gray-700 uppercase font-bold ">
                         Email de contacto
                         </label>
                    <input 
                    id="email"
                    type="email" 
                    placeholder="email de contacto "
                    className=" border-2 w-full p-2 mt-2 placeholder-grey-400 rounded-lg"
                    value={ email }
                    onChange={ (e) => setEmail (e.target.value)}
                    />
                </div>


                <div className="mb-5">
                    <label htmlFor="alta" className=" block text-gray-700 uppercase font-bold ">
                         Alta 
                         </label>
                    <input 
                    id="alta"
                    type="date" 
                    className=" border-2 w-full p-2 mt-2 placeholder-grey-400 rounded-lg"
                    value={ fecha }
                    onChange={ (e) => setFecha (e.target.value)}
                    />
                </div>

                <div className="mb-5">
                    <label htmlFor="Propietario" className=" block text-gray-700 uppercase font-bold ">
                         Sintomas 
                         </label>
                         <textarea
                         id="Sintomas"
                         className=" border-2 w-full p-2 mt-2 placeholder-grey-400 rounded-lg"
                         value={ sintomas }
                         onChange={ (e) => setSintomas (e.target.value)}
                         placeholder="Describe los sintomas"
                         
                         
                         />
                </div>

                <input 
                type= "submit"
                className=" bg-indigo-600 w-full p-3 text-white font-bold uppercase
                hover:bg-indigo-800 cursor-pointer transition-shadow"
                value= { paciente. id  ? "Editar Paciente" : "Agregar Paciente"}
                 />

            </form>
        </div>
     )
}

export default Formulario