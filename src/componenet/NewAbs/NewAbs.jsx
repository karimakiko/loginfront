import React, { useState } from 'react';
import "./newAbs.scss";
import Sidebar from "../../composantes/sidebar/Sidebar";
import Navbar from "../../composantes/navbar/Navbar";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const NewAbs = () => {
  let navigate = useNavigate();

  const [formData, setFormData] = useState({
    code: "",
    cin: "",
    datededepart: "",
    nbrjourdeduire: "",
    nbrjournepasdeduire: "",
    type: "",
    nbrjours: "",
    reliquat: "",
    cinramplacant: "",
    cumul: ""
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.type) {
      alert("Veuillez sélectionner un type d'absence");
      return;
    }
    try {
      const result = await axios.post('http://localhost:8080/api/demandes/add', formData);
      console.log(result.data);
      alert('Demande d\'absence ajoutée avec succès !');
      navigate("/Demandes/Absence");
    } catch (error) {
      console.error('Erreur lors de l\'ajout de la demande d\'absence:', error);
      console.log('Error response:', error.response); // Log the error response
      alert('Une erreur s\'est produite lors de l\'ajout de la demande d\'absence. Veuillez réessayer.');
    }
  };

  return (
    <div className='new'>
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className='bottom'>
          <form className="row g-4" onSubmit={handleSubmit}>
            <h1 className="text-center mb-9">Ajouter une nouvelle demande d'absence</h1>

            <div className="col-md-3">
              <label className="form-label">Date de départ :</label>
              <input className="form-control" type="date" name="datededepart" value={formData.datededepart} onChange={handleInputChange} />
            </div>

            <div className="col-md-3">
              <label className="form-label">votre cin :</label>
              <input className="form-control" type="text" name="cin" value={formData.cin} onChange={handleInputChange} />
            </div>

            <div className="col-md-3">
              <label className="form-label">Nombre de jours :</label>
              <input className="form-control" type="text" name="nbrjours" value={formData.nbrjours} onChange={handleInputChange} />
            </div>

            <div className="col-md-3">
              <label className="form-label">CIN du remplaçant :</label>
              <input className="form-control" type="text" name="cinramplacant" value={formData.cinramplacant} onChange={handleInputChange} />
            </div>

            <div className="col-md-3">
              <label className="form-label">Type d'absence :</label>
              <select className="form-select" name="type" value={formData.type} onChange={handleInputChange}>
                <option value="">Sélectionner</option>
                <option value="maladie">Maladie</option>
                <option value="administatives">Administratives</option>
                <option value="congenormal">Congé Normal</option>
                <option value="exceptionnelle">Absence Exceptionnelle</option>
                <option value="hajj">Hajj</option>
              </select>
            </div>

            <div className="text-center">
              <button type="submit" className="btn btn-danger btn-lg">Ajouter demande d'absence </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default NewAbs;
