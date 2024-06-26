import React, { useEffect, useState } from "react";
import axios from "axios";

export default function NearestHelp({ location }) {
  const [coordinateArray, setCoordinateArray] = useState([]);
  const [locationArray, setLocationArray] = useState([]);
  const [expandedURLs, setExpandedURLs] = useState([]);
  const [distanceArray, setDistanceArray] = useState([]);
  const [organization, setOrganization] = useState([]);
  const [nearestHelper, setNearestHelper] = useState([]);
  // const [animalCor, setAnimalCor] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [coords, setCoords] = useState({ latitude: null, longitude: null });

  useEffect(() => {
    const geo = navigator.geolocation;

    if (!geo) {
      console.log('Geolocation is not supported');
      return;
    }

    const watcher = geo.watchPosition(
      (position) => {
        setCoords({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        });
      },
      (error) => {
        console.error('Error getting geolocation:', error);
      }
    );

    return () => geo.clearWatch(watcher);
  }, []);

  // useEffect(() => {
    
  //   if (location) {
  //     axios({
  //       url: `https://unshorten.me/json/${location}`,
  //       method: "GET",
  //     })
  //       .then((res) => {
  //         if (res.data && res.data.resolved_url) {
  //           const expandedUrl = res.data.resolved_url;
  //           setAnimalCor(extractCoordinates(expandedUrl));
  //         } else {
  //           throw new Error("URL expansion failed");
  //         }
  //       })
  //       .catch((e) => {
  //         console.error(e);
  //         setError("Failed to expand URL. Please try again.");
  //       });
  //   }
  // }, [location]);

  const handleLocation = (url) => {
    return axios({
      url: `https://unshorten.me/json/${url}`,
      method: "GET",
    })
      .then((res) => {
        if (res.data && res.data.resolved_url) {
          return res.data.resolved_url;
        } else {
          throw new Error("URL expansion failed");
        }
      })
      .catch((e) => {
        console.error(e);
        throw e;
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
    setLoading(true);
    setError(null);

    axios
      .get(`https://pawsraksha-1.onrender.com/GetLocationOfOrganization`)
      .then((res) => {
        setLocationArray([...res.data]);
      })
      .catch((e) => {
        console.error(e);
        setError("Failed to fetch locations. Please try again.");
        setLoading(false);
      });
  };

  useEffect(() => {
    if (locationArray.length !== 0) {
      Promise.all(locationArray.map((item) => handleLocation(item)))
        .then((urls) => {
          setExpandedURLs(urls);
        })
        .catch((e) => {
          setError("Failed to expand some URLs. Please try again.");
          setLoading(false);
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
    if (coordinateArray.length !== 0 && coords.latitude && coords.longitude) {
      const newDistances = coordinateArray.map((coord) =>
        haversine(coord.latitude, coord.longitude, coords.latitude, coords.longitude)
      );
      setDistanceArray(newDistances);
    }
  }, [coordinateArray, coords]);

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
          setNearestHelper(sortedHelpers.filter((helper) => helper.distance <= 1000));
          setLoading(false);
        })
        .catch((e) => {
          console.error(e);
          setError("Failed to fetch organizations. Please try again.");
          setLoading(false);
        });
    }
  }, [distanceArray]);
  const GoToLocation=(name)=>{
    axios.get(`https://pawsraksha-1.onrender.com/OrgLocation/${name}`)
    .then(res=>{
      window.open(res.data)
    })
    .catch(e=>{
     alert("Sorry unable to redirect to location!!")
    })
  }
  return (
    <center>
      <div className="container mx-auto px-4 py-8">
        <div className="bg-slate-300 rounded-lg p-4">
          <div className="w-full my-4 flex flex-col items-center justify-center">
            <div className="rounded-full w-28 h-28 bg-blue-600 flex items-center justify-center">
              <i className="fa-solid fa-check text-5xl font-bold text-white"></i>
            </div>
            <div className="mt-4 max-w-xs text-center text-lg font-semibold">
              Could you please take the animal to the nearest veterinary hospital?
            </div>
          </div>
          <button
            className="bg-blue-400 hover:bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg w-full text-center mt-4"
            onClick={handle}
            disabled={loading}
          >
            See Nearest Help
          </button>
         
          <div className="mt-4">
            {nearestHelper.map((helper, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-4 mt-4 flex flex-col justify-start">
                <p className="text-base font-semibold mb-2 self-start">
                  Organization Name: {helper.name}
                </p>
                <p className="text-sm  font-semibold self-start">
                  Distance: {helper.distance} km
                </p>
                <p className="text-sm  font-semibold self-start">
                  Contact 1: {helper.mobile1}
                </p>
                <p className="text-sm  font-semibold self-start">
                  Contact 2: {helper.mobile2}
                </p>
                <button
                  className="bg-red-400 hover:bg-red-500 text-white font-semibold py-2 px-4 rounded-lg mt-2"
                  onClick={() => {
                    GoToLocation(helper.name)
                  }}
                >
                  Get Location
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </center>
  );
}