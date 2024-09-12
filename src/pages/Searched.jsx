import React from 'react'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

function Searched() {

    const [searchedRecipes, setsearchedRecipes] = useState([])
    const [error, setError] = useState("");
    let params = useParams();

    const getSearched = async (name) => {
        try {
          const response = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${import.meta.env.VITE_API_KEY}&query=${name}`);
    
          // Check if the request was successful
          if (!response.ok) {
            if (response.status === 402) {
              throw new Error("API limit reached. Please try again tomorrow.");
            } else {
              throw new Error("An error occurred while fetching data.");
            }
          }
    
          const recipes = await response.json();
          setsearchedRecipes(recipes.results);
        } catch (error) {
          // Set the error message to be displayed
          setError(error.message);
        }
      };

      useEffect(() => {
        getSearched(params.search);
      }, [params.search])

  return (
    <div>
    {error ? (
      <p>{error}</p> // Display the error message if there's an error
    ) : (
      <Grid>
        {searchedRecipes.map((item) => (
          <Card key={item.id}>
            <Link to={"/recipe/" + item.id}>
            <img src={item.image} alt={item.title} />
            <h4>{item.title}</h4>
            </Link>
          </Card>
        ))}
      </Grid>
    )}
  </div>
  )
}

const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
    grid-gap: 3rem;
`;
const Card = styled.div`
    img{
        width: 100%;
        border-radius: 2rem;
    }
    a {
        text-decoration: none;
    }
    h4{
        text-align: center;
        padding: 1rem;
    }
`

export default Searched