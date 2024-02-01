import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom";

export const VoluntarioDashboard = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    const [favorites, setFavorites] = useState([]);
    const [showDonationModal, setShowDonationModal] = useState(false);
  const [donatedCampaignInfo, setDonatedCampaignInfo] = useState(null);

    useEffect(() => {
        const id = localStorage.getItem("id");
        actions.getVoluntarioById(id);
        const favoritesFromStorage = JSON.parse(localStorage.getItem("favorites")) || [];
        setFavorites(favoritesFromStorage);
    }, []);

    return (
        <div className="container">
            <h1>Hola de nuevo, {store.voluntario.nombre}</h1>
            {store.auth_voluntario === true ?
                <>
                    <ul className="list-group">
                        <li key={store.voluntario.id} className="list-group-item d-flex justify-content-between">
                            <div>
                                <div>{store.voluntario.nombre}</div>
                                <div>{store.voluntario.email}</div>
                                <div>{store.voluntario.ciudad}</div>
                                <div>{store.voluntario.direccion}</div>
                            </div>
                            <>
                                <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#deleteModal">
                                    Eliminar
                                </button>

                                <button onClick={() => navigate(`/editVoluntario/${store.voluntario.id}`)} className="btn btn-primary">
                                    Editar
                                </button>
                            </>

                            <div className="modal fade" id="deleteModal" tabIndex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
                                <div className="modal-dialog">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h1 className="modal-title fs-5" id="deleteModalLabel">¿Estás seguro?</h1>
                                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                        <div className="modal-body">
                                            Estás a punto de borrar este perfil
                                        </div>
                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Mejor no</button>
                                            <button className="btn btn-primary" onClick={() => actions.deleteVoluntario(store.voluntario.id)}>Eliminar</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>
                    <br />
                    <h2>Has colaborado en estas campañas</h2>
                    <div className="row">
                        {favorites.map((favorite, index) => (
                            <div key={index} className="col-md-4">
                                <div className="card">
                                    <div className="card-body">
                                        <h5 className="card-title">{favorite.campaignName}</h5>
                                        <p className="card-text">{favorite.ongName}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <br />
                    <h2>Insignias</h2>
            
                    <br />
                    <Link to="/">
                        <button className="btn btn-primary">Volver a Home</button>
                    </Link>
                    <br />
                    <br />
                </>
                : null
            }
        </div>
    );
};
