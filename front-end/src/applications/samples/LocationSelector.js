
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const instance = axios.create({
  baseURL: 'https://api.countrystatecity.in/v1/',
  timeout: 1000,
  headers: { 'X-CSCAPI-KEY': 'Q2c0YWZhVVQ5c1pHZVNCeGh6eTZpVm1SWGtna1J2QXFGSFJ1MHBYUA==' }
});

const LocationSelector = () => {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const setAllCountries = async () => {
    try {
      const res = await instance.get('countries');
      console.info(res.data);
      setCountries(res.data);
      toast.success('Got Res');
    } catch (err) {
      toast.error('No Response', err);
    }
  }

  const setStatesByCountry = async (countryId) => {
    try {
      const res = await instance.get(`countries/${countryId}/states`);
      console.info(res.data);
      setStates(res.data);
      toast.success('Got Res');
    } catch (err) {
      setStates([]);
      setSelectedState(null);
      toast.error('No Response', err);
    }
  }

  const setCitiesByState = async (countryId, stateId) => {
    try {
      const res = await instance.get(`countries/${countryId}/states/${stateId}/cities`);
      console.info(res.data);
      setCities(res.data);
      toast.success('Got Res');
    } catch (err) {
      setCities([]);
      setSelectedCity(null);
      setSelectedCity(null);
      toast.error('No Response', err);
    }
  }

  useEffect(() => {
    setAllCountries();
  }, [])

  const handleCountryChange = (e) => {
    const countryId = parseInt(e.target.value, 10);
    setStatesByCountry(e.target.value);
    setSelectedCountry(e.target.value)
    setSelectedState(null);
    setSelectedCity(null);
  };

  const handleStateChange = (e) => {
    const stateId = parseInt(e.target.value, 10);
    setCitiesByState(selectedCountry, e.target.value);
    setSelectedState(e.target.value);
    setSelectedCity(null);
  };

  const handleCityChange = (e) => {
    const cityId = parseInt(e.target.value, 10);
    setSelectedCity(cityId);
  };

  const handleSubmit = (event) => {
    event.preventDefault()
    const data = new FormData(event.target);

    const addr = {
      country : data.get('country'),
      state : data.get('state'),
      city : data.get('city'),
    }

    console.info({addr});
  }

  return (
    <div className="container mt-4">
      <h1>Location Selector v1</h1>
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-4">
            <label htmlFor="country">Country:</label>
            <select
              name="country"
              className="form-select"
              onChange={handleCountryChange}
              value={selectedCountry || ''}
            >
              <option value="" disabled>Select Country</option>
              {countries.map((country) => (
                <option key={country.iso2} value={country.iso2}>
                  {country.name}
                </option>
              ))}
            </select>
          </div>

          <div className="col-md-4">
            <label htmlFor="state">State:</label>

            <select
              id="state"
              name='state'
              className="form-select"
              onChange={handleStateChange}
              // value={selectedState || ''}
              disabled={!selectedCountry}
            >
              <option value="" disabled>Select State</option>
              {selectedCountry &&
                states.map((state) => (
                  <option key={state.iso2} value={state.iso2}>
                    {state.name}
                  </option>
                ))}
            </select>
          </div>

          <div className="col-md-4">
            <label htmlFor="city">City:</label>
            <select
              id="city"
              name='city'
              className="form-select"
              onChange={handleCityChange}

              disabled={!selectedState}
            >
              <option value="" disabled>Select City</option>
              {selectedState &&
                cities.map((city) => (
                  <option key={city.id} value={city.name}>
                    {city.name}
                  </option>
                ))}
            </select>
          </div>
        </div>
        <button type='submit' className='btn btn-success'>
              Submit

        </button>
      </form>
    </div>
  );
};

export default LocationSelector;
