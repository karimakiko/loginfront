import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Link, useNavigate } from "react-router-dom";
import PreviewIcon from '@mui/icons-material/Preview';
import DeleteIcon from '@mui/icons-material/Delete';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import axios from 'axios';
import { userColumns2 } from "../../datatablesource";
import CircularProgress from '@mui/material/CircularProgress';

const DatatableAbs = () => {
  const [demandes, setDemandes] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchDemandes();
  }, []);

  const fetchDemandes = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/demandes/getDrefused');
      if (response.data && Array.isArray(response.data) && response.data.length > 0) {
        setDemandes(response.data);
      }
    } catch (error) {
      console.error('Error fetching demandes:', error);
    } finally {
      setLoading(false);
    }
  };

    const handleViewDetails = (code) => {
      if (code) {
        navigate(`/Demandes/Absence/${code}`);
      }
    };


  const handleDelete = async (code) => {
    try {
      await axios.delete(`http://localhost:8080/api/demandes/delete/${code}`);
      setDemandes(demandes.filter((item) => item.code !== code));
    } catch (error) {
      console.error('Error deleting demande:', error);
    }
  };

  const columns = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => (
        <div className="cellAction">
          <div className="viewButton" onClick={() => handleViewDetails(params.row.code)}>
            <PreviewIcon />
          </div>
          <div className="deleteButton" onClick={() => handleDelete(params.row.code)}>
            <DeleteIcon />
          </div>
        </div>
      ),
    },
  ];

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <div className="datatable">
      <div className="datatableTitle">
        Liste des demandes d'absences refused:
      </div>
      <DataGrid
        className="datagrid"
        rows={demandes}
        columns={userColumns2.concat(columns)}
        getRowId={(row) => row.code} // Utilisez row.code pour l'identifiant unique
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
      />
    </div>
  );
};

export default DatatableAbs;
