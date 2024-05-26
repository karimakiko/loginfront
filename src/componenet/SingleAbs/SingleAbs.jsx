import React, { useEffect, useState } from 'react';
import "./singleAbs.scss";
import Sidebar from "../../composantes/sidebar/Sidebar";
import Navbar from "../../composantes/navbar/Navbar";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
const SingleAbs = () => {
    let navigate = useNavigate();
    const { code } = useParams();

    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log(code);
                const demandResponse = await axios.get(`http://localhost:8080/api/demandes/getByid/${code}`);
                console.log("User data:", demandResponse.data);
                setUser(demandResponse.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, [code]);

    const handleAccept = async () => {
        try {
            await axios.post(`http://localhost:8080/api/demandes/accepted/${code}`);
            alert("Demande acceptée");
            navigate("/Demandes/Absence");
            // Mettre à jour l'état de l'utilisateur après l'acceptation de la demande
            setUser({ ...user, status: "ACCEPTÉE" });
        } catch (error) {
            console.error('Error accepting demand:', error);
        }
    };

    const handleRefuse = async () => {
        try {
            await axios.post(`http://localhost:8080/api/demandes/refused/${code}`);
            alert("Demande refusée");
            navigate("/Demandes/Absence");
            // Mettre à jour l'état de l'utilisateur après le refus de la demande
            setUser({ ...user, status: "REFUSÉE" });
        } catch (error) {
            console.error('Error refusing demand:', error);
        }
    };

    return (
        <div className='single'>
            <Sidebar />
            <div className="singleContainer">
                <Navbar />
                <div className="bottom">
                    <div className='info'>
                        {user && (
                            <div>
                                <h1 className="title">La demande d'absence :</h1>
                                <div className="detailItem ">
                                    <div className="detailitem">
                                        <span className="itemKey">cin:</span>
                                        <span className="itemValue">{user.fonctionnaire.cin}</span>
                                    </div>
                                    <div className="detailitem">
                                        <span className="itemKey">nom:</span>
                                        <span className="itemValue">{user.fonctionnaire.nom}</span>
                                    </div>
                                    <div className="detailitem">
                                        <span className="itemKey">prenom:</span>
                                        <span className="itemValue">{user.fonctionnaire.prenom}</span>
                                    </div>
                                    <div className="detailitem">
                                        <span className="itemKey">Date de départ :</span>
                                        <span className="itemValue">{user.datededepart}</span>
                                    </div>
                                    <div className="detailitem">
                                        <span className="itemKey">Date de retour :</span>
                                        <span className="itemValue">{user.dateRetour}</span>
                                    </div>
                                    <div className="detailitem">
                                        <span className="itemKey">Nombre de jours :</span>
                                        <span className="itemValue">{user.nbrjours}</span>
                                    </div>
                                    <div className="detailitem">
                                        <span className="itemKey">Nombre de jours à déduire :</span>
                                        <span className="itemValue">{user.nbrjourdeduire}</span>
                                    </div>
                                    <div className="detailitem">
                                        <span className="itemKey">Nombre de jours à ne pas déduire :</span>
                                        <span className="itemValue">{user.nbrjournepasdeduire}</span>
                                    </div>
                                    <div className="detailitem">
                                        <span className="itemKey">Reliquat :</span>
                                        <span className="itemValue">{user.reliquat}</span>
                                    </div>
                                    <div className="detailitem">
                                        <span className="itemKey">Le remplaçant :</span>
                                        <span className="itemValue">{user.remplacant}</span>
                                    </div>
                                    <div className="detailitem">
                                        <span className="itemKey">Cumul des absences de maladie :</span>
                                        <span className="itemValue">{user.cumul}</span>
                                    </div>
                                </div>
                                <div>
                                    <Button variant="success" onClick={handleAccept}>Accepter</Button>{' '}
                                    <Button variant="danger" onClick={handleRefuse}>Refuser</Button>{' '}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SingleAbs;
