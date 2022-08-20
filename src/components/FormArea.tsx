import { useState, useEffect } from "react";
import { debounce } from "lodash";

const FormArea = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [searchType, setSearchType] = useState<number>(0);

//   Watching input field and dropdown
  useEffect(() => {
    // Calling debouncer method
    debouncedSearch();
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputValue, searchType]);

//   Debouncer method with lodash
  const debouncedSearch = debounce(async () => {
    makeApiCall();
  }, 1000);

//   Calling api for github
  const makeApiCall = async () => {
    if (inputValue.length >= 3) {
      console.log("calling api");

      let targetRoute: string = "";
      if (searchType === 0) targetRoute = "users";
      if (searchType === 1) targetRoute = "repositories";

      const reqUrl = `https://api.github.com/search/${targetRoute}?q=${inputValue}`;

      let options = {  
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `token ${process.env.REACT_APP_GITHUB_TOKEN}`
        }
      }

      const response = await fetch(
       reqUrl ,options
      );
      const data = await response.json();
      console.log("Data: ", data);
    }
  };

  return (
    <div className="formArea">
      {/* Heading area of the form */}

      <div>
        <ul id="primaryHeadingUL">
          <li>
            <img src="/images/githubLogo.png" alt="gitHubLogo" />
          </li>
          <li>
            <h3>GitHub Searcher</h3>
            <p>Search users or respositories below</p>
          </li>
        </ul>
      </div>

      {/* Form Area */}
      <div className="searchForm">
        <input
          name="inputValue"
          type="text"
          placeholder="Start typing to search .."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <select
          name="searchValue"
          value={searchType}
          onChange={(e) => setSearchType(+e.target.value)}
        >
          <option value={0}>User</option>
          <option value={1}>Repository</option>
        </select>
      </div>
    </div>
  );
};

export default FormArea;
