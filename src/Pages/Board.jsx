import { useState, useEffect } from "react";

import "./Board.scss";
import Spinner from "../Components/Spinner";
import first from "../assets/first.png"
import second from "../assets/second.png"
import third from "../assets/third.png"

function Board() {
  const columns = ["Team", "Points"];
  const [boardData, setBoardData] = useState([]);
  const [lastUpdatedTime, setLastUpdatedTime] = useState(new Date());
  const [mins, setMins] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const getLastUpdatedTime = () => {
    setMins(Math.floor(Math.abs(new Date() - lastUpdatedTime) / 60000));
  };

  function ordinal_suffix_of(i) {
    let j = i % 10,
      k = i % 100;
    if (j === 1 && k !== 11) {
      return i + "st";
    }
    if (j === 2 && k !== 12) {
      return i + "nd";
    }
    if (j === 3 && k !== 13) {
      return i + "rd";
    }
    return i + "th";
  }

  const getBoardData = () => {
    setIsLoading(true);
    fetch(
      "https://script.google.com/macros/s/AKfycbzkrl5eaeTYJp4ngqMZmLuK8pw0lcjtlOBGQJmNbTCAyqIm5vZ2mzjXUGJPKD3rdcC8yA/exec?type=points"
    )
      .then((response) => response.json())
      .then((data) => {
        setBoardData(
          data.data.sort((a, b) => {
            return b.Point - a.Point;
          })
        );
        setIsLoading(false);
        setLastUpdatedTime(new Date());
        getLastUpdatedTime();
        // console.log(boardData);
      })
      .catch((error) => window.alert("Loading Failed"));
  };

  useEffect(() => {
    getBoardData();
  }, []);

  useEffect(() => {
    const interval1 = setInterval(() => {
      getBoardData();
    }, 1000 * 60 * 5);
    return () => clearInterval(interval1);
  }, []);

  useEffect(() => {
    const interval2 = setInterval(() => {
      getLastUpdatedTime();
    }, 1000 * 60 * 1);
    return () => clearInterval(interval2);
  }, []);

  return (
    <div className="board--box">
      <div className="title--box">
        <h1>Leader Board</h1>
        <span>Updated {mins} minute(s) ago</span>
      </div>
      {isLoading ? (
        <Spinner />
      ) : (
        <table>
          <thead>
            <tr>
              {columns.map((title, index) => (
                <th key={index}>{title}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {boardData.map((row, index) => (
              <tr key={index}>
                <td className="teamName">
                 {index===0? <img className="newimg" src={first} alt="" srcset="" />:"" } 
                 {index===1? <img className="newimg" src={second} alt="" srcset="" />:"" } 
                 {index===2? <img className="newimg"src={third} alt="" srcset="" />:"" }  {row.YearName}
                </td>
                <td className="points">{row.Point}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Board;