import React, { useState, useEffect } from "react";

import Spinner from "../Components/Spinner";
import "./Events.scss";
import first from "../assets/first.png"
import second from "../assets/second.png"
import third from "../assets/third.png"


function Events() {
  const [eventData, setEventData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setIsLoading(true);
    fetch(
      "https://script.google.com/macros/s/AKfycbzkrl5eaeTYJp4ngqMZmLuK8pw0lcjtlOBGQJmNbTCAyqIm5vZ2mzjXUGJPKD3rdcC8yA/exec?type=events"
    )
      .then((response) => response.json())
      .then((data) => {
        setEventData(data.data);
        setIsLoading(false);
      })
      .catch((error) => window.alert("Loading Failed"));
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  const filteredEvents = eventData.filter(
    (event) =>
      event.EventName.toLowerCase().includes(searchTerm) ||
      event.Winner1.toLowerCase().includes(searchTerm) ||
      event.Winner2.toLowerCase().includes(searchTerm) ||
      event.Winner3.toLowerCase().includes(searchTerm) ||
      event.EventDate.toLowerCase().includes(searchTerm) ||
      event.EventState.toLowerCase().includes(searchTerm)
  );

  return (
    <>
      <div className="title--box">
        <h1>Competitions</h1>
        <input
          type="text"
          className="Search"
          placeholder="Search Competitions, Winner, Day"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>

      {isLoading ? (
        <Spinner />
      ) : (
        <div className="event_box">
          {filteredEvents.map((row, index) => (
            <div className="event_card" key={index}>
              <div className="mele">
              <span className="eventName">{row.EventName}</span>
               { row.EventState!=""? <a href={row.EventState}><div className="reg">Register here</div></a>:""}
              </div>
              <hr />
              
              <span className="eventDate"> Date :{row.EventDate}</span>
             
              {row.EventState == "Result Announced" ? (
                <span className="eventStartTime" data-state={row.EventStart}>
                  Time: {row.EventStart}
                </span>
              ) : (
                <span className="eventStartTime" data-state={row.EventStart}>
                  Time: {row.EventStart}
                </span>
              )}
              <span className="FirstWinner Winner" data-state={row.Winner1}>
                <img className="newimg" src={first} alt="" /> : {row.Winner1}
              </span>
              <span className="SecondWinner Winner" data-state={row.Winner2}>
              <img className="newimg" src={second} alt="" /> : {row.Winner2}
              </span>
              <span className="ThirdWinner Winner" data-state={row.Winner3}>
              <img className="newimg" src={third} alt="" /> : {row.Winner3}
              </span>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default Events;