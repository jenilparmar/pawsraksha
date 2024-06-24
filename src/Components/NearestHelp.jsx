import React, { useEffect, useState } from 'react'
import axios from "axios";

export default function NearestHelp() {
    const [injuredDataArray,setInjureddataArray] = useState([])
    const [organizationArray , setOrganizationArray] = useState([])
    const [organizationCoordinates,setOrganizationCoordinates]= useState([]);
    const [animalCoordinates , setAnimalCoordinates] = useState({});
    function extractCoordinates(url) {
        // Create a URL object
        const urlObj = new URL(url);
        
        // Extract the `continue` parameter from the URL
        const continueParam = urlObj.searchParams.get('continue');
        
        // Create a new URL object from the `continue` parameter
        const continueUrlObj = new URL(decodeURIComponent(continueParam));
        
        // Extract the coordinates from the `search` parameter
        const searchParam = continueUrlObj.pathname.split('/').pop();
        const coordinates = searchParam.split('+');
    
        if (coordinates.length >= 2) {
            const latitude = parseFloat(coordinates[0]);
            const longitude = parseFloat(coordinates[1].split('?')[0]);
            return { latitude, longitude };
        }
    
        return null;
    }
    
    const handleLocation = (url) => {
 
    axios({
      url: `https://unshorten.me/json/${url}`,
      method: 'GET'
    })
    .then(res => {
      if (res.data && res.data.resolved_url) {
        const expandedUrl = res.data.resolved_url;
        // setFullUrl(expandedUrl);
        setAnimalCoordinates(extractCoordinates(expandedUrl))
      } else {
        throw new Error('URL expansion failed');
      }
    })
    .catch(e => {
      console.error(e);
      alert('Failed to expand URL. Please try again.');
    });
  }
    const hanle =()=>{
    axios.get(`https://pawsraksha-1.onrender.com/ShowData`)
    .then(res=>{
     setInjureddataArray(res.data)
     console.log(injuredDataArray);

    })
    .catch(e=>{
     console.log(e);
    })
    axios.get(`https://pawsraksha-1.onrender.com/GetOrganizations`)
    .then(res=>{
     setOrganizationArray(res.data)
     console.log(organizationArray);
    })

    .catch(e=>{
     console.log(e);
    })
   }

  return (
    <div>
       <button onClick={()=>{hanle()
        if (injuredDataArray.length!=0 && organizationArray.length!=0) {
            handleLocation(injuredDataArray[0]['location']) 
            handleLocation(organizationArray[0]['location'])
        }
       }}>CLick</button>
 
            {animalCoordinates && <>
                <p>:latitude:- {animalCoordinates.latitude}</p> 
            <br />
            <p>:latitude:- {animalCoordinates.longitude}</p>
            </>
            }

    </div>
  )
}
