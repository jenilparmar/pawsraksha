import axios from 'axios';
import React, { useState } from 'react';

export default function GetLocation() {
  const [fullUrl, setFullUrl] = useState('');
    const url = 'https://maps.app.goo.gl/uUjoR6FWbVbUA5JC9'
  const handleLocation = () => {
    axios({
      url: `https://unshorten.me/json/${url}`,
      method: 'GET'
    })
    .then(res => {
      if (res.data && res.data.resolved_url) {
        const expandedUrl = res.data.resolved_url;
        setFullUrl(expandedUrl);
      } else {
        throw new Error('URL expansion failed');
      }
    })
    .catch(e => {
      console.error(e);
      alert('Failed to expand URL. Please try again.');
    });
  }

  return (
    <div>
      <button onClick={handleLocation}>Get</button>
      {fullUrl && <p>Expanded URL: {fullUrl}</p>}
    </div>
  );
}
