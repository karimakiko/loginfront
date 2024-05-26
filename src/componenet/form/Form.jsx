import React, { useEffect, useState } from 'react';
import "./form.scss";
import Sidebar from "../../composantes/sidebar/Sidebar";
import Navbar from "../../composantes/navbar/Navbar";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const Form = () => {
  let navigate = useNavigate();

  const { userId } = useParams();

  const [user, setUser] = useState({
    cin: "",
    nom: "",
    prenom: "",
    sexe: "",
    dateNaissance: "",
    lieuNaissance: "",
    adresse: "",
    numeroTel: "",
    email: "",
    infoFamiliales: {
      nomPere: "",
      nomMere: "",
      situationFamiliale: "",
      dateMariage: "",
      nomConjoint: "",
      cinConjoint: "",
      dateNaissanceConjoint: "",
      fonctionConjoint: "",
      nombreEnfants: "",
      conjoints: [],
      enfants: [],
    },
    infoAdministratives: {
      ppr: "",
      pb: "",
      dateRecrutement: "",
      diplomeRecrutement: "",
      administrationRecrutement: "",
      dateTitularisation: "",
      grade: "",
      echelle: "",
      echelon: "",
      indice: "",
      statutAdministratif: "",
      situationAdministrative: ""
    },
    infoPrevoyanceSociale: {
      organismePrevoyanceSociale: "",
      numAffiliationCNOPS: "",
      numImmatriculationCNOPS: "",
      dateAffiliationCNOPS: ""
    },
    sanctions: [{
      sanction: "",
      nature: "",
      motif: "",
      dateSanction: ""
    }]
  });

  useEffect(() => {
    loadUser()
  }, []);

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setUser(prevUser => {
      const updatedUser = { ...prevUser };

      // Gestion des champs imbriqués
      const keys = name.split('.');
      const lastKeyIndex = keys.length - 1;

      keys.reduce((acc, currentKey, index) => {
        if (index === lastKeyIndex) {
          acc[currentKey] = value;
        } else {
          acc[currentKey] = { ...acc[currentKey] };
        }
        return acc[currentKey];
      }, updatedUser);

      return updatedUser;
    });
  };
  const handleArrayChange = (index, name, e) => {
    const { value } = e.target;
    const newArray = [...user[name]];
    newArray[index][e.target.name] = value;
    setUser({ ...user, [name]: newArray });
  };
  const handleAddItem = (name) => {
    setUser({ ...user, [name]: [...user[name], {}] });
  };

  const handleRemoveItem = (name, index) => {
    const newArray = [...user[name]];
    newArray.splice(index, 1);
    setUser({ ...user, [name]: newArray });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.put(`http://localhost:8080/api/info/update/${userId}`, user);
      console.log(result.data);
      alert('Données mises à jour avec succès !');
      navigate("/users");
    } catch (error) {
      console.error('Erreur lors de la mise à jour des données:', error);
      alert('Une erreur s\'est produite lors de la mise à jour des données. Veuillez réessayer.');
    }
  };

  const loadUser = async () => {
    try {
      const result = await axios.get(`http://localhost:8080/api/info/displayById/${userId}`);
      setUser(result.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des données:', error);
    }
  };

  return (
    <div className='new'>
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className='bottom'>
          <form onSubmit={onSubmit}>
            <h1 className="text-center mb-4">Modifier les informations de l'utilisateur :</h1>
            <div className='info row'>

              {/* Information Personnelle */}
              <div className="col-md-10">
                <div className="details">
                  <h2 className='title text-primary'>Information Personnelle:</h2>
                  <div className="mb-3">
                    <label className="form-label">Prénom:</label>
                    <input type="text" className="form-control" name="prenom" value={user.prenom} onChange={onInputChange} />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Nom:</label>
                    <input type="text" className="form-control" name="nom" value={user.nom} onChange={onInputChange} />
                  </div>
                  <div className="mb-3">
                    <label className="form-label text-warning">CIN:</label>
                    <input type="text" className="form-control" name="cin" value={user.cin} onChange={onInputChange} />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Sexe:</label>
                    <input type="text" className="form-control" name="sexe" value={user.sexe} onChange={onInputChange} />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Date de naissance:</label>
                    <input type="date" className="form-control" name="dateNaissance" value={user.dateNaissance} onChange={onInputChange} />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Lieu de naissance:</label>
                    <input type="text" className="form-control" name="lieuNaissance" value={user.lieuNaissance} onChange={onInputChange} />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Adresse:</label>
                    <input type="text" className="form-control" name="adresse" value={user.adresse} onChange={onInputChange} />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Numéro de téléphone:</label>
                    <input type="text" className="form-control" name="numeroTel" value={user.numeroTel} onChange={onInputChange} />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Email:</label>
                    <input type="text" className="form-control" name="email" value={user.email} onChange={onInputChange} />
                  </div>
                </div>
              </div>

              {/* Informations Familiales */}
              <div className="col-md-15">
                <div className="details">
                  <h2 className='title text-primary'>Informations Familiales:</h2>
                  <div className="mb-3">
                    <label className="form-label">Nom de père :</label>
                    <input type="text" className="form-control" name="infoFamiliales.nomPere" value={user.infoFamiliales.nomPere} onChange={onInputChange} />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Nom de la mère:</label>
                    <input type="text" className="form-control" name="infoFamiliales.nomMere" value={user.infoFamiliales.nomMere} onChange={onInputChange} />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Situation Familiale:</label>
                    <input type="text" className="form-control" name="infoFamiliales.situationFamiliale" value={user.infoFamiliales.situationFamiliale} onChange={onInputChange} />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Date de mariage:</label>
                    <input type="date" className="form-control" name="infoFamiliales.dateMariage" value={user.infoFamiliales.dateMariage} onChange={onInputChange} />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Nom du conjoint :</label>
                    <input type="text" className="form-control" name="infoFamiliales.nomConjoint" value={user.infoFamiliales.nomConjoint} onChange={onInputChange} />
                  </div>
                  <div className="mb-3">
                    <label className="form-label text-warning">CIN du conjoint :</label>
                    <input type="text" className="form-control" name="infoFamiliales.cinConjoint" value={user.infoFamiliales.cinConjoint} onChange={onInputChange} />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Date de naissance du conjoint :</label>
                    <input type="date" className="form-control" name="infoFamiliales.dateNaissanceConjoint" value={user.infoFamiliales.dateNaissanceConjoint} onChange={onInputChange} />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Fonction du conjoint :</label>
                    <input type="text" className="form-control" name="infoFamiliales.fonctionConjoint" value={user.infoFamiliales.fonctionConjoint} onChange={onInputChange} />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Nombre d'enfants :</label>
                    <input type="text" className="form-control" name="infoFamiliales.nombreEnfants" value={user.infoFamiliales.nombreEnfants} onChange={onInputChange} />
                  </div>


                  <h2 className='title text-primary'> conjoints :</h2>

                  {user.infoFamiliales.conjoints.map((conjoint, index) => (
                    <div key={index} className="row mb-3">
                      <div className="col-md-2">
                        <label className="form-label">CIN du Conjoint {index + 1} :</label>
                        <input type="text" className="form-control"  name="cinConjoint" value={conjoint.cinConjoint} onChange={(e) => handleArrayChange(index, "conjoints", e)} />
                      </div>
                      <div className="col-md-2">
                        <label className="form-label ">Date de Mariage :</label>
                        <input className="form-control" type="date" name="dateMariage" value={conjoint.dateMariage} onChange={(e) => handleArrayChange(index, "conjoints", e)} />
                      </div>
                      <div className="col-md-2">
                        <label className="form-label ">Date de Divorce :</label>
                        <input className="form-control" type="date" name="dateDivorce" value={conjoint.dateDivorce} onChange={(e) => handleArrayChange(index, "conjoints", e)} />
                      </div>
                      <div className="col-md-2">
                        <label className="form-label ">Nom du Conjoint :</label>
                        <input className="form-control" type="text" name="nomConjoint" value={conjoint.nomConjoint} onChange={(e) => handleArrayChange(index, "conjoints", e)} />
                      </div>
                      <div className="col-md-2 d-flex align-items-end">
                        <button type="button" className="btn btn-danger mt-2" onClick={() => handleRemoveItem("conjoints", index)}>Supprimer</button>
                      </div>
                    </div>
                  ))}
                  <div className="row">
                    <div className="col-md-12">
                      <button type="button" className="btn btn-primary mb-3" onClick={() => handleAddItem("conjoints")}>Ajouter un conjoint</button>
                    </div>
                  </div>



                </div>
              </div>
            </div>

            <div className='info row'>
              {/* Informations Administratives */}
              <div className="col-md-10">
                <div className="details">
                  <h2 className='title text-primary'>Informations Administratives:</h2>
                  <div className="mb-3">
                    <label className="form-label">PPR :</label>
                    <input type="text" className="form-control" name="infoAdministratives.ppr" value={user.infoAdministratives.ppr} onChange={onInputChange} />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">PB :</label>
                    <input type="text" className="form-control" name="infoAdministratives.pb" value={user.infoAdministratives.pb} onChange={onInputChange} />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Date de recrutement :</label>
                    <input type="date" className="form-control" name="infoAdministratives.dateRecrutement" value={user.infoAdministratives.dateRecrutement} onChange={onInputChange} />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Diplôme de recrutement :</label>
                    <input type="text" className="form-control" name="infoAdministratives.diplomeRecrutement" value={user.infoAdministratives.diplomeRecrutement} onChange={onInputChange} />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Administration de recrutement :</label>
                    <input type="text" className="form-control" name="infoAdministratives.administrationRecrutement" value={user.infoAdministratives.administrationRecrutement} onChange={onInputChange} />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Date de titularisation :</label>
                    <input type="date" className="form-control" name="infoAdministratives.dateTitularisation" value={user.infoAdministratives.dateTitularisation} onChange={onInputChange} />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Grade :</label>
                    <input type="text" className="form-control" name="infoAdministratives.grade" value={user.infoAdministratives.grade} onChange={onInputChange} />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Echelle :</label>
                    <input type="text" className="form-control" name="infoAdministratives.echelle" value={user.infoAdministratives.echelle} onChange={onInputChange} />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Echelon :</label>
                    <input type="text" className="form-control" name="infoAdministratives.echelon" value={user.infoAdministratives.echelon} onChange={onInputChange} />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Indice :</label>
                    <input type="text" className="form-control" name="infoAdministratives.indice" value={user.infoAdministratives.indice} onChange={onInputChange} />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Statut administratif :</label>
                    <input type="text" className="form-control" name="infoAdministratives.statutAdministratif" value={user.infoAdministratives.statutAdministratif} onChange={onInputChange} />
                  </div>
                </div>
              </div>

              {/* Informations de Prévoyance Sociale */}
              <div className="col-md-10">
                <div className="details">
                  <h2 className='title text-primary'>Informations de Prévoyance Sociale:</h2>
                  <div className="mb-3">
                    <label className="form-label">Numéro d'affiliation CNOPS :</label>
                    <input type="text" className="form-control" name="infoPrevoyanceSociale.numAffiliationCNOPS" value={user.infoPrevoyanceSociale.numAffiliationCNOPS} onChange={onInputChange} />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Numéro d'immatriculation CNOPS :</label>
                    <input type="text" className="form-control" name="infoPrevoyanceSociale.numImmatriculationCNOPS" value={user.infoPrevoyanceSociale.numImmatriculationCNOPS} onChange={onInputChange} />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Date d'affiliation CNOPS :</label>
                    <input type="date" className="form-control" name="infoPrevoyanceSociale.dateAffiliationCNOPS" value={user.infoPrevoyanceSociale.dateAffiliationCNOPS} onChange={onInputChange} />
                  </div>
                </div>
              </div>

            </div>
              <div className="details">

              <h2 className='title text-primary'>Sanctions:</h2>
              {user.sanctions.map((sanction, index) => (
                <div key={index} className="row mb-3">
                  <div className="col-md-2">
                    <label>Sanction :</label>
                    <input type="text" className="form-control" name="sanction" value={sanction.sanction} onChange={(e) => handleArrayChange(index, "sanctions", e)} />
                  </div>
                  <div className="col-md-2">
                    <label>Nature :</label>
                    <input type="text" className="form-control" name="nature" value={sanction.nature} onChange={(e) => handleArrayChange(index, "sanctions", e)} />
                  </div>
                  <div className="col-md-2">
                    <label>Motif :</label>
                    <input type="text" className="form-control" name="motif" value={sanction.motif} onChange={(e) => handleArrayChange(index, "sanctions", e)} />
                  </div>
                  <div className="col-md-2">
                    <label>Date de sanction :</label>
                    <input type="date" className="form-control" name="dateSanction" value={sanction.dateSanction} onChange={(e) => handleArrayChange(index, "sanctions", e)} />
                  </div>
                  <div className="col-md-2 d-flex align-items-end">
                    <button type="button" className="btn btn-danger mt-2" onClick={() => handleRemoveItem("sanctions", index)}>Supprimer</button>
                  </div>
                </div>
              ))}
              <div className="row">
                <div className="col-md-12">
                  <button type="button" className="btn btn-primary mb-3" onClick={() => handleAddItem("sanctions")}>Ajouter une sanction</button>
                </div>
              </div>
            </div>

        <button type="submit" className="btn btn-success">Mettre à jour</button>
      </form>
    </div>
      </div >
    </div >
  );

};

export default Form;
