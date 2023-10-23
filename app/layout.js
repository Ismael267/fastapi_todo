"use client";
import Link from "next/link";
import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

// export const metadata = {
//   title: 'Todo FastApi',
//   description: 'Generated by create next app',
// }
import React, { useState, useEffect } from "react";

export default function RootLayout({ children }) {
  const [count, setCount] = useState();
  const [menuVisible, setMenuVisible] = useState(false);

  const [countToday, setCountToday] = useState();
  const [countNotToday, setCountNotToday] = useState();

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };
  const fetchTasks = () => {
    fetch("http://127.0.0.1:8000/tasks", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setCount(data.length);
        const dateT = new Date();
        const year = dateT.getFullYear();
        const month = String(dateT.getMonth() + 1).padStart(2, "0");
        const day = String(dateT.getDate()).padStart(2, "0");
        const TodayIsoDate = `${year}-${month}-${day}`;
        console.log(TodayIsoDate);

        const filteredData = data.filter((item) => {
          const itemDate = item.dateOfRealisation.split("T")[0];
          return itemDate > TodayIsoDate;
        });
        const filteredData2 = data.filter((item) => {
          const itemDate = item.dateOfRealisation.split("T")[0];
          return itemDate == TodayIsoDate;
        });

        setCountToday(filteredData2.length);

        setCountNotToday(filteredData.length);
      });
  };
  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="">
          <div className="flex  min-h-screen max-md:h-full font-inter ">
            <div className=" max-md:w-full bg-blue-400/10 max-md:absolute max-md:h-full max-md:backdrop-blur-sm justify-between z-50">
              <div
                className="px-3 py-6 h-full  bg-blue-50 max-md:w-3/4 md:w-60 flex-col max-md:h-full justify-between flex max-md:justify-between "
                id="sidebar"
              >
                <div>
                  <h1 className="text-blue-600 font-inter mb-5 text-2xl font-extrabold ">
                    My Todo
                  </h1>
                  <ul className="text-blue-900 font-medium font-inter text-base mt-4 transition-colors duration-300">
                    <Link href="/">
                      <li className="mb-2 m-0 p-2 flex md:active:text-white group active:bg-blue-500 hover:text-white hover:fill-white hover:bg-blue-500 focus:text-white rounded-lg text-sm items-center">
                        <div className="flex w-full justify-between items-center">
                          <div className="flex content-end">
                            <svg
                              width="16"
                              height="18"
                              viewBox="0 0 16 18"
                              // fill="#84A9FF"
                              xmlns="http://www.w3.org/2000/svg"
                              className="fill-[#84A9FF] group-hover:fill-slate-200"
                            >
                              <path
                                d="M13.8333 2.50004H13V0.833374H11.3333V2.50004H4.66667V0.833374H3V2.50004H2.16667C1.24583 2.50004 0.508333 3.24587 0.508333 4.16671L0.5 15.8334C0.5 16.7542 1.24583 17.5 2.16667 17.5H13.8333C14.7542 17.5 15.5 16.7542 15.5 15.8334V4.16671C15.5 3.24587 14.7542 2.50004 13.8333 2.50004ZM13.8333 15.8334H2.16667V6.66671H13.8333V15.8334ZM3.83333 8.33337H8V12.5H3.83333V8.33337Z"
                                // fill=""
                                // fill="#84A9FF"
                              />
                            </svg>
                            <p className="ml-2">Aujourd'hui</p>
                          </div>
                          <div className="">{countToday}</div>
                        </div>
                      </li>
                    </Link>
                    <Link href="/Avenir">
                      <li className="mb-2 p-2 m-0 flex group active:text-white active:bg-blue-500 hover:bg-blue-500 hover:text-white focus:text-white rounded-lg text-sm items-center">
                        <div className="flex w-full justify-between items-center content-center">
                          <div className="flex content-center ">
                            <svg
                              width="18"
                              height="20"
                              viewBox="0 0 18 20"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                              className="fill-[#84A9FF] group-hover:fill-slate-200"
                            >
                              <path
                                d="M9.00008 15.8333C9.1649 15.8333 9.32602 15.7844 9.46306 15.6929C9.6001 15.6013 9.70691 15.4712 9.76998 15.3189C9.83305 15.1666 9.84956 14.9991 9.8174 14.8374C9.78525 14.6758 9.70588 14.5273 9.58934 14.4107C9.47279 14.2942 9.32431 14.2148 9.16266 14.1827C9.00101 14.1505 8.83345 14.167 8.68118 14.2301C8.52891 14.2932 8.39876 14.4 8.30719 14.537C8.21562 14.674 8.16675 14.8352 8.16675 15C8.16675 15.221 8.25455 15.433 8.41083 15.5892C8.56711 15.7455 8.77907 15.8333 9.00008 15.8333ZM13.1667 15.8333C13.3316 15.8333 13.4927 15.7844 13.6297 15.6929C13.7668 15.6013 13.8736 15.4712 13.9366 15.3189C13.9997 15.1666 14.0162 14.9991 13.9841 14.8374C13.9519 14.6758 13.8725 14.5273 13.756 14.4107C13.6395 14.2942 13.491 14.2148 13.3293 14.1827C13.1677 14.1505 13.0001 14.167 12.8478 14.2301C12.6956 14.2932 12.5654 14.4 12.4739 14.537C12.3823 14.674 12.3334 14.8352 12.3334 15C12.3334 15.221 12.4212 15.433 12.5775 15.5892C12.7338 15.7455 12.9457 15.8333 13.1667 15.8333ZM13.1667 12.5C13.3316 12.5 13.4927 12.4511 13.6297 12.3595C13.7668 12.268 13.8736 12.1378 13.9366 11.9855C13.9997 11.8333 14.0162 11.6657 13.9841 11.5041C13.9519 11.3424 13.8725 11.1939 13.756 11.0774C13.6395 10.9608 13.491 10.8815 13.3293 10.8493C13.1677 10.8172 13.0001 10.8337 12.8478 10.8967C12.6956 10.9598 12.5654 11.0666 12.4739 11.2037C12.3823 11.3407 12.3334 11.5018 12.3334 11.6666C12.3334 11.8877 12.4212 12.0996 12.5775 12.2559C12.7338 12.4122 12.9457 12.5 13.1667 12.5ZM9.00008 12.5C9.1649 12.5 9.32602 12.4511 9.46306 12.3595C9.6001 12.268 9.70691 12.1378 9.76998 11.9855C9.83305 11.8333 9.84956 11.6657 9.8174 11.5041C9.78525 11.3424 9.70588 11.1939 9.58934 11.0774C9.47279 10.9608 9.32431 10.8815 9.16266 10.8493C9.00101 10.8172 8.83345 10.8337 8.68118 10.8967C8.52891 10.9598 8.39876 11.0666 8.30719 11.2037C8.21562 11.3407 8.16675 11.5018 8.16675 11.6666C8.16675 11.8877 8.25455 12.0996 8.41083 12.2559C8.56711 12.4122 8.77907 12.5 9.00008 12.5ZM14.8334 2.49998H14.0001V1.66665C14.0001 1.44563 13.9123 1.23367 13.756 1.07739C13.5997 0.92111 13.3878 0.833313 13.1667 0.833313C12.9457 0.833313 12.7338 0.92111 12.5775 1.07739C12.4212 1.23367 12.3334 1.44563 12.3334 1.66665V2.49998H5.66675V1.66665C5.66675 1.44563 5.57895 1.23367 5.42267 1.07739C5.26639 0.92111 5.05443 0.833313 4.83341 0.833313C4.6124 0.833313 4.40044 0.92111 4.24416 1.07739C4.08788 1.23367 4.00008 1.44563 4.00008 1.66665V2.49998H3.16675C2.50371 2.49998 1.86782 2.76337 1.39898 3.23221C0.93014 3.70105 0.666748 4.33694 0.666748 4.99998V16.6666C0.666748 17.3297 0.93014 17.9656 1.39898 18.4344C1.86782 18.9033 2.50371 19.1666 3.16675 19.1666H14.8334C15.4965 19.1666 16.1323 18.9033 16.6012 18.4344C17.07 17.9656 17.3334 17.3297 17.3334 16.6666V4.99998C17.3334 4.33694 17.07 3.70105 16.6012 3.23221C16.1323 2.76337 15.4965 2.49998 14.8334 2.49998ZM15.6667 16.6666C15.6667 16.8877 15.579 17.0996 15.4227 17.2559C15.2664 17.4122 15.0544 17.5 14.8334 17.5H3.16675C2.94573 17.5 2.73377 17.4122 2.57749 17.2559C2.42121 17.0996 2.33341 16.8877 2.33341 16.6666V9.16665H15.6667V16.6666ZM15.6667 7.49998H2.33341V4.99998C2.33341 4.77897 2.42121 4.567 2.57749 4.41072C2.73377 4.25444 2.94573 4.16665 3.16675 4.16665H4.00008V4.99998C4.00008 5.22099 4.08788 5.43296 4.24416 5.58924C4.40044 5.74552 4.6124 5.83331 4.83341 5.83331C5.05443 5.83331 5.26639 5.74552 5.42267 5.58924C5.57895 5.43296 5.66675 5.22099 5.66675 4.99998V4.16665H12.3334V4.99998C12.3334 5.22099 12.4212 5.43296 12.5775 5.58924C12.7338 5.74552 12.9457 5.83331 13.1667 5.83331C13.3878 5.83331 13.5997 5.74552 13.756 5.58924C13.9123 5.43296 14.0001 5.22099 14.0001 4.99998V4.16665H14.8334C15.0544 4.16665 15.2664 4.25444 15.4227 4.41072C15.579 4.567 15.6667 4.77897 15.6667 4.99998V7.49998ZM4.83341 12.5C4.99823 12.5 5.15935 12.4511 5.29639 12.3595C5.43343 12.268 5.54024 12.1378 5.60331 11.9855C5.66639 11.8333 5.68289 11.6657 5.65074 11.5041C5.61858 11.3424 5.53921 11.1939 5.42267 11.0774C5.30613 10.9608 5.15764 10.8815 4.99599 10.8493C4.83434 10.8172 4.66678 10.8337 4.51451 10.8967C4.36224 10.9598 4.23209 11.0666 4.14052 11.2037C4.04896 11.3407 4.00008 11.5018 4.00008 11.6666C4.00008 11.8877 4.08788 12.0996 4.24416 12.2559C4.40044 12.4122 4.6124 12.5 4.83341 12.5ZM4.83341 15.8333C4.99823 15.8333 5.15935 15.7844 5.29639 15.6929C5.43343 15.6013 5.54024 15.4712 5.60331 15.3189C5.66639 15.1666 5.68289 14.9991 5.65074 14.8374C5.61858 14.6758 5.53921 14.5273 5.42267 14.4107C5.30613 14.2942 5.15764 14.2148 4.99599 14.1827C4.83434 14.1505 4.66678 14.167 4.51451 14.2301C4.36224 14.2932 4.23209 14.4 4.14052 14.537C4.04896 14.674 4.00008 14.8352 4.00008 15C4.00008 15.221 4.08788 15.433 4.24416 15.5892C4.40044 15.7455 4.6124 15.8333 4.83341 15.8333Z"
                                // fill="#84A9FF"
                              />
                            </svg>
                            <p className="ml-2">À venir</p>
                          </div>
                          <div className="">{countNotToday}</div>
                        </div>
                      </li>
                    </Link>
                    <Link href="/tache">
                      <li className="mb-2 p-2 m-0 flex group active:text-white active:bg-blue-500 hover:bg-blue-500 hover:text-white fill-blue-200-accent  focus:text-white rounded-lg text-sm items-center hover:fill-white ">
                        <div className="flex  w-full justify-between items-center content-center">
                          <div className="flex">
                            <svg
                              width="14"
                              height="18"
                              viewBox="0 0 14 18"
                              xmlns="http://www.w3.org/2000/svg"
                              className="fill-[#84A9FF] group-hover:fill-slate-200"
                              // fill="white"
                            >
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M9.49992 0.666687C9.79247 0.666694 10.0799 0.743708 10.3332 0.889989C10.5866 1.03627 10.797 1.24666 10.9433 1.50002H11.9999C12.4419 1.50002 12.8659 1.67561 13.1784 1.98818C13.491 2.30074 13.6666 2.72466 13.6666 3.16669V13.1667C13.6666 14.2718 13.2276 15.3316 12.4462 16.113C11.6648 16.8944 10.605 17.3334 9.49992 17.3334H1.99992C1.55789 17.3334 1.13397 17.1578 0.821407 16.8452C0.508847 16.5326 0.333252 16.1087 0.333252 15.6667V3.16669C0.333252 2.72466 0.508847 2.30074 0.821407 1.98818C1.13397 1.67561 1.55789 1.50002 1.99992 1.50002H3.05659C3.20286 1.24666 3.41325 1.03627 3.66661 0.889989C3.91997 0.743708 4.20736 0.666694 4.49992 0.666687H9.49992ZM2.83325 3.16669H1.99992V15.6667H9.49992C10.163 15.6667 10.7988 15.4033 11.2677 14.9345C11.7365 14.4656 11.9999 13.8297 11.9999 13.1667V3.16669H11.1666C11.1666 3.60871 10.991 4.03264 10.6784 4.3452C10.3659 4.65776 9.94195 4.83335 9.49992 4.83335H4.49992C4.05789 4.83335 3.63397 4.65776 3.32141 4.3452C3.00885 4.03264 2.83325 3.60871 2.83325 3.16669ZM10.5316 6.81585C10.6878 6.97213 10.7756 7.18405 10.7756 7.40502C10.7756 7.62599 10.6878 7.83791 10.5316 7.99419L6.40658 12.1192C6.25031 12.2754 6.03839 12.3632 5.81742 12.3632C5.59645 12.3632 5.38452 12.2754 5.22825 12.1192L3.46159 10.3509C3.31343 10.1931 3.23246 9.98386 3.23582 9.76745C3.23918 9.55105 3.32661 9.34444 3.47959 9.19135C3.63258 9.03825 3.83912 8.95069 4.05553 8.94717C4.27193 8.94366 4.48121 9.02447 4.63908 9.17252L5.81825 10.3509L9.35325 6.81585C9.50952 6.65963 9.72145 6.57186 9.94242 6.57186C10.1634 6.57186 10.3753 6.65963 10.5316 6.81585ZM9.49992 2.33335H4.49992V3.16669H9.49992V2.33335Z"
                                // fill=""
                                // className="fill-"
                              />
                            </svg>
                            <p className="ml-2">Tâche</p>
                          </div>
                          <div className="">{count}</div>
                        </div>
                      </li>
                    </Link>
                  </ul>
                </div>
                <div className="text-xs text-blue-200 flex justify-around font-inter font-normal">
                  <p>Powered by @Fantôme</p>
                </div>
              </div>
            </div>
            <div
              className="w-screen p-8 px-4 min-h-screen  md:px-12 "
              id="azerty"
              style={{
                backgroundImage:
                  'url("/rodion-kutsaiev-049M_crau5k-unsplash.jpg")',
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
              }}
            >
              <div className="bg-blue-50 flex rounded-lg items-center hidden font-inter text-blue-600 p-2  mb-6 shadow-2xl shadow-black max-md:flex">
                <button onClick={toggleMenu}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                    className="w-8 h-8"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                    />
                  </svg>
                </button>
                <p className="pl-1 text-2xl font-extrabold ">My Todo</p>
              </div>
              {children}
            </div>
          </div>
        </main>
      </body>
    </html>
  );
}
