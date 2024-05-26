import React from 'react';
import "./single.scss";
import Sidebar from "../../composantes/sidebar/Sidebar";
import Navbar from "../../composantes/navbar/Navbar";
import List from "../../composantes/table/Table";
import { userColumns, userRows } from "../../datatablesource";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import PreviewIcon from '@mui/icons-material/Preview';
import DeleteIcon from '@mui/icons-material/Delete';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import axios from "axios";
import { useParams } from "react-router-dom";



const Single = () => {
    const { userId } = useParams();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/info/displayById/${userId}`);
                console.log("User data:", response.data);
                setUser(response.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, [userId]);

    if (!user) {
        return <div>Loading...</div>;
    }
    return (
        <div className='single'>
            <Sidebar />
            <div className="singleContainer">
                <Navbar />
                <div className="bottom">
                    <div className='info'>
                        <h1 className="title"> L'AFFICHE DE L'UTILISATEUR    :  {`${user.prenom} ${user.nom}`}</h1>


                        <div className="details">
                            <h1 className="itemTitle">Information Personnelle:</h1>
                            <div className="detailItem">
                                <span className="itemKey">CIN:</span>
                                <span className="itemValue">{user.cin}</span>
                            </div>
                            <div className="detailItem">
                                <span className="itemKey">Sexe:</span>
                                <span className="itemValue">{user.sexe}</span>
                            </div>
                            <div className="detailItem">
                                <span className="itemKey">Date de naissance:</span>
                                <span className="itemValue">{user.dateNaissance}</span>
                            </div>
                            <div className="detailItem">
                                <span className="itemKey">Lieu de naissance:</span>
                                <span className="itemValue">{user.lieuNaissance}</span>
                            </div>
                            <div className="detailItem">
                                <span className="itemKey">Adresse:</span>
                                <span className="itemValue">{user.adresse}</span>
                            </div>
                            <div className="detailItem">
                                <span className="itemKey">Téléphone:</span>
                                <span className="itemValue">{user.numeroTel}</span>
                            </div>
                            <div className="detailItem">
                                <span className="itemKey">Email:</span>
                                <span className="itemValue">{user.email}</span>
                            </div>
                        </div>




                        <div className="details">
                        <h1 className='itemTitle'>Informations Familiales:</h1>

                            {user.infoFamiliales && (
                                <div>
                                    <div className="detailItem">
                                        <span className="itemKey">Nom du pere:</span>
                                        <span className="itemValue">{user.infoFamiliales.nomPere}</span>
                                    </div>
                                    <div className="detailItem">
                                        <span className="itemKey">Nom du la mere:</span>
                                        <span className="itemValue">{user.infoFamiliales.nomMere}</span>
                                    </div>
                                    <div className="detailItem">
                                        <span className="itemKey">Situation Familiale:</span>
                                        <span className="itemValue">{user.infoFamiliales.situationFamiliale}</span>
                                    </div>
                                    <div className="detailItem">
                                        <span className="itemKey">Date de Mariage:</span>
                                        <span className="itemValue">{user.infoFamiliales.dateMariage}</span>
                                    </div>
                                    <div className="detailItem">
                                        <span className="itemKey">Nombre d'Enfants:</span>
                                        <span className="itemValue">{user.infoFamiliales.nombreEnfants}</span>
                                    </div>
                                    <div className="detailItem">
                                        <span className="itemKey">Nom conjoint :</span>
                                        <span className="itemValue">{user.infoFamiliales.nomConjoint}</span>
                                    </div>
                                    <div className="detailItem">
                                        <span className="itemKey">cin conjoint:</span>
                                        <span className="itemValue">{user.infoFamiliales.nombreEnfants}</span>
                                    </div>
                                    <div className="detailItem">
                                        <span className="itemKey">date de Naissance du conjoint:</span>
                                        <span className="itemValue">{user.infoFamiliales.dateNaissanceConjoint}</span>
                                    </div>
                                    <div className="detailItem">
                                        <span className="itemKey">fonction du conjoint:</span>
                                        <span className="itemValue">{user.infoFamiliales.fonctionConjoint}</span>
                                    </div>

                                    <span className="itemKey">Conjoints :</span>
                                    <div className="details">

                                        <div className="DetailItem">
                                            {user.infoFamiliales.conjoints.map((conjoint, index) => (
                                                <div key={index} className="DetailItem">
                                                    <span className="subTitle">Conjoint {index + 1}:</span>
                                                    <div className="details">
                                                    <div className="detailItem">
                                                        <span className="itemKey">cin du conjoint :</span>
                                                        <span className="itemValue">{conjoint.cinConjoint}</span>
                                                    </div>
                                                    
                                                        <div className="detailItem">
                                                            <span className="itemKey">Nom:</span>
                                                            <span className="itemValue">{conjoint.nomConjoint}</span>
                                                        </div>
                                                        <div className="detailItem">
                                                            <span className="itemKey">Date de Mariage:</span>
                                                            <span className="itemValue">{conjoint.dateMariage}</span>
                                                        </div>
                                                        <div className="detailItem">
                                                            <span className="itemKey">Date de Divorce:</span>
                                                            <span className="itemValue">{conjoint.dateDivorce}</span>
                                                        </div>
                                                        <div className="detailItem">
                                                            <span className="itemKey">Date de naissance :</span>
                                                            <span className="itemValue">{conjoint.dateNaissanceConjoint}</span>
                                                        </div>
                                                        <div className="detailItem">
                                                            <span className="itemKey">Fonction du conjoint :</span>
                                                            <span className="itemValue">{conjoint.fonctionConjoint}</span>
                                                        </div>
                                                    </div>
                                                </div>

                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>


                        <div className="details">
                        <span className="itemKey">Enfants :</span>

                            <div className="DetailItem">
                                {user.infoFamiliales.enfants.map((enfant, index) => (
                                    <div key={index} className="DetailItem">
                                        <span className="subTitle">Enfant {index + 1}:</span>
                                        <div className="details">
                                            <div className="detailItem">
                                                <span className="itemKey">Prénom de l'Enfant:</span>
                                                <span className="itemValue">{enfant.prenom}</span>
                                            </div>
                                            <div className="detailItem">
                                                <span className="itemKey">Nom de la Mère:</span>
                                                <span className="itemValue">{enfant.nomMere}</span>
                                            </div>
                                            <div className="detailItem">
                                                <span className="itemKey">Date de Naissance:</span>
                                                <span className="itemValue">{enfant.dateNaissance}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>





                        <div className="details">
                        <h1 className='itemTitle'>Informations Administratives:</h1>

                            {user.infoAdministratives && (
                                <div>
                                    <div className="detailItem">
                                        <span className="itemKey">Point de Présence Réseau (PPR):</span>
                                        <span className="itemValue">{user.infoAdministratives.ppr}</span>
                                    </div>
                                    <div className="detailItem">
                                        <span className="itemKey">Point de Branchement (PB):</span>
                                        <span className="itemValue">{user.infoAdministratives.pb}</span>
                                    </div>
                                    <div className="detailItem">
                                        <span className="itemKey">Date de Recrutement:</span>
                                        <span className="itemValue">{user.infoAdministratives.dateRecrutement}</span>
                                    </div>
                                    <div className="detailItem">
                                        <span className="itemKey">Diplôme de Recrutement:</span>
                                        <span className="itemValue">{user.infoAdministratives.diplomeRecrutement}</span>
                                    </div>
                                    <div className="detailItem">
                                        <span className="itemKey">Administration de Recrutement:</span>
                                        <span className="itemValue">{user.infoAdministratives.administrationRecrutement}</span>
                                    </div>
                                    <div className="detailItem">
                                        <span className="itemKey">Date de Titularisation:</span>
                                        <span className="itemValue">{user.infoAdministratives.dateTitularisation}</span>
                                    </div>
                                    <div className="detailItem">
                                        <span className="itemKey">Grade:</span>
                                        <span className="itemValue">{user.infoAdministratives.grade}</span>
                                    </div>
                                    <div className="detailItem">
                                        <span className="itemKey">Échelle:</span>
                                        <span className="itemValue">{user.infoAdministratives.echelle}</span>
                                    </div>
                                    <div className="detailItem">
                                        <span className="itemKey">Échelon:</span>
                                        <span className="itemValue">{user.infoAdministratives.echelon}</span>
                                    </div>
                                    <div className="detailItem">
                                        <span className="itemKey">Indice:</span>
                                        <span className="itemValue">{user.infoAdministratives.indice}</span>
                                    </div>
                                    <div className="detailItem">
                                        <span className="itemKey">Statut Administratif:</span>
                                        <span className="itemValue">{user.infoAdministratives.statutAdministratif}</span>
                                    </div>
                                    <div className="detailItem">
                                        <span className="itemKey">Situation Administrative:</span>
                                        <span className="itemValue">{user.infoAdministratives.situationAdministrative}</span>
                                    </div>
                                </div>
                            )}

                        </div>



                        <div className="details">
                        <h1 className='itemTitle'>Informations Prévoyance Sociale:</h1>

                            {user.infoPrevoyanceSociale && (
                                <div>
                                    <div className="detailItem">
                                        <span className="itemKey">Organisme de Prévoyance Sociale:</span>
                                        <span className="itemValue">{user.infoPrevoyanceSociale.organismePrevoyanceSociale}</span>
                                    </div>
                                    <div className="detailItem">
                                        <span className="itemKey">Numéro d'Affiliation CNOPS:</span>
                                        <span className="itemValue">{user.infoPrevoyanceSociale.numAffiliationCNOPS}</span>
                                    </div>
                                    <div className="detailItem">
                                        <span className="itemKey">Numéro d'Immatriculation CNOPS:</span>
                                        <span className="itemValue">{user.infoPrevoyanceSociale.numImmatriculationCNOPS}</span>
                                    </div>
                                    <div className="detailItem">
                                        <span className="itemKey">Date d'Affiliation CNOPS:</span>
                                        <span className="itemValue">{user.infoPrevoyanceSociale.dateAffiliationCNOPS}</span>
                                    </div>
                                </div>)}
                        </div>



                        <div className="details">
                        <h1 className='itemTitle'>Organismes Sociales:</h1>

                            {user.organismesSociales && (
                                <div>
                                    <div className="detailItem">
                                        <span className="itemKey">Numéro d'Affiliation à la Fondation Hassan II:</span>
                                        <span className="itemValue">{user.organismesSociales.numAffiliationFondationHassan2}</span>
                                    </div>
                                </div>)}

                        </div>




                        <div className="details">
                        <h1 className='itemTitle'>Informations Retraite:</h1>

                            {user.infoRetraite && (
                                <div>
                                    <div className="detailItem">
                                        <span className="itemKey">Organisme de Retraite:</span>
                                        <span className="itemValue">{user.infoRetraite.organismeRetraite}</span>
                                    </div>
                                    <div className="detailItem">
                                        <span className="itemKey">Numéro d'Affiliation Retraite:</span>
                                        <span className="itemValue">{user.infoRetraite.numeroAffiliationRetraite}</span>
                                    </div>
                                    <div className="detailItem">
                                        <span className="itemKey">Date d'Affiliation Retraite:</span>
                                        <span className="itemValue">{user.infoRetraite.dateAffiliationRetraite}</span>
                                    </div>
                                </div>)}
                        </div>



                        <div className="details">
                        <h1 className='itemTitle'>Informations Assurance:</h1>

                            {user.infoAssurance && (
                                <div>
                                    <div className="detailItem">
                                        <span className="itemKey">Organisme d'Assurance:</span>
                                        <span className="itemValue">{user.infoAssurance.organismeAssurance}</span>
                                    </div>
                                    <div className="detailItem">
                                        <span className="itemKey">Numéro d'Affiliation Assurance:</span>
                                        <span className="itemValue">{user.infoAssurance.numeAffiliationAssurance}</span>
                                    </div>
                                </div>)}
                        </div>

                        <div className="details">
                        <h1 className='itemTitle'>Diplomes:</h1>

                            {user.diplomes && (
                                <div>
                                    {user.diplomes.map((diplome, index) => (
                                        <div key={index} className="detailItem">
                                            <span className="subTitle">Diplome {index + 1}:</span>
                                            <div className="detailItem">
                                                <span className="itemKey">intitule:</span>
                                                <span className="itemValue">{diplome.intitule}</span>
                                            </div>
                                            <div className="detailItem">
                                                <span className="itemKey">specialite :</span>
                                                <span className="itemValue">{diplome.specialite}</span>
                                            </div>
                                            <div className="detailItem">
                                                <span className="itemKey">date d'obtention :</span>
                                                <span className="itemValue">{diplome.dateObtention}</span>
                                            </div>
                                            <div className="detailItem">
                                                <span className="itemKey">etablissement:</span>
                                                <span className="itemValue">{diplome.etablissement}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className="details">
                        <h1 className='itemTitle'>notations:</h1>

                            {user.notations && (
                                <div>
                                    {user.notations.map((notation, index) => (
                                        <div key={index} className="detailItem">
                                            <span className="subTitle">Notation {index + 1}:</span>
                                            <div className="detailItem">
                                                <span className="itemKey">annee:</span>
                                                <span className="itemValue">{notation.annee}</span>
                                            </div>
                                            <div className="detailItem">
                                                <span className="itemKey">note :</span>
                                                <span className="itemValue">{notation.note}</span>
                                            </div>

                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className="details">
                        <h1 className='itemTitle'>mouvements:</h1>

                            {user.mouvements && (
                                <div>
                                    {user.mouvements.map((mouvement, index) => (
                                        <div key={index} className="detailItem">
                                            <span className="subTitle">Mouvement {index + 1}:</span>
                                            <div className="detailItem">
                                                <span className="itemKey">administration :</span>
                                                <span className="itemValue">{mouvement.administration}</span>
                                            </div>
                                            <div className="detailItem">
                                                <span className="itemKey">date Debut :</span>
                                                <span className="itemValue">{mouvement.dateDebut}</span>
                                            </div>
                                            <div className="detailItem">
                                                <span className="itemKey">date Fin :</span>
                                                <span className="itemValue">{mouvement.dateFin}</span>
                                            </div>

                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className="details">
                        <h1 className='itemTitle'>affectations:</h1>

                            {user.affectations && (
                                <div>
                                    {user.affectations.map((affectation, index) => (
                                        <div key={index} className="detailItem">
                                            <span className="subTitle">Affectation {index + 1}:</span>
                                            <div className="detailItem">
                                                <span className="itemKey">entite :</span>
                                                <span className="itemValue">{affectation.entite}</span>
                                            </div>
                                            <div className="detailItem">
                                                <span className="itemKey">date d'affectation:</span>
                                                <span className="itemValue">{affectation.dateAffectation}</span>
                                            </div>
                                            <div className="detailItem">
                                                <span className="itemKey">poste:</span>
                                                <span className="itemValue">{affectation.poste}</span>
                                            </div>

                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>



                        <div className="details">
                        <h1 className='itemTitle'>Sanctions:</h1>

                            {user.sanctions && (
                                <div>
                                    {user.sanctions.map((sanction, index) => (
                                        <div key={index} className="detailItem">
                                            <span className="subTitle">Sanction {index + 1}:</span>
                                            <div className="detailItem">
                                                <span className="itemKey">sanction:</span>
                                                <span className="itemValue">{sanction.sanction}</span>
                                            </div>
                                            <div className="detailItem">
                                                <span className="itemKey">nature :</span>
                                                <span className="itemValue">{sanction.nature}</span>
                                            </div>
                                            <div className="detailItem">
                                                <span className="itemKey">motif:</span>
                                                <span className="itemValue">{sanction.motif}</span>
                                            </div>
                                            <div className="detailItem">
                                                <span className="itemKey">date de la sanction:</span>
                                                <span className="itemValue">{sanction.dateSanction}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>



                        <div className="details">
                        <h1 className='itemTitle'>Documents et Pièces Jointes:</h1>

                            {user.documentsPiecesJointes && (
                                <div>
                                    {user.documentsPiecesJointes.map((document, index) => (
                                        <div key={index} className="detailItem">
                                            <span className="subTitle">document {index + 1}:</span>
                                            <div className="detailItem">
                                                <span className="itemKey">nom:</span>
                                                <span className="itemValue">{document.nom}</span>
                                            </div>
                                            <div className="detailItem">
                                                <span className="itemKey">chemin de Stockage:</span>
                                                <span className="itemValue">{document.cheminStockage}</span>
                                            </div>
                                            <div className="detailItem">
                                                <span className="itemKey">type du document:</span>
                                                <span className="itemValue">{document.type}</span>
                                            </div>

                                            <div className="detailItem">
                                                <span className="itemKey">Nom du Sous-Dossier:</span>
                                                <span className="itemValue">{document.sousDossier ? document.sousDossier.nomSousDoussier : ""}</span>
                                            </div>



                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>


                    </div>
                </div>
            </div>
        </div>);


}
export default Single;
