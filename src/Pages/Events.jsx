import React, { useState, useEffect } from "react";

import Spinner from "../Components/Spinner";
import "./Events.scss";

function Events() {
  const [eventData, setEventData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setIsLoading(true);
    fetch(
      "https://script.google.com/macros/s/AKfycbwSlPUjT_-yon0mhCw2HsdY2NVEWa0OIR32Cz3_23KSGe2jt4uVRmS_NEHo3IN9mrk0fA/exec?type=events"
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
        <h1>Events</h1>
        <input
          type="text"
          className="Search"
          placeholder="Search Event, Winner, Day"
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
                <span className="eventDate"> {row.EventDate}</span>
              </div>
              <hr />
              <span className="eventName">{row.EventName}</span>
             
              {row.EventState == "Result Announced" ? (
                <span className="eventStartTime" data-state={row.EventStart}>
                  Event Started At {row.EventStart}
                </span>
              ) : (
                <span className="eventStartTime" data-state={row.EventStart}>
                  Event Starts At {row.EventStart}
                </span>
              )}
              <span className="FirstWinner Winner" data-state={row.Winner1}>
                First : {row.Winner1}
              </span>
              <span className="SecondWinner Winner" data-state={row.Winner2}>
                Second : {row.Winner2}
              </span>
              <span className="ThirdWinner Winner" data-state={row.Winner3}>
                Third : {row.Winner3}
              </span>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default Events;