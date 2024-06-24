import React, { useEffect, useState } from "react";
import axios from "axios";

export default function NearestHelp() {
  const [coordinateArray, setCoordinateArray] = useState([]);
  const [locationArray, setLocationArray] = useState([]);
  const [expandedURLs, setExpandedURLs] = useState([]);
  const [distanceArray, setDistanceArray] = useState([]);
  const [organization, setOrganization] = useState([]);
  const [nearestHelper, setNearestHelper] = useState([]);

  const handleLocation = (url) => {
    axios({
      url: `https://unshorten.me/json/${url}`,
      method: "GET",
    })
      .then((res) => {
        if (res.data && res.data.resolved_url) {
          const expandedUrl = res.data.resolved_url;
          setExpandedURLs((prevURLs) => [...prevURLs, expandedUrl]);
        } else {
          throw new Error("URL expansion failed");
        }
      })
      .catch((e) => {
        console.error(e);
        alert("Failed to expand URL. Please try again.");
      });
  };

  function extractCoordinates(url) {
    try {
      const urlObj = new URL(url);
      const continueParam = urlObj.searchParams.get("continue");

      if (!continueParam) {
        return null;
      }

      const continueUrlObj = new URL(decodeURIComponent(continueParam));
      const searchParam = continueUrlObj.pathname.split("/").pop();
      const coordinates = searchParam.split("+");

      if (coordinates.length >= 2) {
        const latitude = parseFloat(coordinates[0]);
        const longitude = parseFloat(coordinates[1].split("?")[0]);
        return { latitude, longitude };
      }

      return null;
    } catch (e) {
      console.error("Invalid URL:", url, e);
      return null;
    }
  }

  function haversine(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radius of the Earth in kilometers
    const toRadians = (degrees) => (degrees * Math.PI) / 180;

    const phi1 = toRadians(lat1);
    const phi2 = toRadians(lat2);
    const deltaPhi = toRadians(lat2 - lat1);
    const deltaLambda = toRadians(lon2 - lon1);

    const a =
      Math.sin(deltaPhi / 2) ** 2 +
      Math.cos(phi1) * Math.cos(phi2) * Math.sin(deltaLambda / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distance = R * c;
    return distance; // Distance in kilometers
  }

  const handle = () => {
    axios
      .get(`https://pawsraksha-1.onrender.com/GetLocationOfOrganization`)
      .then((res) => {
        console.log("Fetched locations:", res.data);
        setLocationArray([...res.data]);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    if (locationArray.length !== 0) {
      locationArray.forEach((item) => {
        handleLocation(item);
      });
    }
  }, [locationArray]);

  useEffect(() => {
    if (expandedURLs.length !== 0) {
      const newCoordinates = expandedURLs
        .map((url) => extractCoordinates(url))
        .filter((coord) => coord !== null);
      setCoordinateArray(newCoordinates);
    }
  }, [expandedURLs]);

  useEffect(() => {
    if (coordinateArray.length !== 0) {
      const newDistances = coordinateArray.map((coord) =>
        haversine(coord.latitude, coord.longitude, 21.33304, 71.3204)
      );
      console.log("Calculated distances:", newDistances);
      setDistanceArray(newDistances);
      console.log("Calculated distances:", newDistances);
    }
  }, [coordinateArray]);

  useEffect(() => {
    if (distanceArray.length !== 0) {
      axios
        .get("https://pawsraksha-1.onrender.com/GetOrganizations")
        .then((res) => {
          setOrganization(res.data);
          const sortedHelpers = res.data.map((org, index) => ({
            ...org,
            distance: distanceArray[index],
          }));
          sortedHelpers.sort((a, b) => a.distance - b.distance);
          setNearestHelper(sortedHelpers.filter((helper) => helper.distance <= 10));
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }, [distanceArray]);

  return (
    <div>
       <button
        
            className="bg-blue-400 border-2 border-black hover:bg-blue-500 cursor-pointer text-center font-semibold p-2 rounded-lg text-black w-40 mt-4" onClick={handle}>
        See Nearest Help

          </button>
    
      <div>
        {nearestHelper.map((helper, index) => (
          <p key={index}>
            Organization: {helper.name}, Distance: {helper.distance} km
          </p>
        ))}
      </div>
    </div>
  );
}
