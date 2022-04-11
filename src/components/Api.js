import React, { useEffect, useState } from "react";
import axios from "axios";
import Rep from "./Rep";

import Fuse from "fuse.js";

const Api = () => {
  const [rep, setRep] = useState([]); 
  const [loading, setLoading] = useState(false); 
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5); //bisa buat pagination

  const [query, updateQuery] = useState(""); //serch

  
  const fuse = new Fuse(rep, {
    keys: ["name", "description", "owner.login", "id"]
  });
  const results = fuse.search(query);
  
  const RepResults = query ? results.map(rep => rep.item) : rep;

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;

  const currentPosts = RepResults.slice(indexOfFirstPost, indexOfLastPost);


  function onSearch({ currentTarget }) {
    updateQuery(currentTarget.value);
  }


  useEffect(() => {
    const fetchRep = async () => {
      setLoading(true);
      const res = await axios.get("https://api.github.com/users/Arsfbrynt/repos");
      setRep(res.data);
      setLoading(false);
    };
    fetchRep();
  }, []);

  return (
    <div >
    
      <h4 className="judul">Telkom Test</h4> 
    <div>
    <form className="search">
      <label className="search-text">Search</label>
      <input type="text" value={query} onChange={onSearch} />
    </form>
  </div>
      <Rep rep={currentPosts} loading={loading} />
    </div>
  );
};
export default Api;
