const getState = ({ getStore, getActions, setStore }) => {

	return {
		store: {

			campaign: [],
			auth_admin: false,
			ongs: [],
			ong:{},
			auth_ong: false,
            voluntarios: [],
			voluntario: {},
            auth_voluntario: false,
			favorites: [],
			favorite: []
		},
		actions: {
			//	voluntario actions
			getVoluntarios: () => {
                const requestOptions = {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' },
                    mode: 'cors',
                };
                fetch(process.env.BACKEND_URL + "/api/voluntarios/", requestOptions)
                .then((response) => response.json())
                .then((data) => {
                    setStore({ voluntarios: data });
                })
             },

			 getVoluntarioById: (id) => {
                const requestOptions = {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' },
                    mode: 'cors',
                };
                fetch(process.env.BACKEND_URL + "/api/voluntario/" + id, requestOptions)
                .then((response) => response.json())
                .then((data) => {
				console.log(data)
				console.log(id)
                    setStore({ voluntario: data });
                })
             },
    
            addVoluntario(newVoluntario) {
                const requestOptions = {
                method: 'POST',
                mode: 'cors',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    "nombre": newVoluntario.nombre,
                    "email": newVoluntario.email,
                    "password": newVoluntario.password,
                    "ciudad": newVoluntario.ciudad,
                    "lat":newVoluntario.lat,
                    "lng": newVoluntario.lng,
                    
                    })
                };

                fetch(process.env.BACKEND_URL + "/api/voluntario/", requestOptions)
                    .then((response) => {
                        if (response.ok) {
                            // Voluntario creado correctamente
                            alert("Voluntario creado correctamente");
                        } else {
                            // Error creando el voluntario
                            alert("Lo sentimos, ha habido un error creando el voluntario :(");
                        }
                    })
                    .catch((error) => {
                        // Error general
                        alert(error);
                    });
            },

            
            deleteVoluntario: (id) => {
                            const deleteOptions = {
                                method: "DELETE",
                                mode: 'cors',
                                headers: { 'Content-Type': 'application/json'  },
                            };
                            fetch(process.env.BACKEND_URL + "/api/voluntario/" + id, deleteOptions)
                                .then(response => response.json())
                                .then((data =>{
                                    alert("Voluntario eliminado");
                                    fetch(process.env.BACKEND_URL + "/api/voluntario/")
                                        .then((response) => response.json())
                                        .then((data) => {
                                            setStore({ voluntarios: data });
                            })
                        }))
            },

            
            editVoluntario: (editVoluntario, id) => {
                const editOptions = {
                  method: "PUT",
                  mode: 'cors',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({
                    "nombre": editVoluntario.nombre,
                    "email": editVoluntario.email,
                    "password": editVoluntario.password,
                    "ciudad": editVoluntario.ciudad,
                    "lat": editVoluntario.lat,
                    "lng": editVoluntario.lng
                  })
                };
              
                fetch(process.env.BACKEND_URL + "/api/voluntario/" + id, editOptions)
                  .then(response => response.json())
                  .then(() => {
                    alert("Voluntario editado correctamente");
                    console.log(process.env.BACKEND_URL + "/api/voluntario/" + id);
                  });
            },


			voluntarioLogin: (email, password) => {
                console.log('Login desde flux')
                 const requestOptions = {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(
                        {
                            "email":email,
                            "password":password
                        }
                    )
                };
                fetch(process.env.BACKEND_URL + "/api/voluntarioLogin/", requestOptions)
                    .then(response => {
                        console.log(response.status)
                        if(response.status === 200){
                            setStore({ auth_voluntario: true });
                        }
						console.log(response);
						var response_body = response.json();
						console.log(response_body);
                        return response_body;

                    })
                    .then(data => {
						console.log(data)
                        localStorage.setItem("token", data.access_token);
						console.log(data.voluntario_data)
						localStorage.setItem("id", data.voluntario_data.id);
                        console.log(data)
    
                    });
            },

            voluntarioSignup: (email, password) => {
                const requestOptions = {
                    method: 'POST',
                    mode: 'cors',
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(
                        {
                            "email":email,
                            "password":password
                        }
                    )
                  };
                  
                fetch(process.env.BACKEND_URL + "/api/voluntarioSignup/", requestOptions)
                    .then(response => {
                        if(response.status == 200){
                            setStore({ auth_admin: true });
                        }
                        return response.text()
                    })
                    .then(result => console.log(result))
                    .catch(error => console.log('error', error));
            },


            voluntarioLogout: () => {
                setStore({ auth_voluntario: false });
                localStorage.removeItem("token");				
            },

			// ong actions
			getOngs:() => {
				const requestOptions = {
					method: 'GET',
					headers: { 'Content-Type': 'application/json' },
					mode: 'cors',
				};
				fetch(process.env.BACKEND_URL + "/api/ongs/", requestOptions)
				.then((response) => response.json())
				.then((data) => {
					setStore({ ongs: data });
				})
			},

			getOngById: (id) => {
                const requestOptions = {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' },
                    mode: 'cors',
                };
                fetch(process.env.BACKEND_URL + "/api/ong/" + id, requestOptions)
                .then((response) => response.json())
                .then((data) => {
				console.log(data)
				console.log(id)
                    setStore({ ong: data });
                })
             },

			addOng(newOng) {
				const requestOptions = {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					mode: 'cors',
					body: JSON.stringify({
						"nif":newOng.nif,
						"email":newOng.email,
						"ciudad": newOng.ciudad,
						"nombre":newOng.nombre,
						"actividad":newOng.actividad,
						"aprobado": newOng.aprobado,
						"password": newOng.password,
						"lat": newOng.lat,
						"lng": newOng.lng,
						
					})
				};
				fetch(process.env.BACKEND_URL + "/api/ong/", requestOptions)
				.then(response => response.json())
				.then(data => {
					setStore({ ong: data });
				})
				.catch(error => {
					console.error('Error adding ONG:', error);
				});
			},


			deleteOng: (id) => {
				const deleteOptions = {
					method: "DELETE",
					mode: 'cors',
					headers: { 'Content-Type': 'application/json'  },
				};
				fetch(process.env.BACKEND_URL + "/api/ong/" + id, deleteOptions)

					.then(response => response.json())
					.then((data =>{
						fetch(process.env.BACKEND_URL + "/api/ong")
							.then((response) => response.json())
							.then((data) => {
								setStore({ ong: data });
				})
			}))
			},

			editOng: (editOng, id) => {
				const editOptions = {
			   method: "PUT",
			   headers: { 'Content-Type': 'application/json' },
			   mode: 'cors',
			   body: JSON.stringify({
					"nif":editOng.nif,
					"email":editOng.email,
					"ciudad": editOng.ciudad,
					"nombre":editOng.nombre,
					"actividad":editOng.actividad,
					"aprobado": editOng.aprobado,
					"password": editOng.password,
					"lat": editOng.lat,
					"lng": editOng.lng,

			   })
		   };
		   fetch(process.env.BACKEND_URL + "/api/ong/" + id, editOptions)
		   .then(response => response.json())
		   .then(console.log(process.env.BACKEND_URL + "/api/ong/"+ id));
  		 },	


	
		   ongLogin: (email,password) => {
			console.log('Login desde flux')
			 const requestOptions = {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(
					{
						"email":email,
						"password":password
					}
				)
			};
			fetch(process.env.BACKEND_URL + "/api/ongLogin/", requestOptions)
				.then(response => {
					console.log(response.status)
					if(response.status === 200){

						setStore({ auth_ong: true });

					}
					return response.json()
				})
				.then(data => {
					localStorage.setItem("token", data.access_token);
					console.log(data)

				});
		},
		
		ongLogout: () => {
			setStore({ auth_ong: false });
			localStorage.removeItem("token");				
		},


		// campaign actions
		loadCampaigns:() => {
			const requestOptions = {
				method: 'GET',
				headers: { 'Content-Type': 'application/json' },
				mode: 'cors',
			};
			fetch(process.env.BACKEND_URL + "/api/campaign/", requestOptions)
			.then((response) => response.json())
			.then((data) => {
				setStore({ campaign: data });
			})
		},
		addCampaign(newCampaign) {
			const requestOptions = {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				mode: 'cors',
				body: JSON.stringify({
					
					"fecha_finalizacion":newCampaign.fecha_finalizacion,
					"fecha_inicio": newCampaign.fecha_inicio,
					"nombre":newCampaign.nombre,
					"objetivo":newCampaign.objetivo,
					"articulos":newCampaign.articulos,
					"ong_id": newCampaign.ong_id,

				})
			};
			fetch(process.env.BACKEND_URL + "/api/campaign/", requestOptions)

		},


		deleteCampaign: (id) => {
			const deleteOptions = {
				method: "DELETE",
				mode: 'cors',
				headers: { 'Content-Type': 'application/json'  },
			};
			fetch(process.env.BACKEND_URL + "/api/campaign/" + id, deleteOptions)

				.then(response => response.json())
				.then((data =>{
					fetch(process.env.BACKEND_URL + "/api/campaign/")
						.then((response) => response.json())
						.then((data) => {
							setStore({ campaign: data });
			})
		}))
		},

		editCampaign: (editCampaign, id) => {
			const editOptions = {
		   method: "PUT",
		   headers: { 'Content-Type': 'application/json' },
		   mode: 'cors',
		   body: JSON.stringify({
			   "ong": editCampaign.ong,
				"articulos":editCampaign.articulos,
				"fecha_finalizacion":editCampaign.fecha_fin,
				"fecha_inicio": editCampaign.fecha_inicio,
				"nombre":editCampaign.nombre,
				"objetivo":editCampaign.objetivo,
				"ong_id": editCampaign.ong_id,

		   })
	   };
	   fetch(process.env.BACKEND_URL + "/api/campaign/" + id, editOptions)
	   .then(response => response.json())
	   .then(console.log(process.env.BACKEND_URL + "/api/campaign/"+ id));
	   },	
	// admin login system 
	adminLogin: (email,password) => {
		console.log('Login desde flux')
		 const requestOptions = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(
				{
					"email":email,
					"password":password
				}
			)
		};
		fetch(process.env.BACKEND_URL + "/api/adminLogin/", requestOptions)
			.then(response => {
				console.log(response.status)
				if(response.status === 200){
					setStore({ auth_admin: true });
				}
				return response.json()
			})
			.then(data => {
				localStorage.setItem("token", data.access_token);
				console.log(data)

			});
	},
	adminSignup: (email, password) => {
		const requestOptions = {
			method: 'POST',
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(
				{
					"email":email,
					"password":password
				}
			)
		  };
		  
		fetch(process.env.BACKEND_URL + "/api/adminSignup/", requestOptions)
			.then(response => {
				if(response.status == 200){
					setStore({ auth_admin: true });
				}
				return response.text()
			})
			.then(result => console.log(result))
			.catch(error => console.log('error', error));
	},
	adminLogout: () => {
		setStore({ auth_admin: false });
		localStorage.removeItem("token");				
	},
	//3. Añadir a favortios
	addFavorites: (favorite) => {
		const favoritesState = getStore().favorites.concat(favorite);
		setStore({...getStore, favorites: favoritesState})
	},
	
	//4. Eliminar favorito
	deleteFavorite: (name) => {
		const store = getStore()
		const newFavorite = store.favorites.filter((item) => item !== name);
		

		setStore({favorites: newFavorite});

	},

		}
	};
};

export default getState;