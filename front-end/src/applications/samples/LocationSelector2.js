import React, { useState } from 'react';



const LocationSelector2 = () => {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);

  const handleCountryChange = (e) => {
    const countryId = parseInt(e.target.value, 10);
    setSelectedCountry(countryId);
    setSelectedState(null);
    setSelectedCity(null);
  };

  const handleStateChange = (e) => {
    const stateId = parseInt(e.target.value, 10);
    setSelectedState(stateId);
    setSelectedCity(null);
  };

  const handleCityChange = (e) => {
    const cityId = parseInt(e.target.value, 10);
    setSelectedCity(cityId);
  };

  return (
    <div className="container-md mt-4">
      <div className="row">
        <div className=" col-md-4 col-sm-12 my-1">
          <label htmlFor="name" className="form-label">Name</label>
          <input type="text" className="form-control" id="name" placeholder="Enter your name" />
        </div>

        <div className="col-md-4 my-1">
          <label htmlFor="username" className="form-label">Username</label>
          <input type="text" className="form-control" id="username" placeholder="Enter your username" />
        </div>

        <div className="col-md-4 my-1">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" id="email" placeholder="name@example.com" />
        </div>
      </div>

      <div className="row">
        <div className="col-md-4 my-1">
          <div className="form-check form-switch">
            <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" />
            <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Active</label>
          </div>
        </div>

        <div className="col-md-8 my-1">
          <div className="form-check form-check-inline">
            <input className="form-check-input" type="checkbox" id="inlineCheckbox1" value="option1" />
            <label className="form-check-label" htmlFor="inlineCheckbox1">1</label>
          </div>
          <div className="form-check form-check-inline">
            <input className="form-check-input" type="checkbox" id="inlineCheckbox2" value="option2" />
            <label className="form-check-label" htmlFor="inlineCheckbox2">2</label>
          </div>
          <div className="form-check form-check-inline">
            <input className="form-check-input" type="checkbox" id="inlineCheckbox3" value="option3" />
            <label className="form-check-label" htmlFor="inlineCheckbox3">3 (disabled)</label>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-6 my-1">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" id="password" placeholder="Enter your password" />
        </div>

        <div className="col-md-6 my-1">
          <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
          <input type="password" className="form-control" id="confirmPassword" placeholder="Confirm your password" />
        </div>
      </div>

      <div className="row">
        <div className="col-md-4">
          <label htmlFor="gender" className="form-label">Gender</label>
          <div>
            <div className="form-check form-check-inline">
              <input className="form-check-input" type="radio" name="gender" id="male" value="male" />
              <label className="form-check-label" htmlFor="male">Male</label>
            </div>
            <div className="form-check form-check-inline">
              <input className="form-check-input" type="radio" name="gender" id="female" value="female" />
              <label className="form-check-label" htmlFor="female">Female</label>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <label htmlFor="hiredate" className="form-label">Hiredate</label>
          <input type="text" className="form-control" id="hiredate" placeholder="Enter hiredate" />
        </div>

        <div className="col-md-4">
          <label htmlFor="role" className="form-label">Role</label>
          <select
            id="role"
            className="form-select"
            onChange={handleStateChange}
            value={selectedState || ''}
            disabled={!selectedCountry}
          >
            <option value="" disabled>Select Role</option>
            {selectedCountry &&
              MockData.states[selectedCountry].map((state) => (
                <option key={state.id} value={state.id}>
                  {state.name}
                </option>
              ))}
          </select>
        </div>
      </div>

      <div className="row my-3">
        <div className="col-md-6 my-1">
          <label htmlFor="department" className="form-label">Department</label>
          <select
            id="department"
            className="form-select"
            onChange={handleStateChange}
            value={selectedState || ''}
            disabled={!selectedCountry}
          >
            <option value="" disabled>Select Department</option>
            {selectedCountry &&
              MockData.states[selectedCountry].map((state) => (
                <option key={state.id} value={state.id}>
                  {state.name}
                </option>
              ))}
          </select>
        </div>

        <div className="col-md-6">
          <label htmlFor="city" className="form-label">City</label>
          <select
            id="city"
            className="form-select"
            onChange={handleCityChange}
            value={selectedCity || ''}
            disabled={!selectedState}
          >
            <option value="" disabled>Select City</option>
            {selectedState &&
              MockData.cities[selectedState].map((city) => (
                <option key={city.id} value={city.id}>
                  {city.name}
                </option>
              ))}
          </select>
        </div>
      </div>

      <div className="row my-3">
        <div className="col-md-4 my-1">
          <label htmlFor="country" className="form-label">Country</label>
          <select
            id="country"
            className="form-select"
            onChange={handleCountryChange}
            value={selectedCountry || ''}
          >
            <option value="" disabled>Select Country</option>
            {MockData.countries.map((country) => (
              <option key={country.id} value={country.id}>
                {country.name}
              </option>
            ))}
          </select>
        </div>

        <div className="col-md-4">
          <label htmlFor="state" className="form-label">State</label>
          <select
            id="state"
            className="form-select"
            onChange={handleStateChange}
            value={selectedState || ''}
            disabled={!selectedCountry}
          >
            <option value="" disabled>Select State</option>
            {selectedCountry &&
              MockData.states[selectedCountry].map((state) => (
                <option key={state.id} value={state.id}>
                  {state.name}
                </option>
              ))}
          </select>
        </div>

        <div className="col-md-4 my-1">
          <label htmlFor="city" className="form-label">City</label>
          <select
            id="city"
            className="form-select"
            onChange={handleCityChange}
            value={selectedCity || ''}
            disabled={!selectedState}
          >
            <option value="" disabled>Select City</option>
            {selectedState &&
              MockData.cities[selectedState].map((city) => (
                <option key={city.id} value={city.id}>
                  {city.name}
                </option>
              ))}
          </select>
        </div>
      </div>

      {/* <div className="row my-3">
        <div className="col-md-4 my-1">
          <button type="button" className="btn btn-primary me-3" >Create</button>
          <button type="button" className="btn btn-secondary" >Cancel</button>
        </div>
      </div> */}

      <div class="d-grid gap-2 d-md-flex justify-content-md-end">
        <button class="btn btn-danger me-md-2" type="button">Cancel</button>
        <button class="btn btn-primary order-first" type="button">Add New</button>
      </div>

    </div>
  );
};

export default LocationSelector2;
