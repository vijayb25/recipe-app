import React, {useEffect, useState} from 'react'
import styled from  'styled-components'
import { motion } from 'framer-motion'
import { Link, useParams } from 'react-router-dom'

function Cuisine() {
    const [cuisine, setCuisine] = useState([]);
    const [error, setError] = useState(""); // Error state
    let params = useParams();

    // const getCuisine = async (name) => {
    //     const data = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${import.meta.env.VITE_API_KEY}&cuisine=${name}`)
    //     const recipes = await data.json()
    //     setCuisine(recipes.result)
    // }

    const getCuisine = async (name) => {
        try {
            const response = await fetch(
                `https://api.spoonacular.com/recipes/complexSearch?apiKey=${import.meta.env.VITE_API_KEY}&cuisine=${name}`
            );

            // Check if the response was successful
            if (!response.ok) {
                if (response.status === 402) {
                    throw new Error("API limit reached. Please try again tomorrow.");
                } else {
                    throw new Error("An error occurred while fetching data.");
                }
            }

            const recipes = await response.json();
            if (recipes && recipes.results) {
                localStorage.setItem(name, JSON.stringify(recipes.results)); // Cache the result
                setCuisine(recipes.results);
            } else {
                setCuisine([]); // Set empty array if no results
            }
        } catch (error) {
            console.error("Failed to fetch cuisine data:", error);
            setError(error.message); // Store error message in state
        }
    };

    useEffect(() => {
        getCuisine(params.type)
    }, [params.type])

  return (
    <div>
        {error ? (
            <p>{error}</p> // Display the error message if there's an error
        ) : (
            <Grid>
                {cuisine.map((item) => {
                    return (
                        <Card key={item.id}>
                            <Link to={"/recipe/" + item.id}>
                                <img src={item.image} alt={item.title} />
                                <h4>{item.title}</h4>
                            </Link>
                        </Card>
                    );
                })}
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

export default Cuisine