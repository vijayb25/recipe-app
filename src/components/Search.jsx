import styled from 'styled-components'
import { useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom';

function Search() {

    const [input, setInput] = useState("");
    const navigate = useNavigate();

    const submitHandler = (e) => {
        e.preventDefault();
        navigate('/searched/' + input)
    }

    return (
        <FormStyle onSubmit={submitHandler}>
            <FaSearch></FaSearch>
            <input onChange={(e) => setInput(e.target.value)} type="text" value={input}/>
        </FormStyle>
    )
}

const FormStyle = styled.form`
    margin: 0 auto;
    position: relative;
    max-width: 70%;

   input{
    width: 100%;
    background: linear-gradient(35deg, #494949, #313131);
    font-size: 1.5rem;
    color: #fff;
    padding: 1rem 3rem;
    border-radius: 10px;
    outline: none;
    border: 0;
   }
    svg{
        position: absolute;
        top: 50%;
        left: 0;
        transform: translate(100%, -50%);
        color:#fff;
    }
`;

export default Search