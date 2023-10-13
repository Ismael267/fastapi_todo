"use client";

import Modal from "@/components/ui/Modal";
// import ContextMenu from "@/components/ui/ContextMenu";
import React, { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";


const tache = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [tasks, setTasks] = useState([]);

  const fetchTasks = () => {
    fetch("http://127.0.0.1:8000/tasks", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setTasks(data);
        console.log(data.length);
      });
  };
  const toggleCheckbox = (id) => {
    fetch(`http://localhost:8000/update/task/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({ completed: true }),
    })
      .then(response => {
        if (response.ok) {
          window.location.reload();
          console.log('Response is OK');
       
        } else {
          console.log('Response is not OK');
        }
      })
      .catch(error => {
        console.error('Error: ', error);
      });
  };
  
  const deleteTask = (id) => {
    fetch(`http://localhost:8000/delete/task/${id}`, { 
      headers: {
        "Content-Type":"application/json",
        Accept:"application/json",

      },
      method: "DELETE"

    })
  };

  //   try {
  //     const response = await fetch(`http://127.0.0.1:8000/update/task/${id}`, {
  //       method: "PUT",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ completed: true }),
  //     });

  //     if (response.ok) {
      
  //       console.log("Réponses ajoutées avec succès");
  //     } else {
  //       console.log(response);
  //       throw new Error("Erreur pendant l'ajout des réponses.");
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };


  const convertDate = (isoDate) => {
    const date = new Date(isoDate);
    const options = {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    };
    const formattedDate = date.toLocaleDateString('fr-FR', options);
    return formattedDate;
  };
  
  useEffect(() => {
    fetchTasks();
  }, []);
  return (
    <>
      <div
        className="w-screen p-8 px-4 min-h-screen  md:px-12 "
        id="azerty"
        style={{
          backgroundImage: 'url("/rodion-kutsaiev-049M_crau5k-unsplash.jpg")',
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      >
        <div className="text-white mb-8 font-inter ">
          <h1 className="font-semibold text-2xl">Tâche</h1>
        </div>
        <div className=" mb-16">
          {tasks.map((task) =>
            !task.completed ? (
              <div className="bg-gray-100 rounded shadow   p-2 mb-3 flex justify-between  ">
                <div className="items-center  flex">
                <button
                    className="mx-2 rounded-full text-gray-600"
                    onClick={()=> toggleCheckbox(task.id)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#6F6F70"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="rounded-lg"
                    >
                      <circle cx="12" cy="12" r="10"></circle>
                    </svg>
                  </button>
                  <label>{task.task} </label>
                </div>
                <div className=" flex items-center content-center">
                  <p className="font-normal">{convertDate(task.dateOfRealisation)}</p>
                  <div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <svg
                            fill="#000000"
                            width="15px"
                            height="15px"
                            viewBox="0 0 32 32"
                            version="1.1"
                            xmlns="http://www.w3.org/2000/svg"
                            className="ml-4  hover:bg-gray-200 hover:rounded-full"
                          >
                            <path d="M12.15 28.012v-0.85c0.019-0.069 0.050-0.131 0.063-0.2 0.275-1.788 1.762-3.2 3.506-3.319 1.95-0.137 3.6 0.975 4.137 2.787 0.069 0.238 0.119 0.488 0.181 0.731v0.85c-0.019 0.056-0.050 0.106-0.056 0.169-0.269 1.65-1.456 2.906-3.081 3.262-0.125 0.025-0.25 0.063-0.375 0.094h-0.85c-0.056-0.019-0.113-0.050-0.169-0.056-1.625-0.262-2.862-1.419-3.237-3.025-0.037-0.156-0.081-0.3-0.119-0.444zM20.038 3.988l-0 0.85c-0.019 0.069-0.050 0.131-0.056 0.2-0.281 1.8-1.775 3.206-3.538 3.319-1.944 0.125-3.588-1-4.119-2.819-0.069-0.231-0.119-0.469-0.175-0.7v-0.85c0.019-0.056-0.050-0.106 0.063-0.162 0.3-1.625 1.244-2.688 2.819-3.194 0.206-0.069 0.425-0.106 0.637-0.162h0.85c0.056 0.019 0.113 0.050 0.169 0.056 1.631 0.269 2.863 1.419 3.238 3.025 0.038 0.15 0.075 0.294 0.113 0.437zM20.037 15.575v0.85c-0.019 0.069-0.050 0.131-0.063 0.2-0.281 1.794-1.831 3.238-3.581 3.313-1.969 0.087-3.637-1.1-4.106-2.931-0.050-0.194-0.094-0.387-0.137-0.581v-0.85c0.019-0.069-0.050-0.131 0.063-0.2 0.275-1.794 1.831-3.238 3.581-3.319 1.969-0.094 3.637 1.1 4.106 2.931 0.050 0.2 0.094 0.394 0.137 0.588z"></path>
                          </svg>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56 rounded text-xs bg-white">
                          <DropdownMenuSeparator />
                          <DropdownMenuGroup>
                            <DropdownMenuItem className="active:bg-slate-200 rounded focus:bg-slate-100" onClick={()=> toggleCheckbox(task.id)}>
                              Marque comme terminé
                            </DropdownMenuItem>
                            <DropdownMenuItem className="active:bg-slate-200 rounded  focus:bg-slate-100" onClick={()=>""}>
                              Echéance à demain
                            </DropdownMenuItem>
                            <DropdownMenuItem className="active:bg-slate-200 rounded focus:bg-slate-100">
                              Choisir une date
                            </DropdownMenuItem>
                          </DropdownMenuGroup>
                          <DropdownMenuSeparator />
                          <DropdownMenuSeparator />
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-700 font-bold" onClick={() => deleteTask(task.id)}>
                            Supprimer
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                </div>
              </div>
            ) : null
          )}
        </div>
        <div className="">
          <p className="w-fit text-white bg-neutral-900 from-transparent py-1 px-4 rounded text-sm">
            Terminé
          </p>
          <div className="mt-4">
            {tasks.map((task) =>
              task.completed ? (
                <div className="bg-white  rounded shadow  p-2 mb-3 flex justify-between items-center ">
                  <div className="flex items-center">
                  <button
                      className="mx-2 rounded-full text-gray-600"
                      onClick={() => toggleCheckbox(task.id)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#3366FF"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                        <polyline points="22 4 12 14.01 9 11.01"></polyline>
                      </svg>
                    </button>
                    <label className="line-through">{task.task}</label>
                  </div>
                  <div className=" flex items-center content-center">
                    <p className="font-normal">{ convertDate(task.dateOfRealisation)}</p>
                   
                    <div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <svg
                            fill="#000000"
                            width="15px"
                            height="15px"
                            viewBox="0 0 32 32"
                            version="1.1"
                            xmlns="http://www.w3.org/2000/svg"
                            className="ml-4  hover:bg-gray-200 hover:rounded-full"
                          >
                            <path d="M12.15 28.012v-0.85c0.019-0.069 0.050-0.131 0.063-0.2 0.275-1.788 1.762-3.2 3.506-3.319 1.95-0.137 3.6 0.975 4.137 2.787 0.069 0.238 0.119 0.488 0.181 0.731v0.85c-0.019 0.056-0.050 0.106-0.056 0.169-0.269 1.65-1.456 2.906-3.081 3.262-0.125 0.025-0.25 0.063-0.375 0.094h-0.85c-0.056-0.019-0.113-0.050-0.169-0.056-1.625-0.262-2.862-1.419-3.237-3.025-0.037-0.156-0.081-0.3-0.119-0.444zM20.038 3.988l-0 0.85c-0.019 0.069-0.050 0.131-0.056 0.2-0.281 1.8-1.775 3.206-3.538 3.319-1.944 0.125-3.588-1-4.119-2.819-0.069-0.231-0.119-0.469-0.175-0.7v-0.85c0.019-0.056-0.050-0.106 0.063-0.162 0.3-1.625 1.244-2.688 2.819-3.194 0.206-0.069 0.425-0.106 0.637-0.162h0.85c0.056 0.019 0.113 0.050 0.169 0.056 1.631 0.269 2.863 1.419 3.238 3.025 0.038 0.15 0.075 0.294 0.113 0.437zM20.037 15.575v0.85c-0.019 0.069-0.050 0.131-0.063 0.2-0.281 1.794-1.831 3.238-3.581 3.313-1.969 0.087-3.637-1.1-4.106-2.931-0.050-0.194-0.094-0.387-0.137-0.581v-0.85c0.019-0.069-0.050-0.131 0.063-0.2 0.275-1.794 1.831-3.238 3.581-3.319 1.969-0.094 3.637 1.1 4.106 2.931 0.050 0.2 0.094 0.394 0.137 0.588z"></path>
                          </svg>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56 rounded text-xs bg-white">
                          <DropdownMenuSeparator />
                          <DropdownMenuGroup>
                            <DropdownMenuItem className="active:bg-slate-200 rounded focus:bg-slate-100" onClick={()=> toggleCheckbox(task.id)} disabled>
                              Marque comme terminé
                            </DropdownMenuItem>
                            <DropdownMenuItem className="active:bg-slate-200 rounded  focus:bg-slate-100" onClick={()=>""} disabled>
                              Echéance à demain
                            </DropdownMenuItem>
                            <DropdownMenuItem className="active:bg-slate-200 rounded focus:bg-slate-100" disabled>
                              Choisir une date
                              
                            </DropdownMenuItem>
                          </DropdownMenuGroup>
                          <DropdownMenuSeparator />
                          <DropdownMenuSeparator />
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-700 font-bold" onClick={() => deleteTask(task.id)}>
                            Supprimer
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </div>
              ) : null
            )}
          </div>
        </div>
        <div>
          <Modal />
        </div>
      </div>
    </>
  );
};

export default tache;
