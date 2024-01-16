import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from './Card';
import style from '../styles/card.module.css';
import './app2.css'
const CardList = () => {
  const [arr, setArr] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedType, setSelectedType] = useState('');

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleTypeChange = (e) => {
    setSelectedType(e.target.value);
  };

  const getData = async () => {
    const res = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=898');
    const pokemonList = res.data.results;

    const pokemonDetailsPromises = pokemonList.map(async (pokemon) => {
      const response = await axios.get(pokemon.url);
      return {
        id: response.data.id,
        name: response.data.name.toUpperCase(),
        type: response.data.types.map((type) => type.type.name.toUpperCase()),
      };
    });

    const pokemonDetails = await Promise.all(pokemonDetailsPromises);
    setArr(pokemonDetails);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="flex flex-col items-center bg-gradient-to-r from-red-500 to-yellow-300 h-full min-h-screen">
      <h1 className="text-5xl font-mono p-5 font-extrabol z-10 text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-red-500">Pokèmon Explorer App</h1>

      <div className="relative flex flex-row justify-start items-center mb-5">
        <input
          className="bg-gradient-to-r from-purple-50 to-pink-50 font-thin rounded-md w-[20rem] h-8 pr-4 pl-8
          hover:from-purple-100 hover:to-pink-100"
          type="search"
          onChange={handleSearch}
          value={search}
          placeholder="Search..."
        />

        <select
          className="bg-gradient-to-r from-purple-50 to-pink-50 font-thin rounded-md w-[10rem] h-8 pr-4 pl-2 ml-2
          hover:from-purple-100 hover:to-pink-100 hell"
          onChange={handleTypeChange}
          value={selectedType}
        >
          <option value="">All Types</option>
          <option value="FIRE">Fire</option>
          <option value="WATER">Water</option>
          <option value="GRASS">Grass</option>
          <option value="PSYCHIC">Psychic</option>

     
        </select>
      </div>

      <div className="flex flex-wrap flex-row w-[90vw] items-center justify-center">
        {arr
          .filter((pokemon) => (!selectedType || pokemon.type.includes(selectedType)))
          .filter((pokemon) => pokemon.name.includes(search.toUpperCase()))
          .map((pokemon) => (
            <Card id={pokemon.id} name={pokemon.name} key={pokemon.id} />
          ))}
      </div>
    </div>
  );
};

export default CardList;
