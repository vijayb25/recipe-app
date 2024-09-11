import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useParams } from 'react-router-dom'

function Recipe() {

  let params = useParams();
  const [details, setDetails] = useState([]);
  const [activeTab, setActiveTab] = useState("instructions");
  const [error, setError] = useState(null); // State to store error messages

  const fetchDetails = async () => {
    try {
      const response = await fetch(`https://api.spoonacular.com/recipes/${params.name}/information?apiKey=${import.meta.env.VITE_API_KEY}`);
      const detailData = await response.json(); 
      
      // Check if the API limit is reached
      if (response.status === 402) { // 402 is returned when quota is exceeded
        throw new Error(detailData.message || "API limit reached. Please try again later.");
      }

      setDetails(detailData);
    } catch (err) {
      setError(err.message); // Set the error message
    }
  } 

  useEffect(() => {
    fetchDetails();
  }, [params.name])

  return (
    <DetailWrapper>
    {error ? (
      <div>
        <h2>Oopsie!</h2>
        <p>{error}</p> {/* Display error message */}
      </div>
    ) : (
      <>
        <div>
          <h2>{details.title}</h2>
          <img src={details.image} alt={details.title} />
        </div>
        <Info>
          <Button className={activeTab === 'instructions' ? 'active' : ""} onClick={() => setActiveTab("instructions")}>Instructions</Button>
          <Button className={activeTab === 'ingredients' ? 'active' : ""} onClick={() => setActiveTab("ingredients")}>Ingredients</Button>
          
          {activeTab === 'instructions' && (
            <div>
              <p dangerouslySetInnerHTML={{__html: details.summary}}></p>
              <p dangerouslySetInnerHTML={{__html: details.instructions}}></p>
            </div>
          )}
          
          {activeTab === 'ingredients' && (
            <ul>
              {details?.extendedIngredients?.length > 0 ? (
                details.extendedIngredients.map((ingredient) => (
                  <li key={ingredient.id}>{ingredient.original}</li>
                ))
              ) : (
                <p>No ingredients available</p> // Fallback in case there are no ingredients
              )}
            </ul>
          )}
        </Info>
      </>
    )}
  </DetailWrapper>
  )
}

const DetailWrapper = styled.div`
  margin-top: 10rem;
  margin-bottom: 5rem;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  gap: 2rem;
  flex-wrap: wrap;
  .active{
    background: linear-gradient(35deg, #494949, #313131);
    color: #fff;
  }
  p{
    margin: 1.5rem 0rem;
    font-weight: 300;
    text-align: center;
  }
  a{
    color: #000;
    font-weight: 600;
  }

  h2{
    margin-bottom: 2rem;
  }
  ul{
    margin-top: 2rem;
  }
  li{
    font-size: 1.2rem;
    line-height: 2.5rem;
  }
`;

const Button = styled.button`
  padding: 1rem 2rem;
  color: #313131;
  background: #fff;
  border: 2px solid #000;
  margin-right: 2rem;
  font-weight: 600;
  cursor: pointer;

`
const Info = styled.div`
  margin-left: 0;
`

export default Recipe