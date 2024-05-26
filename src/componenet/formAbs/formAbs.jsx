import React, { useEffect, useState } from 'react';
import "./formAbs.scss";
import Sidebar from "../../composantes/sidebar/Sidebar";
import Navbar from "../../composantes/navbar/Navbar";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const FormAbs = () => {
  let navigate = useNavigate();

  const { userId } = useParams();

  const [formData, setFormData] = useState({
    code: "",
    datededepart: "",
    cin:"",
    nbrjours: "",
    nbrjourdeduire: "",
    nbrjournepasdeduire: "",
    type: "",
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
  useEffect(() => {
    loadUser();
  }, []);


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.put(`http://localhost:8080/api/demandes/update/${userId}`, formData); // Updated URL for put request
      console.log(result.data);
      alert('Données mises à jour avec succès !');
      navigate("/Demandes/Absence");
    } catch (error) {
      console.error('Erreur lors de la mise à jour des données:', error);
      alert('Une erreur s\'est produite lors de la mise à jour des données. Veuillez réessayer.');
    }
  };

  const loadUser = async () => {
    try {
      const result = await axios.get(`http://localhost:8080/api/demandes/getByid/${userId}`); // Updated URL for get request
       setFormData(result.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des données:', error);
    }
  };

  return (
    <div className='new'>
      <Sidebar/>
      <div className="newContainer">
        <Navbar />
        <div className='bottom'>
        <form className="row g-2" onSubmit={handleSubmit}>
  <h1 className="text-center mb-9">Editer votre demande d'absence</h1>

  <div className="col-md-3">
    <label className="form-label">nbrjours :</label>
    <input className="form-control" type="text" name="nbrjours" value={formData.nbrjours} onChange={handleInputChange} />
  </div>
  <div className="col-md-3">
    <label className="form-label">Date de départ :</label>
    <input className="form-control" type="date" name="datededepart" value={formData.datededepart} onChange={handleInputChange} />
  </div>
  <div className="col-md-3">
    <label className="form-label">CIN du remplaçant :</label>
    <input className="form-control" type="text" name="cinramplacant" value={formData.cinramplacant} onChange={handleInputChange} />
  </div>

  <div className="col-md-3">
  <label className="form-label">type d'absence :</label>

            <select className="form-select" name="type" value={formData.type} onChange={handleInputChange}>
  <option value="">Select Type</option>
  <option value="maladie">Maladie</option>
  <option value="administatives">Administratives</option>
  <option value="congenormal">Congé Normal</option>
  <option value="exceptionnelle">Absence Exceptionnelle</option>
  <option value="hajj">Hajj</option>
</select>

          </div>
  <div className="text-center">
    <button type="submit" className="btn btn-danger btn-lg"> confirmer  </button>
  </div>
</form>
        </div>
      </div>
    </div>
  );
};

export default FormAbs;