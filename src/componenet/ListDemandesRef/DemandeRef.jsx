import React from 'react'
import "./DemandeRef.scss"
import Sidebar from "../../composantes/sidebar/Sidebar";
import Navbar from "../../composantes/navbar/Navbar";
import DatatablesDRef from '../../composantes/datatablesDRef/datatablesDRef';
export const List = () => {
  return (
    <div className='list'>
      <Sidebar/>
      <div className='listContainer'>
        <Navbar/>
        <DatatablesDRef/>
      </div>

    </div>
  )
}
export default List ;