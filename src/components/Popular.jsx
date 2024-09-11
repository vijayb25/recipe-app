import { useEffect, useState } from "react";
import styled from "styled-components";
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import { Link } from "react-router-dom";

function Popular() {

  const [popular, setPopular] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    getPopular();
  }, []);

  const getPopular = async () => {
    try {
      // Check if popular recipes are already stored in localStorage
      const check = localStorage.getItem("popular");

      if (check) {
        try {
          // Try parsing the localStorage data
          setPopular(JSON.parse(check));
        } catch (e) {
          console.error("Error parsing localStorage data:", e);
          localStorage.removeItem("popular"); // Clear the invalid data
          throw new Error("Invalid localStorage data. Fetching fresh data.");
        }
      } else {
        // Fetch the data from the API
        const api = await fetch(`https://api.spoonacular.com/recipes/random?apiKey=${import.meta.env.VITE_API_KEY}&number=9`);
        if (!api.ok) {
          throw new Error(`API Error: ${api.statusText}`);
        }
        const data = await api.json();
        if (!data.recipes) {
          throw new Error("No recipes returned from API.");
        }

        // Store the fetched data in localStorage and update state
        localStorage.setItem("popular", JSON.stringify(data.recipes));
        setPopular(data.recipes);
      }
    } catch (err) {
      setError(err.message);
      console.error("Fetching popular recipes failed:", err);
    }
  }

  return (
    <div>
      <Wrapper>
        <h3>Popular Picks</h3>

        {error ? (
          <p>Error: {error}</p>
        ) : (
          <Splide options={{
            perPage: 4,
            arrows: false,
            pagination: false,
            drag: 'free',
            gap: "5rem",
            breakpoints: {
              1200: {
                perPage: 3,
              },
              768: {
                perPage: 1,
              },
            },
          }}>
            {popular.map((recipe) => (
              <SplideSlide key={recipe.id}>
                <Card>
                 <Link to={"/recipe/" + recipe.id}>
                    <p>{recipe.title}</p>
                    <img src={recipe.image} alt={recipe.title} />
                    <Gradient />
                 </Link>
                </Card>
              </SplideSlide>
            ))}
          </Splide>
        )}
      </Wrapper>
    </div>
  );
}

const Wrapper = styled.div`
  margin: 4rem 0rem;
  h3{
    font-size: 2rem;
    margin-bottom: 1.5rem;
  }
`;
const Card = styled.div`
  min-height: 25rem;
  border-radius: 2rem;
  overflow: hidden;
  position: relative;

  img{
    border-radius: 2rem;  
    position: absolute;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  p{
    position: absolute;
    z-index: 10;
    left: 50%;
    bottom: 0%;
    transform: translate(-50%, 0%);
    color: white;
    width: 100%;
    text-align: center;
    font-weight: 600;
    font-size: 1rem;
    height: 40%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const Gradient = styled.div`
  z-index: 3;
  position: absolute;
  width: 100%;
  height: 100%;
  background: linear-gradient(rgba(0,0,0,0), rgba(0,0,0,0.5));
`;

export default Popular;
