import { FaPizzaSlice, FaHamburger } from 'react-icons/fa';
import { GiNoodles, GiChopsticks } from 'react-icons/gi';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';


function Category() {
  return (
    <div>
        <List className='nav_links'>
            <Slink to={'/cuisine/Italian'}><FaPizzaSlice /> <span>Italian</span></Slink>
            <Slink to={'/cuisine/American'}><FaHamburger /> <span>American</span></Slink>
            <Slink to={'/cuisine/Thai'}><GiNoodles /> <span>Thai</span></Slink>
            <Slink to={'/cuisine/Japanese'}><GiChopsticks /> <span>Japanese</span></Slink>
        </List>
    </div>  
  )
}

const List = styled.div`
    display: flex;
    justify-content: center;
    margin: 2rem 0rem;
    flex-wrap: wrap;
`;
const Slink = styled(NavLink)`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 1rem;
    text-decoration: none;
    background: linear-gradient(35deg, #494949, #313131);
    margin-right: 1rem;
    width: 6rem;
    aspect-ratio: 1/1;
    cursor: pointer;
    transform: scale(0.8);
    color: #fff;
    gap: 5px;

    svg{
      color: #fff;
      font-size: 1.5rem;
    }

    &.active{
      background: linear-gradient(to right, #f27121, #e94057);
      svg{
        color: #fff;
      }
      
    }
`

export default Category