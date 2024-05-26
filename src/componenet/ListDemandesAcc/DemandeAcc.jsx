import React from 'react'
import "./DemandeAcc.scss"
import Sidebar from "../../composantes/sidebar/Sidebar";
import Navbar from "../../composantes/navbar/Navbar";
import DatatablesDAcc from '../../composantes/datatablesDAcc/datatablesDAcc';
export const List = () => {
  return (
    <div className='list'>
      <Sidebar/>
      <div className='listContainer'>
        <Navbar/>
        <DatatablesDAcc/>
      </div>

    </div>
  )
}
export default List ;